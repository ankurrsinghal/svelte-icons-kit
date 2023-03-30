export function getComponent(svg: string) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(svg, "image/svg+xml");
  const path = dom.querySelector('svg')?.innerHTML;
  return `<script>
    export let size = 'medium';
    export let stroke = 'currentColor';
    export let strokeWidth = 1.5;
    export let className = '';

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
  >${path}</svg>
`;
}

export function getTSComponent(svg: string) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(svg, "image/svg+xml");
  const path = dom.querySelector('svg')?.innerHTML;
  return `<script lang="ts">
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
  >${path}</svg>
`;
}