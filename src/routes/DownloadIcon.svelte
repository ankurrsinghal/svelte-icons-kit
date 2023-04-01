<script>
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
>
<path xmlns="http://www.w3.org/2000/svg" d="M12 16L18 21H6L12 16Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path xmlns="http://www.w3.org/2000/svg" d="M3.99927 18C2.74389 16.3287 2 14.2512 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 14.2512 21.2561 16.3287 20.0007 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path xmlns="http://www.w3.org/2000/svg" d="M17.1228 15.1252C17.6793 14.215 18 13.1449 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 13.144 6.32014 14.2131 6.87572 15.1228" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path xmlns="http://www.w3.org/2000/svg" d="M14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
