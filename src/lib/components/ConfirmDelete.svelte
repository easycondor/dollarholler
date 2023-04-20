<script lang="ts">
  import Modal from './Modal.svelte';
  import Button from './Button.svelte';
  import { deleteInvoice } from '$lib/stores/InvoiceStore';
  import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';
  import { createEventDispatcher } from 'svelte';
  import { snackbar } from '$lib/stores/SnackbarStore';

  const dispatch = createEventDispatcher();

  export let isModalShowing: boolean = false;

  export let invoice: Invoice;
</script>

<!-- dispatch forword the close event from Modal component -->
<Modal isVisible={isModalShowing} on:close>
  <div class="flex flex-col justify-between items-center gap-6 h-full min-h-[175px]">
    <div class="text-center text-xl font-bold text-daisyBush">
      Are you sure you want to delete this invoice
      <span class="text-scarlet">{invoice.client.name}</span>
      for <span class="text-scarlet">${centsToDollars(sumLineItems(invoice.lineItems))}</span> ?
    </div>
    <div class="flex gap-4">
      <Button
        isAnimated={false}
        style={'secondary'}
        label="Cancel"
        onClick={() => {
          dispatch('close');
        }}
      />
      <Button
        isAnimated={false}
        style={'destructive'}
        label="Delete It"
        onClick={() => {
          dispatch('close');
          deleteInvoice(invoice);
          snackbar.send({
            message: 'Your invoice was sucessfully deleted',
            type: 'success'
          });
        }}
      />
    </div>
  </div>
</Modal>
