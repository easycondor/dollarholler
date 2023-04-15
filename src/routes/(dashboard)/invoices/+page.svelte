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

<div
  class="flex flex-col-reverse md:flex-row items-start justify-between md:items-center mb-7 gap-y-6 md:gap-y-4 lg:mb-16"
>
  <!-- SEARCH FIEL  -->
  <Search />

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
  <div class="table-header invoice-table text-daisyBush hidden lg:grid">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>Id</h3>
    <h3>Client</h3>
    <h3>Amount</h3>
    <div />
    <div />
  </div>

  <!-- INVOICES -->
  <div
    class="invoice-table invoice-row items-center bg-white py-3 lg:py-6 rounded-lg shadow-tableRow"
  >
    <div class="status"><Tag className="ml-auto lg:ml-0" label="sent" /></div>
    <div class="text-sm lg:text-lg dueDate">8/1/2022</div>
    <div class="text-sm lg:text-lg invoiceNumber">1234</div>
    <div class="text-base lg:text-xl font-bold clientName">Compressed firm</div>
    <div class="text-sm lg:text-lg font-mono font-bold amount text-right">$45</div>
    <div class="text-sm lg:text-lg viewButton hidden lg:block center">
      <a href="#" class="text-pastelPurple hover:text-daisyBush"><View /></a>
    </div>
    <div class="text-lg center moreButton hidden lg:block">
      <button class=" text-pastelPurple hover:text-daisyBush"><ThreeDots /></button>
    </div>
  </div>
</div>

<CircleAmount label="Total" amount="$1114.00" />

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-black leading-snug;
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
