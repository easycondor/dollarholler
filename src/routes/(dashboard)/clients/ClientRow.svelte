<script lang="ts">
  import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Edit from '$lib/components/icons/Edit.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
  import Trash from '$lib/components/icons/Trash.svelte';
  import Archive from '$lib/components/icons/Archive.svelte';
  import Activate from '$lib/components/icons/Activate.svelte';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ClientForm from './ClientForm.svelte';

  export let client: Client;

  console.log(client);

  let isAdditionalMenuShowing: boolean = false;

  let isClientFormShowing = false;

  const closePanel = () => {
    isClientFormShowing = false;
  };

  const handleEditing = () => {
    isClientFormShowing = true;
    isAdditionalMenuShowing = false;
  };

  const receivedInvoices = () => {
    if (client?.invoices) {
      //find the invoices that have been paid
      const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus === 'paid');
      // get the sum
      return sumInvoices(paidInvoices);
    } else {
      return 0;
    }
  };

  const balanceInvoices = () => {
    if (client?.invoices) {
      //find the invoices that haveNOT been paid
      const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus !== 'paid');
      // get the sum
      return sumInvoices(paidInvoices);
    } else {
      return 0;
    }
  };
</script>

<div class="client-table client-row rounded-lg bg-white lg:py-6 shadow-tableRow py-3">
  <div class="status">
    <Tag className="ml-auto" label={client.clientStatus} />
  </div>
  <div class="client-name truncate whitespace-nowrap text-base lg:text-xl font-bold">
    {client.name}
  </div>
  <div class="received first-letter:text-right font-mono text-sm lg:text-lg font-bold">
    $ {centsToDollars(receivedInvoices())}
  </div>
  <div class="balance text-right font-mono text-sm lg:text-lg font-bold text-scarlet">
    $ {centsToDollars(balanceInvoices())}
  </div>
  <div class="view relative hidden lg:flex justify-center items-center">
    <!-- lien vers invidual page -->
    <a href={`/clients/${client.id}`} class="text-pastelPurple hover:text-daisyBush"> <View /></a>
  </div>
  <div class="threedots relative hidden lg:flex justify-center items-center">
    <button
      on:click={() => {
        isAdditionalMenuShowing = !isAdditionalMenuShowing;
      }}
      class="text-pastelPurple hover:text-daisyBush"><ThreeDots /></button
    >
    {#if isAdditionalMenuShowing}
      <AdditionalOptions
        options={[
          { label: 'Edit', icon: Edit, onClick: handleEditing, disabled: false },
          {
            label: 'Archive',
            icon: Archive,
            onClick: () => {
              client.clientStatus = 'archive';
              isAdditionalMenuShowing = false;
            },
            disabled: client.clientStatus === 'archive'
          },
          {
            label: 'Delete',
            icon: Trash,
            onClick: () => console.log('deleting'),
            disabled: false
          },
          {
            label: 'Activate',
            icon: Activate,
            onClick: () => {
              client.clientStatus = 'active';
              isAdditionalMenuShowing = false;
            },
            disabled: client.clientStatus === 'active'
          }
        ]}
      />
    {/if}
  </div>
</div>

<!-- SlidePanel -->
{#if isClientFormShowing}
  <SlidePanel
    on:closPanel={() => {
      closePanel();
    }}
  >
    <ClientForm {closePanel} formStatus="edit" {client} />
  </SlidePanel>
{/if}

<style lang="postcss">
  .client-row {
    grid-template-areas:
      'clientName status'
      'received balance';
  }

  @media (min-width: 1024px) {
    .client-row {
      grid-template-areas: 'status clientName  received balance view threedots';
    }
  }

  .client-name {
    grid-area: clientName;
  }

  .status {
    grid-area: status;
  }

  .received::before {
    content: 'Received';
    @apply block text-xs font-bold lg:hidden;
  }

  .received {
    grid-area: received;
    @apply text-left lg:text-right;
  }

  .balance::before {
    content: 'Balance';
    @apply block text-xs font-bold lg:hidden;
  }

  .balance {
    grid-area: balance;
  }
</style>
