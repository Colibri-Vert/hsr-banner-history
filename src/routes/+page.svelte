<script lang="ts">
import { onMount } from "svelte"
import { base } from "$app/paths"

import banners from "../lib/banners"
import characters, { type Character } from "../lib/characters"

enum State { ICON = -1, NULL = 0 }
enum SortType { FIRST_RELEASE, LAST_RERUN }

let versions: { [key: string]: number } = {}
$: keys = Object.keys(versions)

let fiveStars: [Character, number[], number, number][] = []
let fourStars: [Character, number[], number, number][] = []

let sort: SortType = SortType.FIRST_RELEASE

onMount(() =>
{
    // Find unique version numbers
    let set: Set<string> = new Set()
    for (let banner of banners) set.add(banner.version)

    let length = 0
    for (let version of set) versions[version] = length++ // Assign each version an index

    // Separate five star and four star character/banner data from dataset
    let fiveStarCharacters = characters.filter(character => character.rarity === 5)
    let fiveStarBanners = banners.map(banner => [banner.character, versionToIndex(banner.version, banner.phase)] as [string, number])

    let fourStarCharacters = characters.filter(character => character.rarity === 4)
    let fourStarBanners = banners.map(banner =>
        banner.featured.map(featured => [featured, versionToIndex(banner.version, banner.phase)] as [string, number])).flat()

    // Process and sort data
    fiveStars = processCharacters(fiveStarCharacters, fiveStarBanners)
    fourStars = processCharacters(fourStarCharacters, fourStarBanners)
    sortCharacters(sort)
})

function versionToIndex(version: string, phase: number): number
{
    return versions[version] * 2 + phase
}

function processCharacters(characters: Character[], banners: [string, number][]): [Character, number[], number, number][]
{
    let data: { [key: string]: [Character, number[]] } = {}
    for (let character of characters)
    {
        // Assign each character a row of cells (initialized to the null state)
        data[character.id] = [character, Array.from({ length: Object.keys(versions).length * 2 }, () => State.NULL)]
    }

    for (let [character, index] of banners)
    {
        // For a character's banner, set character icon in the corresponding row at the version index
        let [, timeline] = data[character]
        timeline[index] = State.ICON
    }

    let list: [Character, number[], number, number][] = []
    for (let [character, timeline] of Object.values(data))
    {
        let start = timeline.findIndex(value => value === State.ICON)
        if (start === -1) continue // Skip characters with no banners

        // Fill in cells with number of phases since last banner
        let time = 0
        for (let i = start + 1; i < timeline.length; i++)
        {
            if (timeline[i] === State.ICON) time = 0
            else timeline[i] = ++time
        }

        list.push([character, timeline, start, time]) // Store start and time since last rerun for sorting
    }

    return list
}

function sortCharacters(type: SortType)
{
    switch (type)
    {
        case SortType.FIRST_RELEASE:
        {
            // Sort by start index
            fiveStars = fiveStars.sort(([,, a], [,, b]) => a - b)
            fourStars = fourStars.sort(([,, a], [,, b]) => a - b)
            break
        }
        case SortType.LAST_RERUN:
        {
            // Sort by phases since last rerun (if equal, sort by newest character)
            fiveStars = fiveStars.sort(([,, u, a], [,, v, b]) => a === b ? v - u : b - a)
            fourStars = fourStars.sort(([,, u, a], [,, v, b]) => a === b ? v - u : b - a)
            break
        }
    }
}

let colors: { [key: string]: string } =
{
    physical:  "0,   0",
    fire:      "5,   61",
    ice:       "212, 48",
    lightning: "279, 60",
    wind:      "133, 32",
    quantum:   "245, 43",
    imaginary: "55,  77"
}

function map(x: number): number
{
    // Approaches 1 as x gets infinitely large
    let start = 0.66, rate = 0.15
    return (rate * x + start) / (rate * x + 1)
}

</script>

