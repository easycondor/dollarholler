<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Overlay from './Overlay.svelte';
  import Portal from './Portal.svelte';
  import Cancel from './icons/Cancel.svelte';
  //Ovelray is wrap the entire page

  export let isVisible: boolean = false;

  const dispatch = createEventDispatcher();
</script>

{#if isVisible}
  <Portal>
    <Overlay />
    <div class="fixed inset-0 z-modal flex items-center justify-center">
      <div class="max-w-[450px] min-h-[230px] w-full rounded-lg bg-white px-10 py-7 relative">
        <button
          on:click={() => dispatch('close')}
          class="right-4 top-4 absolute text-pastelPurple hover:text-daisyBush"
        >
          <Cancel />
        </button>
        <slot><!-- optional fallback --></slot>
      </div>
    </div>
  </Portal>
{/if}
