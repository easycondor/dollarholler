<script lang="ts">
  export let label: string;
  export let onClick: () => void;

  export let style: 'primary' | 'secondary' | 'destructive' = 'primary';

  export let isAnimated: boolean = true;
</script>

<div>
  <button
    on:click|preventDefault={() => onClick()}
    class="relative whitespace-normal rounded-lg px-5 lg:px-10 py-2 lg:py-3 font-sansSerif text-base lg:text-xl font-black"
    class:isAnimated
    class:primary={style === 'primary'}
    class:secondary={style === 'secondary'}
    class:destructive={style === 'destructive'}
    >{label}
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
</style>
