<script lang="ts">
  import Search from '$lib/components/icons/Search.svelte';
</script>

<div class="relative flex w-full items-baseline">
  <div class="mr-2 text-pastelPurple mt:auto"><Search /></div>
  <input
    type="text"
    name="search"
    placeholder="Search by key-Word"
    class="w-72 border-b-2 border-dashed border-b-pastelPurple bg-transparent font-sansSerif text-x1 text-black outline-none focus:border-b-lavenderIndigo focus:border-solid"
  />
  <button class="font-sansSerif text-x1 font-black text-pastelPurple">Search</button>
</div>
