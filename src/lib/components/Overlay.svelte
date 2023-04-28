<script lang="ts">
  import { fade } from 'svelte/transition';
  export let className: string = '';
</script>

<svelte:head>
  <style lang="postcss">
    body {
      @apply overflow-hidden;
    }
  </style>
</svelte:head>
<div class={`fixed inset-0 bg-blueGem opacity-60 z-overlay ${className}`} transition:fade />

<!-- inset-0 = top/left/Bottom/right + overflow hidden dont scroll -->
<!-- in svelte head for only this page apply css style -->
