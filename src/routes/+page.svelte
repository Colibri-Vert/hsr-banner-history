<script lang="ts">
import { onMount } from "svelte"
import { base } from "$app/paths"

import banners from "../lib/banners"
import characters, { type Character } from "../lib/characters"
import lightCones, { type LightCone } from "../lib/light-cones"

enum FeatureType { CHARACTER, LIGHT_CONE }
enum SortType { FIRST_RELEASE, LAST_RERUN }

enum State { ICON = -1, NULL = 0 }
type TableData<T extends Character | LightCone> = [T, State[], number, number]

let versions: string[] = []

let type: FeatureType = FeatureType.CHARACTER
let sort: SortType = SortType.FIRST_RELEASE

let fiveStarCharacters: TableData<Character>[] = []
let fourStarCharacters: TableData<Character>[] = []

let fiveStarLightCones: TableData<LightCone>[] = []
let fourStarLightCones: TableData<LightCone>[] = []

onMount(() =>
{
    // Find unique version numbers and assign each an index
    let set: Map<string, number> = new Map(), length = 0
    for (let banner of banners.characters)
    {
        if (set.has(banner.version)) continue
        set.set(banner.version, length++)
    }
    versions = [...set.keys()]

    // Separate five star and four star banner data from dataset
    function versionToIndex(version: string, phase: number): number
    {
        return set.get(version)! * 2 + phase
    }

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

    fiveStarLightCones = process(lightCones.filter(lightCone => lightCone.rarity === 5), fiveStarLightConeBanners)
    fourStarLightCones = process(lightCones.filter(lightCone => lightCone.rarity === 4), fourStarLightConeBanners)

    sortFeatures(sort)
})

function process<T extends Character | LightCone>(features: T[], banners: [string, number][]): TableData<T>[]
{
    let data: { [key: string]: [T, State[]] } = {}
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

function sortAll(comparator: (a: TableData<Character | LightCone>, b: TableData<Character | LightCone>) => number)
{
    fiveStarCharacters = fiveStarCharacters.sort(comparator)
    fourStarCharacters = fourStarCharacters.sort(comparator)
    
    fiveStarLightCones = fiveStarLightCones.sort(comparator)
    fourStarLightCones = fourStarLightCones.sort(comparator)
}

function sortFeatures(type: SortType)
{
    switch (type)
    {
        case SortType.FIRST_RELEASE:
        {
            // Sort by start index
            sortAll(([,, a], [,, b]) => a - b)
            break
        }
        case SortType.LAST_RERUN:
        {
            // Sort by phases since last rerun (if equal, sort by oldest character)
            sortAll(([,, u, a], [,, v, b]) => a === b ? u - v : b - a)
            break
        }
    }
}

let lightConeColor: string = "212, 48"
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
    <div class="header">
        <div class="title">
            <img src="{base}/favicon.png" alt="">
            <h1>Honkai: Star Rail Banner History</h1>
        </div>
        <div class="sort-form">
            <div class="select">
                <button class="select-option {type === FeatureType.CHARACTER ? "active" : ""}"
                    on:click={() => type = FeatureType.CHARACTER}><span>Characters</span></button>
                <button class="select-option {type === FeatureType.LIGHT_CONE ? "active" : ""}"
                    on:click={() => type = FeatureType.LIGHT_CONE}><span>Light Cones</span></button>
            </div>
            <div class="select">
                <button class="select-option {sort === SortType.FIRST_RELEASE ? "active" : ""}"
                    on:click={() => sortFeatures(sort = SortType.FIRST_RELEASE)}><span>First Release</span></button>
                <button class="select-option {sort === SortType.LAST_RERUN ? "active" : ""}"
                    on:click={() => sortFeatures(sort = SortType.LAST_RERUN)}><span>Last Rerun</span></button>
            </div>
        </div>
    </div>
    <div class="main">
        <table class="character-names">
            <thead><th class="feature"><span>Version</span></th></thead>
            <tbody>
                {#if type === FeatureType.CHARACTER}
                    {#each fiveStarCharacters as [character] (character.id)}
                        <tr><td class="feature"><span>{character.name}</span></td></tr>
                    {/each}
                    <tr><td class="feature"></td></tr>
                    {#each fourStarCharacters as [character] (character.id)}
                        <tr><td class="feature"><span>{character.name}</span></td></tr>
                    {/each}
                {:else if type === FeatureType.LIGHT_CONE}
                    {#each fiveStarLightCones as [lightCone] (lightCone.id)}
                        <tr><td class="feature"><span>{lightCone.name}</span></td></tr>
                    {/each}
                    <tr><td class="feature"></td></tr>
                    {#each fourStarLightCones as [lightCone] (lightCone.id)}
                        <tr><td class="feature"><span>{lightCone.name}</span></td></tr>
                    {/each}
                {/if}
            </tbody>
        </table>
        <div class="body">
            <table>
                <thead>
                    {#each versions as version}
                        <th colspan="2"><span>{version}</span></th>
                    {/each}
                </thead>
                <tbody>
                    {#if type === FeatureType.CHARACTER}
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
                        <tr>{#each { length: versions.length * 2 } as _}<td></td>{/each}</tr>
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
                    {:else if type === FeatureType.LIGHT_CONE}
                        {#each fiveStarLightCones as [lightCone, timeline] (lightCone.id)}
                            <tr>
                                {#each timeline as n}
                                    {#if n === State.ICON}
                                        <td><img src="{base}/light-cones/{lightCone.id}.png" alt=""></td>
                                    {:else if n !== State.NULL}
                                        <td style={`background-color: hsl(${lightConeColor}%, ${map(n - 1) * 100}%)`}>
                                            <span>{n}</span>
                                        </td>
                                    {:else}<td></td>{/if}
                                {/each}
                            </tr>
                        {/each}
                        <tr>{#each { length: versions.length * 2 } as _}<td></td>{/each}</tr>
                        {#each fourStarLightCones as [lightCone, timeline] (lightCone.id)}
                            <tr>
                                {#each timeline as n}
                                    {#if n === State.ICON}
                                        <td><img src="{base}/light-cones/{lightCone.id}.png" alt=""></td>
                                    {:else if n !== State.NULL}
                                        <td style={`background-color: hsl(${lightConeColor}%, ${map(n - 1) * 100}%)`}>
                                            <span>{n}</span>
                                        </td>
                                    {:else}<td></td>{/if}
                                {/each}
                            </tr>
                        {/each}
                    {/if}
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
    --active-color:     #8dbbe2;
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

.header {
    padding: 16px 48px;
    border-bottom: 1px solid var(--border-color);
}

.title {
    display: flex;
    align-items: end;
    margin-bottom: 8px;
    gap: 8px;
}

.title img {
    height: 70px;
}

.title h1 {
    color: var(--text-primary);
    font-size: 1.8rem;
}

span {
    color: var(--text-secondary);
    font-size: 1rem;
}

.sort-form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
}

.select {
    display: flex;
}

.select-option {
    all: unset;
    flex-shrink: 0;
    padding: 4px 6px;
    border: 1px solid var(--border-color);
    cursor: pointer;
}

.select-option.active {
    background: var(--active-color);
    border: 1px solid var(--active-color);
}

.select-option.active > span {
    color: var(--surface-color);
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

.feature, th {
    background-color: var(--surface-color);
}

.feature  {
    white-space: nowrap;
    padding: 0 24px;
    border: 1px solid var(--border-color);
}

td.feature > span {
    color: var(--text-secondary);
}

@media (max-width: 600px) {
    .character-names {
        display: none;
    }

    th, td {
        border: 1px solid var(--border-color);
    }
}

</style>
