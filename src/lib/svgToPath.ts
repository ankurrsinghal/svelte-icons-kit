export function getComponent(svg: string) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(svg, "image/svg+xml");
  const path = dom.querySelector('svg')?.innerHTML;
  return `<script>
    export let size = 'medium';
    export let stroke = 'currentColor';

    const defaultSize = 24;

    const sizeMap = {
      large: 24,
      medium: 16,
      small: 12,
    }

    $: dimension = typeof size === 'number' ? size : (sizeMap[size] || defaultSize);
  </script>

  <svg
    {stroke}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    width={dimension}
    height={dimension}
  >${path}</svg>
`;
}