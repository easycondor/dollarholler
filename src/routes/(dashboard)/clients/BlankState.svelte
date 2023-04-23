<script lang="ts">
  import BlankRow from '$lib/components/BlankRow.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
</script>

<div>
  <div class="-mt-8 md:-mt-6 lg:-mt-14">
    <h2
      class="pt-14 pl-24 md:pr-28 text-left md:text-right mb-10 bg-arrowLeftUp md:bg-arrowRightUp bg-no-repeat bg-left md:bg-right font-handwriting text-2xl md:text-4xl font-bold text-caribbeanGreen"
    >
      Add your Frist Invoice
    </h2>
  </div>
  <!-- invoice header -->
  <ClientRowHeader className="text-fog" />
  <!-- blank row -->
  <BlankRow />
  <BlankRow />
  <BlankRow />
</div>
