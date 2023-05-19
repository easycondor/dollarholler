<script lang="ts">
  import { clickOutside } from '$lib/actions/ClickOutside';
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
  import { swipe } from '$lib/actions/Swipe';
  import Cancel from '$lib/components/icons/Cancel.svelte';
  import Send from '$lib/components/icons/Send.svelte';

  export let client: Client;

  //console.log(client);

  let isAdditionalMenuShowing: boolean = false;

  let isClientFormShowing = false;

  let triggerReset = false;

  const closePanel = () => {
    isClientFormShowing = false;
  };

  const handleEditing = () => {
    isClientFormShowing = true;
    isAdditionalMenuShowing = false;
  };

  const receivedInvoices = () => {
    if (client?.invoice) {
      //find the invoices that have been paid
      const paidInvoices = client.invoice.filter((invoice) => invoice.invoiceStatus === 'paid');
      // get the sum
      return sumInvoices(paidInvoices);
    } else {
      return 0;
    }
  };

  const balanceInvoices = () => {
    if (client?.invoice) {
      //find the invoices that haveNOT been paid
      const paidInvoices = client.invoice.filter((invoice) => invoice.invoiceStatus !== 'paid');
      // get the sum
      return sumInvoices(paidInvoices);
    } else {
      return 0;
    }
  };

  const handleArchiveClient = () => {
    client.clientStatus = 'archive';
    isAdditionalMenuShowing = false;
  };

  const handleDeleteClient = () => {
    console.log('deleting');
  };

  const handleActivateClient = () => {
    client.clientStatus = 'active';
    isAdditionalMenuShowing = false;
  };
</script>

<div class="relative">
  <div
    class="z-row relative client-table client-row rounded-lg bg-white lg:py-6 shadow-tableRow py-3"
    use:swipe={{ triggerReset }}
    on:outOfView={() => {
      triggerReset = false;
    }}
  >
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
    <div
      class="threedots relative hidden lg:flex justify-center items-center"
      use:clickOutside={() => {
        isAdditionalMenuShowing = false;
      }}
    >
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
              onClick: handleArchiveClient,
              disabled: client.clientStatus === 'archive'
            },
            {
              label: 'Delete',
              icon: Trash,
              onClick: () => {
                handleDeleteClient;
              },
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

  <!-- swipe to reveal -->
  <div class="swipe-revealed-action">
    <button
      class="action-button"
      on:click={() => {
        triggerReset = true;
      }}
    >
      <Cancel width={32} height={32} />
      Cancel
    </button>
    <button
      class="action-button"
      on:click={() => {
        handleEditing();
      }}
    >
      <Edit width={32} height={32} />
      Edit
    </button>
    {#if client.clientStatus === 'active'}
      <button class="action-button" on:click={handleEditing}>
        <Archive width={32} height={32} />
        Archive
      </button>
    {/if}
    {#if client.clientStatus === 'archive'}
      <button class="action-button" on:click={handleActivateClient}>
        <Activate width={32} height={32} />
        Activate
      </button>
    {/if}
    <button class="action-button" on:click={handleDeleteClient}>
      <Trash width={32} height={32} />
    </button>
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
  .action-button {
    @apply flex flex-col items-center justify-center font-bold text-daisyBush cursor-pointer;
  }

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
