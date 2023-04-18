<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import LineItemRow from './LineItemRow.svelte';
  import Button from '$lib/components/Button.svelte';
  import CircleAmount from '$lib/components/CircleAmount.svelte';
  import { centsToDollars, sumLineItems, twoDecimals } from '$lib/utils/moneyHelpers';
  export let lineItems: LineItem[] | undefined = undefined;

  let subtotal: string = '0.00';

  let dispatch = createEventDispatcher();

  export let discount: number = 0;

  let discountedAmount: string = '0.00';

  let total: string = '0.00';

  //au départ on obtient NAN => ajout condition
  $: if (sumLineItems(lineItems) > 0) {
    subtotal = centsToDollars(sumLineItems(lineItems));
  }

  $: if (subtotal && discount) {
    discountedAmount = centsToDollars(sumLineItems(lineItems) * (discount / 100));
  }

  $: total = twoDecimals(Number(subtotal) - Number(discountedAmount));
</script>

<div class="invoice-line-item border-b-2 border-daisyBush pb-2">
  <div class="table-header">Description</div>
  <div class="table-header text-right">Unit price</div>
  <div class="table-header text-center">Qty</div>
  <div class="table-header text-right">Amount</div>
</div>
<!-- !!! forward event removeLineItem and uptadeLineItem  up to invoiceForm -->
{#if lineItems}
  {#each lineItems as lineItem, index}
    <LineItemRow
      {lineItem}
      on:removeLineItem
      canDelete={index > 0}
      on:uptadeLineItem
      isRequired={index === 0}
    />
  {/each}
{/if}

<div class="invoice-line-item">
  <div class="col-span-2">
    <Button
      label="+ Line Item"
      style="textOnlyDestructive"
      onClick={() => {
        dispatch('addLineItem');
      }}
      isAnimated={false}
    />
  </div>
  <div class="font-bold py-5 text-right text-monsoon">Subtotal</div>
  <div class="py-5 text-right font-mono">${subtotal}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-2 font-bold py-5 text-right text-monsoon">Discount</div>
  <div class="relative">
    <input
      class="line-item h-10 w-full border-b-2 border-dashed border-stone-300 pr-4 text-right focus:border-solid focus:border-lavenderIndigo focus:outline-none"
      type="number"
      name="discount"
      min="0"
      max="100"
      bind:value={discount}
    />
    <span class="absolute right-0 top-2 text-mono">%</span>
  </div>
  <div class="py-5 text-right font-mono">${discountedAmount}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-6">
    <CircleAmount label="Total" amount={`$${total}`} />
  </div>
</div>

<style lang="postcss">
  .table-header {
    @apply text-sm font-bold text-daisyBush;
  }
</style>
