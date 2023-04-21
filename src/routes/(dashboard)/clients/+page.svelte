<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Search from '$lib/components/Search.svelte';
  import ClientRow from './ClientRow.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
  import { clients, loadClients } from '$lib/stores/ClientStore';
  import { onMount } from 'svelte';

  onMount(() => {
    loadClients();
  });
</script>

<svelte:head><title>Clients | The Dollar holler</title></svelte:head>

<div
  class="flex flex-col-reverse md:flex-row items-start justify-between md:items-center mb-7 gap-y-6 md:gap-y-4 lg:mb-16"
>
  <!-- SEARCH FIEL  -->
  <!-- {#if $invoices.length > 0} -->
  <Search />
  <!-- {:else} -->
  <div />
  <!-- {/if} -->

  <!-- NEW INVOICE BUTTON  -->
  <Button
    label="+Client"
    onClick={() => {
      //   isInvoiceFormShowing = true;
    }}
  />
</div>

<!-- Client -->
<div>
  {#if $clients === null}
    <!-- content here -->
    loading...
  {:else}
    <!-- client header -->
    <ClientRowHeader />
    <!-- Client rows -->
    <div class="flex flex-col-reverse">
      {#each $clients as client}
        <ClientRow {client} />
      {/each}
    </div>
  {/if}
</div>
