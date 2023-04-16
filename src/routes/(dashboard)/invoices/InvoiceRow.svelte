<script lang="ts">
  import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import ThreeDots from '$lib/components/icons/ThreeDots.svelte';
  import View from '$lib/components/icons/View.svelte';
  import { convertDate, isLate } from '$lib/utils/dateHelpers';
  import { sumLineItems, centsToDollars } from '$lib/utils/moneyHelpers';
  import Send from '$lib/components/icons/Send.svelte';
  import Trash from '$lib/components/icons/Trash.svelte';
  import Edit from '$lib/components/icons/Edit.svelte';

  export let invoice: Invoice;

  let isAdditionalMenuShowing = false;

  let isOptionsDisabled = false;

  const handleDelete = () => {
    console.log('delete');
  };

  const handleEdit = () => {
    console.log('Edit');
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

<div
  class="invoice-table invoice-row items-center bg-white py-3 lg:py-6 rounded-lg shadow-tableRow"
>
  <div class="status"><Tag className="ml-auto lg:ml-0" label={getInvoiceLabel()} /></div>
  <div class="text-sm lg:text-lg dueDate">{convertDate(invoice.dueDate)}</div>
  <div class="text-sm lg:text-lg invoiceNumber">{invoice.invoiceNumber}</div>
  <div class="text-base lg:text-xl font-bold clientName whitespace-nowrap truncate">
    {invoice.client.name}
  </div>
  <div class="text-sm lg:text-lg font-mono font-bold amount text-right">
    ${centsToDollars(sumLineItems(invoice.lineItems))}
  </div>
  <div class="text-sm lg:text-lg viewButton hidden lg:flex center">
    <a href="#" class="text-pastelPurple hover:text-daisyBush"><View /></a>
  </div>
  <div class="text-lg center moreButton hidden lg:flex relative">
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

<style lang="postcss">
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
