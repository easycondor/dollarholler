<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { convertDate } from '$lib/utils/dateHelpers';
  import LineItemRows from '../LineItemRows.svelte';
  import { loadSettings, settings } from '$lib/stores/SettingsStore';
  import { onMount } from 'svelte';

  export let data: { invoice: Invoice };
  //console.log({ data });

  onMount(() => {
    loadSettings();
    //console.log($settings);
  });

  const printInvoice = () => {
    console.log('print invoice');
  };

  const copyLink = () => {
    console.log('copy link');
  };

  const payInvoice = () => {
    console.log('Pay Invoice');
  };

  const sendIvoice = () => {
    console.log('Send Invoice');
  };
</script>

<div class="fixed z-0 mb-16 flex justify-between w-full max-w-screen-lg">
  <h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
  <div class="flex items-center gap-4">
    <Button
      height="short"
      label="print"
      style="outline"
      isAnimated={false}
      onClick={printInvoice}
    />
    <Button height="short" label="Copy Link" onClick={copyLink} />
    <Button height="short" label="Send" onClick={sendIvoice} />
    <Button height="short" label="Pay Invoice" onClick={payInvoice} />
  </div>
</div>

<div
  class="top-32 relative z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white py-16 px-32 shadow-invoice"
>
  <div class="col-span-3">
    <img
      src="/images/logo.png"
      srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
      alt="fncompany"
    />
  </div>
  <div class="col-span-2 col-start-5 pt-4">
    <!-- issue load asyn so waiting response -->
    {#if $settings && $settings.myName}
      <div class="label">From</div>
      <p>
        {$settings.myName} <br />
        {$settings.street} <br />
        {$settings.city}, {$settings.state}
        {$settings.zip}
      </p>
    {:else}
      <div class="center min-h-[68px] rounded bg-gallery">
        <a href="#" class="text-stone-600 underline hover:no-underline">Add your contact</a>
      </div>
    {/if}
  </div>

  <div class="col-span-3">
    <div class="label">Bill To:</div>
    <p>
      <strong>{data.invoice.client.name}</strong> <br />
      {data.invoice.client.email} <br />
      {data.invoice.client.street} <br />
      {data.invoice.client.city},{data.invoice.client.state}, {data.invoice.client.zip}
    </p>
  </div>

  <div class="col-span-2 col-start-5">
    <div class="label">Invoice id</div>
    <p>{data.invoice.invoiceNumber}</p>
  </div>

  <div class="col-span-2">
    <div class="label">Due Date</div>
    <p>{convertDate(data.invoice.dueDate)}</p>
  </div>

  <div class="col-span-2 col-start-5">
    <div class="label">Issue Date</div>
    <p>{convertDate(data.invoice.issueDate)}</p>
  </div>

  <div class="col-span-6">
    <div class="label">Subject</div>
    <p>{data.invoice.subject}</p>
  </div>

  <div class="col-span-6">
    <!-- lineItem -->
    <LineItemRows
      lineItems={data.invoice.lineItems}
      isEditable={false}
      discount={data?.invoice?.discount || 0}
    />
  </div>

  {#if data.invoice.notes}
    <div class="col-span-6">
      <div class="label">Note</div>
      <p>{data.invoice.notes}</p>
    </div>
  {/if}

  {#if data.invoice.terms}
    <div class="col-span-6">
      <div class="label">Terms</div>
      <p>{data.invoice.terms}</p>
    </div>
  {/if}
</div>

<style lang="postcss">
  .label {
    @apply font-black text-monsoon;
  }
</style>
