<script lang="ts">
  import CircleAmount from '$lib/components/CircleAmount.svelte';
  import Search from '$lib/components/Search.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
</script>

<svelte:head>
  <title>Invoices - The Dollar Holler</title>
</svelte:head>

<div class="flex justify-between items-center mb-16">
  <!-- SEARCH FIEL  -->
  <Search />

  <!-- NEW INVOICE BUTTON  -->
  <div>
    <button
      class="relative whitespace-normal rounded-lg bg-lavenderIndigo px-10 py-3 font-sansSerif text-xl font-black text-white shadow-colored hover:shadow-coloredHover translate-y-0 hover:-translate-y-2"
      >+Invoice</button
    >
  </div>
</div>

<!-- LIST OF INVOICES  -->
<div>
  <!-- HEADER -->
  <div class="table-header invoice-table text-daisyBush">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>Id</h3>
    <h3>Client</h3>
    <h3>Amount</h3>
    <div />
    <div />
  </div>

  <!-- INVOICES -->
  <div class="invoice-table items-center bg-white py-6 rounded-lg shadow-tableRow">
    <div><Tag label="sent" /></div>
    <div class="text-lg">8/1/2022</div>
    <div class="text-lg">1234</div>
    <div class="text-xl font-bold">Compressed firm</div>
    <div class="text-lg font-mono font-bold">$45</div>
    <div class="text-lg center">
      <a href="#" class="text-pastelPurple hover:text-daisyBush"><View /></a>
    </div>
    <div class="text-lg center">
      <button class=" text-pastelPurple hover:text-daisyBush"><ThreeDots /></button>
    </div>
  </div>
</div>

<CircleAmount label="Total" amount="$1114.00" />

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-black leading-snug;
  }
</style>
