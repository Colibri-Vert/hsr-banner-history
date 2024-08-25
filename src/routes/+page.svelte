<script lang="ts">
import { onMount } from "svelte"
import { base } from "$app/paths"

import banners from "../lib/banners"
import characters, { type Character } from "../lib/characters"
import lightCones, { type LightCone } from "../lib/light-cones"

enum State { ICON = -1, NULL = 0 }
enum SortType { FIRST_RELEASE, LAST_RERUN }

type TableData<T extends Character | LightCone> = [T, number[], number, number]

let versions: { [key: string]: number } = {}
$: keys = Object.keys(versions)

let fiveStarCharacters: TableData<Character>[] = []
let fourStarCharacters: TableData<Character>[] = []

let fiveStarLightCones: TableData<LightCone>[] = []
let fourStarLightCones: TableData<LightCone>[] = []

let sort: SortType = SortType.FIRST_RELEASE

onMount(() =>
{
    // Find unique version numbers
    let set: Set<string> = new Set()
    for (let banner of banners.characters) set.add(banner.version)

    let length = 0
    for (let version of set) versions[version] = length++ // Assign each version an index

    // Separate five star and four star banner data from dataset
    let fiveStarCharacterBanners = banners.characters.map(banner => banner.featured.map(feature =>
        [feature, versionToIndex(banner.version, banner.phase)] as [string, number])).flat()
    let fourStarCharacterBanners = banners.characters.map(banner => banner.rare.map(feature =>
        [feature, versionToIndex(banner.version, banner.phase)] as [string, number])).flat()

    let fiveStarLightConeBanners = banners.lightCones.map(banner => banner.featured.map(feature =>
        [feature, versionToIndex(banner.version, banner.phase)] as [string, number])).flat()
    let fourStarLightConeBanners = banners.lightCones.map(banner => banner.rare.map(feature =>
        [feature, versionToIndex(banner.version, banner.phase)] as [string, number])).flat()

    // Process and sort data
    fiveStarCharacters = process(characters.filter(character => character.rarity === 5), fiveStarCharacterBanners)
    fourStarCharacters = process(characters.filter(character => character.rarity === 4), fourStarCharacterBanners)

    sortFeatures(sort)
})

function versionToIndex(version: string, phase: number): number
{
    return versions[version] * 2 + phase
}

function process<T extends Character | LightCone>(features: T[], banners: [string, number][]): TableData<T>[]
{
    let data: { [key: string]: [T, number[]] } = {}
    for (let feature of features)
    {
        // Assign each feature a row of cells (initialized to the null state)
        data[feature.id] = [feature, Array.from({ length: Object.keys(versions).length * 2 }, () => State.NULL)]
    }

    for (let [feature, index] of banners)
    {
        // For a feature's banner, set icon state in the corresponding row at the version index
        let [, timeline] = data[feature]
        timeline[index] = State.ICON
    }

    let list: TableData<T>[] = []
    for (let [feature, timeline] of Object.values(data))
    {
        let start = timeline.findIndex(value => value === State.ICON)
        if (start === -1) continue // Skip features with no banners

        // Fill in cells with number of phases since last banner
        let time = 0
        for (let i = start + 1; i < timeline.length; i++)
        {
            if (timeline[i] === State.ICON) time = 0
            else timeline[i] = ++time
        }

        list.push([feature, timeline, start, time]) // Store start and time since last rerun for sorting
    }

    return list
}

function sortFeatures(type: SortType)
{
    switch (type)
    {
        case SortType.FIRST_RELEASE:
        {
            // Sort by start index
            fiveStarCharacters = fiveStarCharacters.sort(([,, a], [,, b]) => a - b)
            fourStarCharacters = fourStarCharacters.sort(([,, a], [,, b]) => a - b)
            break
        }
        case SortType.LAST_RERUN:
        {
            // Sort by phases since last rerun (if equal, sort by newest character)
            fiveStarCharacters = fiveStarCharacters.sort(([,, u, a], [,, v, b]) => a === b ? v - u : b - a)
            fourStarCharacters = fourStarCharacters.sort(([,, u, a], [,, v, b]) => a === b ? v - u : b - a)
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
            <select bind:value={sort} on:change={() => sortFeatures(sort)}>
                <option value={SortType.FIRST_RELEASE}>First Release</option>
                <option value={SortType.LAST_RERUN}>Last Rerun</option>
            </select>
        </form>
    </div>
    <div class="main">
        <table class="character-names">
            <thead><th class="header"><span>Version</span></th></thead>
            <tbody>
                {#each fiveStarCharacters as [character] (character.id)}
                    <tr><td class="header"><span>{character.name}</span></td></tr>
                {/each}
                <tr><td class="header"></td></tr>
                {#each fourStarCharacters as [character] (character.id)}
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
                    {#each fiveStarCharacters as [character, timeline] (character.id)}
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
                    {#each fourStarCharacters as [character, timeline] (character.id)}
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
