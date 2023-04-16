<script lang="ts">
  import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
  import { onMount } from 'svelte';
  import CircleAmount from '$lib/components/CircleAmount.svelte';
  import Search from '$lib/components/Search.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import BlankState from './BlankState.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';

  onMount(() => {
    loadInvoices();
    console.log($invoices);
  });
</script>

<svelte:head>
  <title>Invoices - The Dollar Holler</title>
</svelte:head>

<div
  class="flex flex-col-reverse md:flex-row items-start justify-between md:items-center mb-7 gap-y-6 md:gap-y-4 lg:mb-16"
>
  <!-- SEARCH FIEL  -->
  {#if $invoices.length > 0}
    <Search />
  {:else}
    <div />
  {/if}

  <!-- NEW INVOICE BUTTON  -->
  <div>
    <button
      class="relative whitespace-normal rounded-lg bg-lavenderIndigo px-5 lg:px-10 py-2 lg:py-3 font-sansSerif text-base lg:text-xl font-black text-white shadow-colored hover:shadow-coloredHover translate-y-0 hover:-translate-y-2"
      >+Invoice</button
    >
  </div>
</div>

<!-- LIST OF INVOICES  -->
<div>
  <!-- HEADER -->

  <!-- INVOICES -->
  {#if invoices === null}
    loading....
  {:else if $invoices.length <= 0}
    <BlankState />
  {:else}
    <InvoiceRowHeader className="text-daisyBush" />
    <div class="flex flex-col-reverse">
      {#each $invoices as invoice}
        <InvoiceRow {invoice} />
      {/each}
    </div>
    <CircleAmount label="Total" amount={`$${centsToDollars(sumInvoices($invoices))}`} />
  {/if}
</div>
