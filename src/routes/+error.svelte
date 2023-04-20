<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Error | The Dollar Holler</title>
</svelte:head>

<div class="h-screen w-screen text-center flex-co center overflow-hidden">
  <div>
    <h1
      class="text-[11.25rem] font-black min-h-[250px] min-w-[430px] bg-error bg-center bg-no-repeat text-daisyBush"
    >
      {$page.status}
    </h1>

    <div class="relative -top-12">
      <h2 class="mb-1 text-2xl font-black text-daisyBush">Sorry!</h2>
      <p class="text-daisyBush">{$page.error.message}</p>
    </div>
  </div>
</div>
