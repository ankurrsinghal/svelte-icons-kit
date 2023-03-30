<script lang="ts">
  type IconSize = 'small' | 'medium' | 'large' | number;
  export let size: IconSize = 'medium';
  export let stroke: string = 'currentColor';
  export const className: string = '';

  const defaultSize = 24;

  const sizeMap = {
    large: 24,
    medium: 16,
    small: 12,
  }

  $: dimension = typeof size === 'number' ? size : (sizeMap[size] || defaultSize);
</script>

<svg
  class={className}
  {stroke}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  width={dimension}
  height={dimension}
>
<path xmlns="http://www.w3.org/2000/svg" d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path xmlns="http://www.w3.org/2000/svg" d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
