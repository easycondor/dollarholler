<script lang="ts">
  import { SvelteComponent } from 'svelte';
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
    class="flex items-center relative whitespace-normal rounded-lg px-5 lg:px-10 py-2 lg:py-3 font-sansSerif text-base lg:text-xl font-black"
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
    @apply border-daisyBush hover:bg-daisyBush hover:text-white;
  }

  .textOnly {
    @apply bg-transparent px-0 text-scarlet underline hover:no-underline;
  }

  .textOnlyDestructive {
    @apply bg-transparent px-0 text-lavenderIndigo no-underline hover:underline;
  }
</style>
