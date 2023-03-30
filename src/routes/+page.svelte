<script lang="ts">
import './styles.css';
import { heroIcons, iconoirIcons, featherIcons, type Icon, heroIconsMap, featherIconsMap, iconoirIconsMap } from '$lib/icons'
import { clickToCopyAction, infiniteScrollAction, messagesStore, tooltipAction } from 'svelte-legos';
import { tick } from 'svelte';
import { matchSorter } from 'match-sorter'
import { getComponent, getTSComponent } from '$lib/svgToPath';
import { store } from '$lib/selection-store';
import SelectButton from './SelectButton.svelte';
import DownloadIcon from './DownloadIcon.svelte';
import { fade } from 'svelte/transition';
import FileSaver from "file-saver";
import JSZip from "jszip";
	import LoaderSpin from './LoaderSpin.svelte';

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

function snakeCaseToCamelCase(label: string) {
  return label.split('-').map(str => str[0].toUpperCase() + str.slice(1)).join('');
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

function handleSelect(isSelected: boolean, type: string, icon: Icon) {
  // if (isSelected) {
  //   $store.set(icon.id, icon);
  //   store.set($store);
  // } else {
  //   if ($store.has(icon.id)) {
  //     $store.delete(icon.id);
  //     store.set($store);
  //   }
  // }
}

let isDownloading = false;

function handleDownload() {
  if (isDownloading) return;
  isDownloading = true;

  setTimeout(() => {
    const zip = new JSZip();
    Object.keys($store).forEach(key => {
      const keySplit = key.split('_');
      const type = keySplit[0];
      const collection = keySplit[1];
      const iconName = keySplit[2];

      const collectionMap = collection === 'hero' ? heroIconsMap : (collection === 'feather' ? featherIconsMap : iconoirIconsMap);
      if (type === 'component') {
        zip.file(snakeCaseToCamelCase(iconName) + 'Icon.svelte', getComponent(collectionMap.get(iconName)?.svg!));
      } else if (type === 'tscomponent') {
        zip.file(snakeCaseToCamelCase(iconName)+ 'TS' + 'Icon.svelte', getTSComponent(collectionMap.get(iconName)?.svg!));
      } else {
        zip.file(iconName + '.svg', collectionMap.get(iconName)?.svg!);
      }
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      return FileSaver.saveAs(content, `svelte-icons-kit.zip`);
    }).finally(() => {
      isDownloading = false;
    })
  }, 1000);
}

$: isDownloadButtonVisible = Object.values($store).some(Boolean)
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
              <SelectButton
                id={icon.id}
                onCopy={() => copyComponent(icon.svg)}
                onCopyDone={handleCopyDone}
                label=".svelte"
                type="component"
              />
              <hr />
              <SelectButton
                id={icon.id}
                onCopy={() => copyTSComponent(icon.svg)}
                onCopyDone={handleCopyDone}
                label=".svelte (ts)"
                type="tscomponent"
              />
              <hr />
              <SelectButton
                id={icon.id}
                onCopy={() => icon.svg}
                onCopyDone={handleCopyDone}
                label=".svg"
                type="svg"
              />
            </div>
          </button>
          <div class="mt-3 truncate text-center text-[11px] leading-6 text-slate-500 font-light" title={icon.label}>
            {icon.label}
          </div>
        </div>
      {/each}
    </div>
  </div>

  {#if isDownloadButtonVisible}
    <div transition:fade class="fixed bottom-8 right-8">
      <button on:click={handleDownload} style:pointer-events={ isDownloading ? 'none' : 'all' } class="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
        {#if isDownloading}
          <LoaderSpin />
        {:else}
          <DownloadIcon size={20} strokeWidth={2} />
        {/if}
      </button>
    </div>
  {/if}
</div>