<script>
  let items = ['hello', 'bonjour', 'Bopn dias'];
</script>

<h1 class="text-orange-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<ul class="list-none">
  {#each items as item}
    <!-- content here -->
    <li>{item}</li>
  {/each}
</ul>
