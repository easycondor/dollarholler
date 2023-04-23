<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import Arrow from '$lib/components/icons/Arrow.svelte';

  let previousPage: string | undefined = undefined;

  afterNavigate((navigation) => {
    //? if navigation exist and if from exist and if url exist so put in variable
    previousPage = navigation?.from?.url?.pathname;
  });
</script>

<!-- Escape to go back as arrow -->
<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape') {
      goto(previousPage || '/clients');
    }
  }}
/>

<div
  class="bg-whisper h-full min-h-screen w-screen pt-16 lg:pt-12 pb-32 print:bg-transparent print:pt-0 print:pb-0"
>
  <main class="mx-auto max-w-screen-lg min-h-screen">
    <a
      href={previousPage ? previousPage : '/clients'}
      class="fixed top-7 left-7 text-pastelPurple print:hidden"
    >
      <Arrow /></a
    >
    <slot><!-- optional fallback --></slot>
  </main>
</div>
