<script lang="ts">
  import { page } from '$app/stores';
  import Close from '$lib/components/icons/Close.svelte';
  import Hamburger from '$lib/components/icons/Hamburger.svelte';

  let isNavShowing = false;
</script>

<!-- SCROLL -->
<svelte:head>
  {#if isNavShowing}
    <style lang="postcss">
      body {
        @apply overflow-hidden md:overflow-auto;
      }
    </style>
  {/if}
</svelte:head>

<!-- MOBILE NAV CONTROLE -->
<button
  class="fixed right-6 top-6 z-navBarToggle md:hidden"
  class:text-goldenFizz={isNavShowing}
  class:text-daisyBusy={!isNavShowing}
  on:click={() => {
    isNavShowing = !isNavShowing;
  }}
>
  {#if isNavShowing}
    <Close width={32} height={32} />
  {:else}
    <Hamburger width={32} height={32} />
  {/if}
</button>

<!--HEADER -  MD => TRANSFORM -->
<header
  class="fixed z-navBar transition-transform md:relative md:col-span-3 md:h-full w-full h-screen bg-daisyBush -translate-x-full md:translate-x-0 text-center"
  class:translate-x-0={isNavShowing}
>
  <div class="mt-10 mb-10 md:mb-24">
    <a href="/"><img src="/images/logo.svg" alt="Dollar Holler" class="mx-auto" /></a>
  </div>

  <nav>
    <ul class="list-none text-2x1 font-bold">
      <li>
        <a href="/invoices" class:active={$page.url.pathname === '/invoices'}>Invoices</a>
      </li>
      <li><a href="/clients" class:active={$page.url.pathname === '/clients'}>Clients</a></li>
      <li><a href="#">Settings</a></li>
      <li><a href="#">Logout</a></li>
    </ul>
  </nav>
</header>

<style lang="postcss">
  nav ul li {
    @apply mb-6;
  }

  nav ul li a {
    @apply font-bold text-white hover:text-goldenFizz;
  }

  nav ul li a.active {
    @apply text-robinEggBlue px-8 transition-[padding];
    background: url('/images/active-nav--left.svg') left top no-repeat,
      url('/images/active-nav--right.svg') right top no-repeat;
  }

  nav ul li a.active:hover {
    @apply px-9;
  }
</style>
