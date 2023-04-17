<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Portal from '$lib/components/Portal.svelte';
  import Overlay from './Overlay.svelte';
  import Arrow from './icons/Arrow.svelte';

  const dispatch = createEventDispatcher();
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      dispatch('closePanel');
    }
  }}
/>

<Portal>
  <Overlay />
  <div
    class="bg-white overflow-scroll fixed w-3/4 h-screen py-20 px-32 right-0 top-0 z-slidePanel shadow-slidePanel"
  >
    <button
      on:click={() => dispatch('closPanel')}
      class="absolute top-5 left-7 text-pastelPurple hover:text-daisyBush"
    >
      <Arrow />
    </button>
    <slot><!-- optional fallback --></slot>
  </div>
</Portal>
