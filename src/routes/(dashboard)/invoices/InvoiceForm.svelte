<script lang="ts">
  import { addNewClient, clients, loadClients } from '$lib/stores/ClientStore';
  import { v4 as uuidv4 } from 'uuid';
  import { slide } from 'svelte/transition';
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/icons/Trash.svelte';
  import LineItemRows from './LineItemRows.svelte';
  import { states } from '$lib/utils/states';
  import { onMount } from 'svelte';
  import { today } from '$lib/utils/dateHelpers';
  import { addInvoice, updateInvoice } from '$lib/stores/InvoiceStore';
  import ConfirmDelete from '$lib/components/ConfirmDelete.svelte';
  import { snackbar } from '$lib/stores/SnackbarStore';

  const blankLineItem = {
    id: uuidv4(),
    description: '',
    quantity: 0,
    amount: 0
  };

  //let lineItems: LineItem[] = [{ ...blankLineItem }];

  let isNewClient: boolean = false;

  let isModalShowing: boolean = false;

  //Zarbi oui, il s'agit d'une fonction vide
  export let closePanel: () => void = () => {};

  export let invoice: Invoice = {
    client: {} as Client,
    lineItems: [{ ...blankLineItem }] as LineItem[]
  } as Invoice; //pas de besoin de donner les autres args d'invoice

  const initialDiscount = invoice.discount || 0;

  export let formState: 'create' | 'edit' = 'create';

  //partial si tout les arguments ne sont pas présent reconnait comme un type client
  let newClient: Partial<Client> = {};

  const AddLineItem = () => {
    invoice.lineItems = [...(invoice.lineItems as []), { ...blankLineItem, id: uuidv4() }];
  };

  //if invoice exist and lineItems
  const RemoveLineItem = (event: CustomEvent) => {
    invoice.lineItems =
      invoice?.lineItems && invoice.lineItems.filter((item) => item.id !== event.detail);
  };

  //Assure that svelte uptade the data on live
  const UpdateLineItem = () => {
    invoice.lineItems = invoice.lineItems;
  };

  const UpdateDiscount = (event: CustomEvent) => {
    invoice.discount = event.detail.discount;
  };

  const handleSubmit = () => {
    if (isNewClient) {
      //injecter le new client dans invoice
      invoice.client = newClient as Client;
      addNewClient(newClient as Client);
    }
    //console.log({ invoice, newClient }); //return the neme + object
    if (formState === 'create') {
      addInvoice(invoice);
      snackbar.send({
        message: 'Your invoice is created with success',
        type: 'success'
      });
    } else {
      updateInvoice(invoice);
      snackbar.send({
        message: 'Your invoice is updated with success',
        type: 'success'
      });
    }
    closePanel();
  };

  //Mount the data from the store
  onMount(() => {
    loadClients();
  });
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
  {#if formState === 'create'}
    Add
  {:else}
    Edit
  {/if}
  an Invoice
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
  <!-- Client -->
  <div class="field col-span-6 md:col-span-4">
    {#if !isNewClient}
      <!-- pas new client -->
      <label for="client">Client</label>
      <div class="flex items-end gap-x-2 md:gap-x-5 flex-wrap sm:flex-nowrap">
        <select
          class="mb-2 sm:mb-0"
          name="client"
          id="client"
          required={!isNewClient}
          bind:value={invoice.client.id}
          on:change={() => {
            const selectedClient = $clients.find((client) => client.id === invoice.client.id);
            invoice.client.name = selectedClient?.name !== undefined ? selectedClient.name : '';
          }}
        >
          <option />
          {#each $clients as client}
            <option value={client.id}>{client.name}</option>
          {/each}
        </select>
        <div class="text-base font-bold text-monsoon leading-[2.25rem] lg:leading-[3.5rem]">or</div>
        <Button
          label="+Client"
          onClick={() => {
            isNewClient = true;
            invoice.client.name = '';
            invoice.client.email = '';
          }}
          style="outline"
          isAnimated={false}
        />
      </div>
    {:else}
      <!-- new client -->
      <label for="NewClient">New Client</label>
      <div class="flex items-end gap-x-2 md:gap-x-5 flex-wrap sm:flex-nowrap">
        <input
          type="text"
          name="NewClient"
          required={isNewClient}
          bind:value={newClient.name}
          class="mb-2 sm:mb-0"
        />
        <div class="text-base font-bold text-monsoon leading-[2.25rem] lg:leading-[3.5rem]">or</div>
        <Button
          label="Existing_Client"
          onClick={() => {
            isNewClient = false;
            newClient = {}; //vide le new Client si on rempli le champ et on change pour revenir sur existing client
          }}
          style="outline"
          isAnimated={false}
        />
      </div>
    {/if}
  </div>

  <!-- invoice id -->
  <div class="field col-span-6 md:col-span-2 row-start-1 md:row-start-auto">
    <label for="id">Invoice Is</label>
    <input type="number" name="invoiceNumber" required bind:value={invoice.invoiceNumber} />
  </div>

  <!-- New client information -->
  {#if isNewClient}
    <div class="field grid col-span-6 gap-x-6" transition:slide>
      <div class="field col-span-6">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required={isNewClient}
          bind:value={newClient.email}
        />
      </div>

      <div class="field col-span-6">
        <label for="street">Street</label>
        <input type="text" name="street" id="street" bind:value={newClient.street} />
      </div>

      <div class="field col-span-2">
        <label for="city">City</label>
        <input type="text" name="city" id="city" bind:value={newClient.city} />
      </div>

      <div class="field col-span-2">
        <label for="state">State</label>
        <select name="state" id="state" bind:value={newClient.state}>
          <option />
          {#each states as state}
            <option value={state.value}>{state.name}</option>
          {/each}
        </select>
      </div>

      <div class="field col-span-2">
        <label for="zip">Zip</label>
        <input type="text" name="zip" id="zip" bind:value={newClient.zip} />
      </div>
    </div>
  {/if}
  <!-- due date -->
  <div class="filed col-span-3 md:col-span-2">
    <label for="dueDate">Due Date</label>
    <input type="date" name="dueDate" min={today} required bind:value={invoice.dueDate} />
  </div>

  <!-- issue date -->
  <div class="field col-span-3 md:col-span-2 md:col-start-5">
    <label for="issueDate">Issue Date</label>
    <input type="date" name="issueDate" min={today} bind:value={invoice.issueDate} />
  </div>

  <!-- subject -->
  <div class="field col-span-6">
    <label for="subject">Subject</label>
    <input type="text" name="subject" bind:value={invoice.subject} />
  </div>

  <!-- line items -->
  <div class="field col-span-6">
    <LineItemRows
      discount={invoice.discount}
      lineItems={invoice.lineItems}
      on:addLineItem={AddLineItem}
      on:removeLineItem={RemoveLineItem}
      on:uptadeLineItem={UpdateLineItem}
      on:updateDiscount={UpdateDiscount}
    />
  </div>

  <!-- notes -->
  <div class="field col-span-6">
    <label for="notes"
      >Notes <span class="font-normal">(optional, displayer on invoice)</span></label
    >
    <textarea name="notes" id="notes" bind:value={invoice.notes} />
  </div>
  <!-- terms -->
  <div class="field col-span-6">
    <label for="terms"
      >Terms <span class="font-normal">(optional, enter your terms and conditons)</span></label
    >
    <textarea name="terms" id="terms" bind:value={invoice.terms} />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
    </div>
  </div>
  <!-- button -->
  <div class="field col-span-2">
    <!-- only be visible if editing -->
    {#if formState === 'edit'}
      <Button
        label="Delete"
        style="textOnlyDestructive"
        isAnimated={false}
        onClick={() => {
          isModalShowing = true;
        }}
        iconLeft={Trash}
      >
        Delete
      </Button>
    {/if}
  </div>
  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button
      label="Cancel"
      style="secondary"
      isAnimated={false}
      onClick={() => {
        closePanel();
      }}
    />
    <button
      class="button bg-lavenderIndigo text-white translate-y-0 transition-all shadow-colored hover:shadow-coloredHover hover:-translate-y-2"
      type="submit">Save</button
    >
  </div>
</form>

<ConfirmDelete
  {invoice}
  {isModalShowing}
  on:close={() => {
    isModalShowing = false;
    closePanel();
  }}
/>
