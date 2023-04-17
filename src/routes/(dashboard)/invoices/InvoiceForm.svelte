<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/icons/Trash.svelte';
  import LineItemRows from './LineItemRows.svelte';

  const blankLineItem = [
    {
      id: '1',
      description: 'tada',
      quantity: 0,
      amount: '0'
    }
  ];
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add an Invoice</h2>

<form class="grid grid-cols-6 gap-x-5">
  <!-- Client -->
  <div class="field col-span-2">
    <label for="client">Client</label>
    <select name="client" id="client">
      <option value="zeal">ZEAL</option>
    </select>
  </div>
  <div class="field col-span-2 flex items-end gap-x-5">
    <div class="text-base font-bold text-monsoon leading-[-3.5rem]">or</div>
    <Button label="+Client" onClick={() => {}} style="outline" isAnimated={false} />
  </div>
  <!-- invoice id -->
  <div class="field col-span-2">
    <label for="id">Invoice Is</label>
    <input type="number" name="id" />
  </div>
  <!-- due date -->
  <div class="filed col-span-2">
    <label for="dueDate">Due Date</label>
    <input type="date" name="dueDate" />
  </div>
  <!-- issue date -->
  <div class="field col-span-2 col-start-5">
    <label for="issueDate">Issue Date</label>
    <input type="date" name="issueDate" />
  </div>
  <!-- subject -->
  <div class="field col-span-6">
    <label for="subject">Subject</label>
    <input type="text" name="subject" />
  </div>

  <!-- line items -->
  <div class="field col-span-6">
    <LineItemRows lineItems={blankLineItem} />
  </div>

  <!-- notes -->
  <div class="field col-span-6">
    <label for="notes"
      >Notes <span class="font-normal">(optional, displayer on invoice)</span></label
    >
    <textarea name="notes" id="notes" />
  </div>
  <!-- terms -->
  <div class="field col-span-6">
    <label for="terms"
      >Terms <span class="font-normal">(optional, enter your terms and conditons)</span></label
    >
    <textarea name="terms" id="terms" />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
    </div>
  </div>
  <!-- button -->
  <div class="field col-span-2">
    <!-- only be visible if editing -->
    <Button
      label="Delete"
      style="textOnlyDestructive"
      isAnimated={false}
      onClick={() => {}}
      iconLeft={Trash}
    >
      Delete
    </Button>
  </div>
  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button label="Cancel" style="secondary" isAnimated={false} onClick={() => {}} />
    <Button label="Save" onClick={() => {}} />
  </div>
</form>
