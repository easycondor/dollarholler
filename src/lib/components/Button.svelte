<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  export let label: string;
  export let onClick: () => void;

  export let style:
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'textOnly'
    | 'textOnlyDestructive' = 'primary';

  export let isAnimated: boolean = true;

  export let iconLeft: (new (...args: any[]) => SvelteComponent) | null = null;
  export let iconRight: (new (...args: any[]) => SvelteComponent) | null = null;
</script>

<div>
  <button
    on:click|preventDefault={() => onClick()}
    class="button"
    class:isAnimated
    class:primary={style === 'primary'}
    class:secondary={style === 'secondary'}
    class:destructive={style === 'destructive'}
    class:outline={style === 'outline'}
    class:textOnly={style === 'textOnly'}
    class:textOnlyDestructive={style === 'textOnlyDestructive'}
  >
    {#if iconLeft}
      <svelte:component this={iconLeft} class="mr-2" />
    {/if}
    {label}
    {#if iconRight}
      <svelte:component this={iconRight} class="ml-2" />
    {/if}
  </button>
</div>

<style lang="postcss">
  .isAnimated {
    @apply translate-y-0 transition-all shadow-colored hover:shadow-coloredHover hover:-translate-y-2;
  }

  .primary {
    @apply bg-lavenderIndigo text-white;
  }

  .secondary {
    @apply bg-gallery text-daisyBush;
  }

  .destructive {
    @apply bg-scarlet text-goldenFizz;
  }

  .outline {
    @apply border-daisyBush text-daisyBush hover:bg-daisyBush hover:text-white;
  }

  .textOnly {
    @apply bg-transparent px-0 text-scarlet underline hover:no-underline;
  }

  .textOnlyDestructive {
    @apply bg-transparent px-0 text-lavenderIndigo no-underline hover:underline;
  }
</style>