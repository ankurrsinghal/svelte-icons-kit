<script lang="ts">
import './styles.css';
import { heroIcons, iconoirIcons, featherIcons, type Icon, heroIconsMap, featherIconsMap, iconoirIconsMap, streamLineIcons, akarIcons } from '$lib/icons'
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
	import TwitterIcon from './TwitterIcon.svelte';
	import GithubIcon from './GithubIcon.svelte';
	import CreditsInfo from './CreditsInfo.svelte';

let query = '';
const perPage = 100;
let currentPage = 0;

interface Tab {
  id: number;
  title: string;
  link: string;
  icons: Icon[];
}

const tabs: Tab[] = [
  { id: 0, title: 'Hero Icons', link: 'https://heroicons.com/', icons: heroIcons },
  { id: 1, title: 'Feather Icons', link: 'https://feathericons.com/', icons: featherIcons },
  { id: 2, title: 'Iconoir Icons', link: 'https://iconoir.com/', icons: iconoirIcons },
  { id: 3, title: 'Streamline Icons', link: 'https://www.streamlinehq.com/', icons: streamLineIcons },
  { id: 4, title: 'Akar Icons', link: 'https://akaricons.com/', icons: akarIcons },
]

let currentTab: Tab = tabs[0];

$: {
  currentTab;
  currentPage = 0;
}
$: icons = currentTab.icons;
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
    <div class="my-10 flex items-start">
      <h1 class="text-8xl font-extralight leading-snug">Svelte Icons<br /><span class="text-prime">Kit</span></h1>
      <div class="ml-auto flex space-x-5 mt-5">
        <a
          href="https://www.twitter.com/ankurpsinghal"
          class="text-sm flex items-center justify-center rounded-full bg-[#1D9BF0] text-white py-2 px-6 shadow-lg transition-all hover:bg-[#1A8CD8]"
          target="_blank"
          rel="noreferrer"
        >
          <TwitterIcon size={20} />
        </a>
        <a
          href="https://github.com/ankurrsinghal/svelte-icons-kit"
          class="text-sm flex items-center justify-center rounded-full bg-gray-700 text-white py-2 px-6 shadow-lg transition-all hover:bg-black"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon size={20} />
        </a>
      </div>
    </div>
  </header>

  <div class="container mx-auto my-8">
    <div class="flex space-x-6">
      {#each tabs as tab}
        <div>
          <button on:click={() => (currentTab = tab)} class="{currentTab === tab ? 'text-black' : 'text-gray-300'}">{tab.title} ({tab.icons.length})</button>
        </div>  
      {/each}
    </div>
  </div>

  <div class="container mx-auto">
    <div class="border-b border-t border-black">
      <input bind:value={query} class="w-full py-4 outline-none font-lexend font-light" placeholder="Seach for icons" />
    </div>
    <div>
      <CreditsInfo>
        <a href={currentTab.link} class="text-gray-900" target="_blank" rel="noreferrer">{currentTab.title}</a>
      </CreditsInfo>
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