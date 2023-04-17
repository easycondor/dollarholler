<script lang="ts">
  import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
  import { onMount } from 'svelte';
  import CircleAmount from '$lib/components/CircleAmount.svelte';
  import Search from '$lib/components/Search.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import BlankState from './BlankState.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';
  import Button from '$lib/components/Button.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import InvoiceForm from './InvoiceForm.svelte';

  let isInvoiceFormShowing: boolean = false;

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
  <Button
    label="+Invoice"
    onClick={() => {
      isInvoiceFormShowing = true;
    }}
  />
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

<!-- SlidePanel -->
{#if isInvoiceFormShowing}
  <SlidePanel
    on:closPanel={() => {
      isInvoiceFormShowing = false;
    }}
  >
    <InvoiceForm />
  </SlidePanel>
{/if}
