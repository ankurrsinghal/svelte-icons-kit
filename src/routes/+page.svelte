<script>
import './styles.css';
import heroIcons from '$lib/icons-outline.json';
import featherIcons from '$lib/feather-icons.json';
import iconoirIcons from '$lib/iconoir-icons.json';
import { infiniteScrollAction } from 'svelte-legos';
	import { tick } from 'svelte';

let currentTab = 0;
const perPage = 100;
let currentPage = 0;

$: {
  currentTab;
  currentPage = 0;
}
$: icons = currentTab === 0 ? heroIcons : (currentTab === 1 ? featherIcons : iconoirIcons);
$: totalNumberOfPages = Math.ceil(icons.length / perPage)
$: paginatedIcons = icons.slice(0, (currentPage + 1) * perPage)

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

</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Aleo:wght@300;400;700&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lexend:wght@100;200;300;400;500;600&family=Overpass:wght@100;200;300;400;500;600&display=swap" rel="stylesheet">
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
      <div class="pointer-events-none">
        <button class="text-gray-200">More coming soon...</button>
      </div>
    </div>
  </div>

  <div class="container mx-auto">
    <div class="border-b border-t border-black">
      <input class="w-full py-4 outline-none font-lexend font-light" placeholder="Seach for icons" />
    </div>

    <div
      class="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-x-6 gap-y-8 pt-10 pb-16 sm:pt-11 md:pt-12"
      use:infiniteScrollAction={{ distance: 300, cb: loadMore }}
    >
      {#each paginatedIcons as icon}
        <div>
          <button class="aspect-square ring-1 ring-inset ring-gray-200 w-full rounded-xl flex items-center justify-center">
            <div class="w-6 h-6">
              {@html icon.svg}
            </div>
          </button>
          <div class="mt-3 truncate text-center text-[0.8125rem] leading-6 text-slate-500 font-inter font-light" title={icon.label}>
            {icon.label}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>