<svelte:head>
    <title>HSR Banner History</title>
</svelte:head>
<div>
    <div class="title">
        <h1>Honkai: Star Rail Banner History</h1>
        <form>
            <span>Sort by:</span>
            <select bind:value={sort} on:change={() => sortCharacters(sort)}>
                <option value={SortType.FIRST_RELEASE}>First Release</option>
                <option value={SortType.LAST_RERUN}>Last Rerun</option>
            </select>
        </form>
    </div>
    <div class="main">
        <table class="character-names">
            <thead><th class="header"><span>Version</span></th></thead>
            <tbody>
                {#each fiveStars as [character] (character.id)}
                    <tr><td class="header"><span>{character.name}</span></td></tr>
                {/each}
                <tr><td class="header"></td></tr>
                {#each fourStars as [character] (character.id)}
                    <tr><td class="header"><span>{character.name}</span></td></tr>
                {/each}
            </tbody>
        </table>
        <div class="body">
            <table>
                <thead>
                    {#each keys as version}
                        <th colspan="2"><span>{version}</span></th>
                    {/each}
                </thead>
                <tbody>
                    {#each fiveStars as [character, timeline] (character.id)}
                        <tr>
                            {#each timeline as n}
                                {#if n === State.ICON}
                                    <td><img src="{base}/characters/{character.id}.png" alt=""></td>
                                {:else if n !== State.NULL}
                                    <td style={`background-color: hsl(${colors[character.element]}%, ${map(n - 1) * 100}%)`}>
                                        <span>{n}</span>
                                    </td>
                                {:else}<td></td>{/if}
                            {/each}
                        </tr>
                    {/each}
                    <tr>{#each { length: keys.length * 2 } as _}<td></td>{/each}</tr>
                    {#each fourStars as [character, timeline] (character.id)}
                        <tr>
                            {#each timeline as n}
                                {#if n === State.ICON}
                                    <td><img src="{base}/characters/{character.id}.png" alt=""></td>
                                {:else if n !== State.NULL}
                                    <td style={`background-color: hsl(${colors[character.element]}%, ${map(n - 1) * 100}%)`}>
                                        <span>{n}</span>
                                    </td>
                                {:else}<td></td>{/if}
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
<style>
:root {
    --background-color: #161616;
    --surface-color:    #1b1b1b;
    --border-color:     #383838;
    --text-primary:     #ededed;
    --text-secondary:   #b3b3b3;
}

:global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

:global(body) {
    background-color: var(--background-color);
}

.title {
    padding: 16px 48px;
    border-bottom: 1px solid var(--border-color);
}

.title h1 {
    color: var(--text-primary);
    font-size: 1.8rem;
    margin-bottom: 4px;
}

span {
    color: var(--text-secondary);
    font-size: 1rem;
}

select {
    margin-left: 4px;
    padding: 2px;
    border-radius: 0;
}

option {
    border-radius: 0;
}

.main {
    display: flex;
    justify-content: center;
    max-width: 1280px;
    margin: 0 auto;
    padding: 16px;
}

.body {
    display: flex;
    flex-direction: row-reverse;
    overflow-x: auto;
}

table {
    height: min-content;
    border-collapse: collapse;
}

th, td {
    border: 1px solid var(--border-color);
    border-left: none;
}

th {
    height: 28px;
}

td {
    width: 32px;
    min-width: 32px;
    height: 32px;
    text-align: center;
}

th > span {
    color: var(--text-primary);
}

td > span {
    color: var(--surface-color);
}

td > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

.header, th {
    background-color: var(--surface-color);
}

.header  {
    min-width: 250px;
    padding: 0 24px;
    border: 1px solid var(--border-color);
}

td.header > span {
    color: var(--text-secondary);
}

@media (max-width:540px) {
    .character-names {
        display: none;
    }

    th, td {
        border: 1px solid var(--border-color);
    }
}

</style>
