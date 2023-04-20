<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import Portal from './Portal.svelte';
  import Cancel from './icons/Cancel.svelte';
  import SnackbarMessage from './SnackbarMessage.svelte';
  import { snackbar } from '$lib/stores/SnackbarStore';
</script>

<Portal>
  <div class="fixed top-5 left-1/2 -translate-x-1/2 z-toaster">
    {#each $snackbar as content (content.id)}
      <!-- content here -->
      <div class="" in:fly={{ opacity: 0, y: -100 }} out:fade={{ duration: 300 }} animate:flip>
        <div
          class="inline-block rounded-lg px-5 py-4 text-lg font-bold mb-2"
          class:info={content.type === 'info'}
          class:warning={content.type === 'warning'}
          class:error={content.type === 'error'}
          class:success={content.type === 'success'}
        >
          <div class="flex gap-4">
            <SnackbarMessage message={content.message} />
            <button
              on:click={() => {
                snackbar.remove(content.id);
              }}><Cancel /></button
            >
          </div>
        </div>
      </div>
    {/each}
  </div>
</Portal>

<style lang="postcss">
  .info {
    @apply bg-prim text-daisyBush;
  }

  .warning {
    @apply bg-goldenFizz text-scarlet;
  }

  .error {
    @apply bg-scarlet text-goldenFizz;
  }

  .success {
    @apply bg-robinEggBlue text-daisyBush;
  }
</style>
