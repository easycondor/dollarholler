<script lang="ts">
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import Portal from '$lib/components/Portal.svelte';
  import Overlay from './Overlay.svelte';
  import Arrow from './icons/Arrow.svelte';
  import { clickOutside } from '$lib/actions/ClickOutside';

  const dispatch = createEventDispatcher();
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      dispatch('close');
    }
  }}
/>

<Portal>
  <Overlay />
  <div
    class="bg-white overflow-scroll fixed w-full lg:w-3/4 h-screen pt-16 px-5 lg:py-20 lg:px-32 right-0 top-0 z-slidePanel shadow-slidePanel"
    transition:fly={{ x: 1000, duration: 500 }}
    use:clickOutside={() => {
      dispatch('closPanel');
    }}
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
