<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { convertDate } from '$lib/utils/dateHelpers';
  import LineItemRows from '../LineItemRows.svelte';
  import { loadSettings, settings } from '$lib/stores/SettingsStore';
  import { onMount } from 'svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import { page } from '$app/stores';

  export let data: { invoice: Invoice };
  //console.log({ data });

  let copyLinkLabel = 'Copy Link';

  onMount(() => {
    loadSettings();
  });

  const printInvoice = () => {
    window.print();
  };

  const copyLink = () => {
    navigator.clipboard.writeText($page.url.href);
    copyLinkLabel = 'Copied!';

    setTimeout(() => {
      copyLinkLabel = 'Copy Link';
    }, 1250);
  };

  const payInvoice = () => {
    console.log('Pay Invoice');
  };

  const sendIvoice = () => {
    console.log('Send Invoice');
  };
</script>

<div
  class="fixed z-0 mb-16 flex flex-col md:flex-row gap-y-5 px-4 lg:px-0 justify-between w-full max-w-screen-lg print:hidden"
>
  <h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
  <div class="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
    <Button
      height="short"
      label="print"
      style="outline"
      isAnimated={false}
      onClick={printInvoice}
    />
    <Button
      height="short"
      label={copyLinkLabel}
      onClick={copyLink}
      className="min-w-[100px] sm:min-w-[168px] justify-center"
    />
    <Button height="short" label="Send" onClick={sendIvoice} />
    <Button height="short" label="Pay Invoice" onClick={payInvoice} />
  </div>
</div>

<div
  class="top-32 relative z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white py-8 px-5 md:py-16 md:px-32 shadow-invoice print:py-0 print:shadow-none print:top-0"
>
  <div class="sm:col-span-3 col-span-6 print:col-span-3">
    <img
      src="/images/logo.png"
      srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
      alt="fncompany"
    />
  </div>
  <div class="col-span-6 sm:col-span-2 sm:col-start-5 pt-4">
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

  <div class="col-span-6 sm:col-span-3 print:col-span-3">
    <div class="label">Bill To:</div>
    <p>
      <strong>{data.invoice.client.name}</strong> <br />
      {data.invoice.client.email} <br />
      {data.invoice.client.street} <br />
      {data.invoice.client.city},{data.invoice.client.state}, {data.invoice.client.zip}
    </p>
  </div>

  <div class="col-span-6 sm:col-span-2 sm:col-start-5">
    <div class="label">Invoice id</div>
    <p>{data.invoice.invoiceNumber}</p>
  </div>

  <div class="col-span-2">
    <div class="label">Due Date</div>
    <p>{convertDate(data.invoice.dueDate)}</p>
  </div>

  <div class="col-span-3 sm:col-span-2 sm:col-start-5">
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
      <SvelteMarkdown source={data.invoice.notes} />
    </div>
  {/if}

  {#if data.invoice.terms}
    <div class="col-span-6">
      <div class="label">Terms</div>
      <SvelteMarkdown source={data.invoice.terms} />
    </div>
  {/if}
</div>

<style lang="postcss">
  .label {
    @apply font-black text-monsoon;
  }
</style>
