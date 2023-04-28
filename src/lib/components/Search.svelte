<script lang="ts">
  import Search from '$lib/components/icons/Search.svelte';
</script>

<div class="relative flex w-full items-baseline">
  <div class="mr-2 text-pastelPurple mt:auto"><Search /></div>
  <input
    type="text"
    name="search"
    placeholder="Search by key-Word"
    class="search w-full md:w-[14rem] pr-[70px] md:pr-0 border-b-2 border-dashed border-b-pastelPurple bg-transparent font-sansSerif text-base lg:text-xl text-black outline-none focus:border-b-lavenderIndigo focus:border-solid"
  />
  <button
    class="pointer-events-none transform transition-transform absolute left-8 font-sansSerif text-lg lg:text-xl font-black text-pastelPurple"
    >Search</button
  >
</div>

<style lang="postcss">
  ::placeholder {
    color: transparent;
  }

  input:not(:placeholder-shown) + button,
  input:focus + button {
    @apply pointer-events-auto left-auto right-0 md:right-auto text-right lg:translate-x-80 md:left-0 md:translate-x-[16rem] translate-x-[calc(100%-65px)] text-lavenderIndigo;
  }

  input + button:focus,
  input:focus + button:hover {
    @apply text-daisyBush;
  }
</style>
