<script lang="ts">
  type IconSize = 'small' | 'medium' | 'large' | number;
  export let size: IconSize = 'medium';
  export let stroke: string = 'currentColor';
  export let strokeWidth: number = 1.5;
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
  stroke-width={strokeWidth}
  width={dimension}
  height={dimension}
>
<path xmlns="http://www.w3.org/2000/svg" d="M6 20L18 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path xmlns="http://www.w3.org/2000/svg" d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
