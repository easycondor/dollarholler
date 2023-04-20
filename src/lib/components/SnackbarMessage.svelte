<script lang="ts">
  import { snackbar } from '$lib/stores/SnackbarStore';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  export let message: string = '';

  //SORTE DE TIMER AVEC SVELTE MOTION
  //var progress 100% en 3 sec
  let progress = tweened(100, { duration: 3000 });

  //lorsque element est monté il attent 3s pour arrivé a 0
  onMount(async () => {
    await progress.set(0);
    snackbar.remove();
  });
</script>

<div class="whitespace-nowrap">
  {message}
</div>
