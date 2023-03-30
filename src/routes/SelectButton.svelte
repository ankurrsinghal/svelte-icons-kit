<script lang="ts">
	import { store } from "$lib/selection-store";
	import { clickToCopyAction } from "svelte-legos";
	import CopyIcon from "./CopyIcon.svelte";
  
  export let id: string;
  export let type: string;
  export let label: string;
  export let onCopyDone: () => void;
  export let onCopy: () => string;
</script>

<button on:copy-done={onCopyDone} class="flex-1 hover:bg-black hover:text-white flex space-x-1 px-4 items-center" use:clickToCopyAction={onCopy}>
  <span><CopyIcon /></span>
  <span>{label}</span>
  <input
    bind:checked={$store[type + '_' + id]}
    on:click|stopPropagation={() => {}}
    style:margin-left="auto"
    type="checkbox"
  />
</button>