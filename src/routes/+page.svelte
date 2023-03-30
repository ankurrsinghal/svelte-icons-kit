<script lang="ts">
import './styles.css';
import { heroIcons, iconoirIcons, featherIcons } from '$lib/icons'
import { clickToCopyAction, infiniteScrollAction, messagesStore, tooltipAction } from 'svelte-legos';
import { tick } from 'svelte';
import { matchSorter } from 'match-sorter'
import { getComponent, getTSComponent } from '$lib/svgToPath';
import CopyIcon from './CopyIcon.svelte';

let query = '';
let currentTab = 0;
const perPage = 100;
let currentPage = 0;

$: {
  currentTab;
  currentPage = 0;
}
$: icons = currentTab === 0 ? heroIcons : (currentTab === 1 ? featherIcons : iconoirIcons);
$: totalNumberOfPages = Math.ceil(icons.length / perPage)
$: filteredIcons = query
    ? matchSorter(icons, query.replace(/\s+/, '-'), { keys: ['label', 'tags'] })
    : icons
$: paginatedIcons = filteredIcons.slice(0, (currentPage + 1) * perPage)

let isLoading = false;
function loadMore() {
  if (isLoading) return;
  isLoading = true;
  if (currentPage < totalNumberOfPages) {
    currentPage++;
  }

  tick().then(() => {
    isLoading = false;
  });
}

function handleCopyDone() {
  messagesStore('Copied!')
}

function copyComponent(svg: string) {
  return getComponent(svg);
}

function copyTSComponent(svg: string) {
  return getTSComponent(svg);
}

</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="font-lexend">
  <header class="container mx-auto">
    <div class="my-10">
      <h1 class="text-8xl font-extralight leading-snug">Svelte Icons<br /><span class="text-prime">Kit</span></h1>
    </div>
  </header>

  <div class="container mx-auto my-8">
    <div class="flex space-x-6">
      <div>
        <button on:click={() => (currentTab = 0)} class="{currentTab === 0 ? 'text-black' : 'text-gray-300'}">Hero Icons ({heroIcons.length})</button>
      </div>
      <div>
        <button on:click={() => (currentTab = 1)} class="{currentTab === 1 ? 'text-black' : 'text-gray-300'}">Feather Icons ({featherIcons.length})</button>
      </div>
      <div>
        <button on:click={() => (currentTab = 2)} class="{currentTab === 2 ? 'text-black' : 'text-gray-300'}">Iconoir Icons ({iconoirIcons.length})</button>
      </div>
    </div>
  </div>

  <div class="container mx-auto">
    <div class="border-b border-t border-black">
      <input bind:value={query} class="w-full py-4 outline-none font-lexend font-light" placeholder="Seach for icons" />
    </div>

    <div
      class="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-x-6 gap-y-8 pt-10 pb-16 sm:pt-11 md:pt-12"
      use:infiniteScrollAction={{ distance: 300, cb: loadMore }}
    >
      {#each paginatedIcons as icon}
        <div>
          <button class="group relative overflow-hidden aspect-square ring-1 ring-inset ring-gray-200 w-full rounded-xl flex items-center justify-center">
            <div class="w-6 h-6">
              {@html icon.svg}
            </div>

            <div class="hidden absolute inset-0 group-hover:flex flex-col text-[11px] bg-white border border-black rounded-xl">
              <button on:copy-done={handleCopyDone} class="flex-1 hover:bg-black hover:text-white flex space-x-1 px-4 items-center" use:clickToCopyAction={() => copyComponent(icon.svg)}>
                <span><CopyIcon /></span>
                <span>.svelte</span>
              </button>
              <hr />
              <button on:copy-done={handleCopyDone} class="flex-1 hover:bg-black hover:text-white flex space-x-1 px-4 items-center" use:clickToCopyAction={() => copyTSComponent(icon.svg)}>
                <span><CopyIcon /></span>
                <span>.svelte (ts)</span>
              </button>
              <hr />
              <button on:copy-done={handleCopyDone} class="flex-1 hover:bg-black hover:text-white flex space-x-1 px-4 items-center" use:clickToCopyAction={icon.svg}>
                <span><CopyIcon /></span>
                <span>.svg</span>
              </button>
            </div>
          </button>
          <div class="mt-3 truncate text-center text-[11px] leading-6 text-slate-500 font-light" title={icon.label}>
            {icon.label}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>