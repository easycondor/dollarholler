<script lang="ts">
  import { clickOutside } from '$lib/actions/ClickOutside';
  import { swipe } from '$lib/actions/Swipe';
  import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
  import { convertDate, isLate } from '$lib/utils/dateHelpers';
  import { centsToDollars, invoiceTotal } from '$lib/utils/moneyHelpers';
  import Send from '$lib/components/icons/Send.svelte';
  import Trash from '$lib/components/icons/Trash.svelte';
  import Edit from '$lib/components/icons/Edit.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import InvoiceForm from './InvoiceForm.svelte';
  import ConfirmDelete from '$lib/components/ConfirmDelete.svelte';
  import Cancel from '$lib/components/icons/Cancel.svelte';

  export let invoice: Invoice;

  let isAdditionalMenuShowing = false;

  let isOptionsDisabled = false;

  let isModalShowing: boolean = false;

  let isInvoiceFormShowing: boolean = false;

  const handleDelete = () => {
    //console.log('delete');
    isModalShowing = true;
    isAdditionalMenuShowing = false;
  };

  const handleEdit = () => {
    console.log('Edit');
    isInvoiceFormShowing = true;
    isAdditionalMenuShowing = false;
  };

  const handleSendInvoice = () => {
    console.log('Send');
  };

  const getInvoiceLabel = () => {
    if (invoice.invoiceStatus === 'draft') {
      return 'draft';
    } else if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) {
      isOptionsDisabled = true;
      return 'sent';
    } else if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) {
      isOptionsDisabled = true;
      return 'late';
    } else if (invoice.invoiceStatus === 'paid') {
      isOptionsDisabled = true;
      return 'paid';
    }
  };
</script>

<div class="relative">
  <div
    class="invoice-table z-row relative invoice-row items-center bg-white py-3 lg:py-6 rounded-lg shadow-tableRow"
    use:swipe
  >
    <div class="status"><Tag className="ml-auto lg:ml-0" label={getInvoiceLabel()} /></div>
    <div class="text-sm lg:text-lg dueDate">{convertDate(invoice.dueDate)}</div>
    <div class="text-sm lg:text-lg invoiceNumber">{invoice.invoiceNumber}</div>
    <div class="text-base lg:text-xl font-bold clientName whitespace-nowrap truncate">
      {invoice.client.name}
    </div>
    <div class="text-sm lg:text-lg font-mono font-bold amount text-right">
      ${centsToDollars(invoiceTotal(invoice.lineItems, invoice.discount))}
    </div>
    <div class="text-sm lg:text-lg viewButton hidden lg:flex center">
      <a href={`/invoices/${invoice.id}`} class="text-pastelPurple hover:text-daisyBush"><View /></a
      >
    </div>
    <div
      class="text-lg center moreButton hidden lg:flex relative"
      use:clickOutside={() => {
        isAdditionalMenuShowing = false;
      }}
    >
      <button
        class=" text-pastelPurple hover:text-daisyBush"
        on:click={() => {
          isAdditionalMenuShowing = !isAdditionalMenuShowing;
        }}><ThreeDots /></button
      >
      {#if isAdditionalMenuShowing}
        <AdditionalOptions
          options={[
            { label: 'Edit', icon: Edit, onClick: handleEdit, disabled: isOptionsDisabled },
            { label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false },
            { label: 'Send', icon: Send, onClick: handleSendInvoice, disabled: isOptionsDisabled }
          ]}
        />
      {/if}
    </div>
  </div>
  <!-- swipe to reveal -->
  <div class="flex w-full items-center justify-around absolute inset-0 h-full z-rowAction">
    <button class="action-button">
      <Cancel width={32} height={32} />
    </button>
    {#if !isOptionsDisabled}
      <button class="action-button" on:click={handleEdit}>
        <Edit width={32} height={32} />
      </button>

      <button class="action-button" on:click={handleSendInvoice}>
        <Send width={32} height={32} />
      </button>
    {/if}
    <button class="action-button" on:click={handleDelete}>
      <Trash width={32} height={32} />
    </button>
    <a href={`/invoices/${invoice.id}`} class="action-button" on:click={handleDelete}>
      <View width={32} height={32} />
    </a>
  </div>
</div>

<!-- Confirm Modal -->
<ConfirmDelete {invoice} {isModalShowing} on:close={() => (isModalShowing = false)} />
<!-- SlidePanel -->
{#if isInvoiceFormShowing}
  <SlidePanel
    on:closPanel={() => {
      isInvoiceFormShowing = false;
    }}
  >
    <InvoiceForm {invoice} formState="edit" closePanel={() => (isInvoiceFormShowing = false)} />
  </SlidePanel>
{/if}

<style lang="postcss">
  .action-button {
    @apply flex flex-col items-center justify-center font-bold text-daisyBush cursor-pointer;
  }

  .invoice-row {
    grid-template-areas:
      'invoiceNumber invoiceNumber'
      'clientName amount'
      'dueDate status';
  }

  @media (min-width: 1024px) {
    .invoice-row {
      grid-template-areas: 'status dueDate invoiceNumber clientName amount viewButton moreButton';
    }
  }

  .invoice-row .status {
    grid-area: status;
  }

  .invoice-row .dueDate {
    grid-area: dueDate;
  }

  .invoice-row .invoiceNumber {
    grid-area: invoiceNumber;
  }

  .invoice-row .clientName {
    grid-area: clientName;
  }

  .invoice-row .amount {
    grid-area: amount;
  }

  .invoice-row .viewButton {
    grid-area: viewButton;
  }

  .invoice-row .moreButton {
    grid-area: moreButton;
  }
</style>
