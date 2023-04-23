<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { states } from '$lib/utils/states';
  import { addNewClient } from '$lib/stores/ClientStore';
  import Trash from '$lib/components/icons/Trash.svelte';
  import Check from '$lib/components/icons/Check.svelte';

  //Obkect client
  export let client: Client = {} as Client;

  //Zarbi oui, il s'agit d'une fonction vide
  export let closePanel: () => void = () => {};

  //Save button 0> submit => update store from ClientStore
  const handleSubmit = () => {
    //console.log({ client });//log the contenu de l'objet bind ave les champs
    addNewClient(client);
    closePanel();
  };
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add a Client</h2>

<form class="gird grid-col-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
  <!-- Client name -->
  <div class="field col-span-6">
    <label for="name">Client Name</label>
    <input type="text" name="name" required bind:value={client.name} />
  </div>
  <!-- Client email -->
  <div class="field col-span-6">
    <label for="email">Email Address</label>
    <input type="email" name="email" required bind:value={client.email} />
  </div>
  <!-- Client adress -->
  <div class="field col-span-6">
    <label for="street">Address</label>
    <input type="text" name="street" required bind:value={client.street} />
  </div>
  <!-- Client city state zip -->
  <div class="flex gap-x-4">
    <div class="field">
      <label for="city">City</label>
      <input type="text" name="city" bind:value={client.city} />
    </div>

    <div class="field">
      <label for="state">State</label>
      <select name="state" id="state" bind:value={client.state}>
        <option />
        {#each states as state}
          <option value={state.value}>{state.name}</option>
        {/each}
      </select>
    </div>

    <div class="field">
      <label for="zip">Zip</label>
      <input type="number" name="zip" minlength="5" bind:value={client.zip} />
    </div>
  </div>

  <!-- Button -->
  <div class="field col-span-3">
    <Button
      label="Delete"
      onClick={() => {}}
      isAnimated={false}
      style="textOnlyDestructive"
      iconLeft={Trash}
    />
  </div>
  <div class="field col-span-3 flex justify-end gap-x-5">
    <Button
      label="Cancel"
      style="secondary"
      isAnimated={false}
      onClick={() => {
        closePanel();
      }}
    />

    <button
      class="button bg-lavenderIndigo text-white gap-x-2 translate-y-0 transition-all shadow-colored hover:shadow-coloredHover hover:-translate-y-2"
      type="submit"
    >
      <Check />
      Save
    </button>
  </div>
</form>
