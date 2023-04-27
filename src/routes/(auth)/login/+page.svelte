<script lang="ts">
  let email: string,
    password: string,
    aliertMessage = '';
  import Alert from '$lib/components/Alert.svelte';
</script>

<h1 class="auth-heading">Login</h1>

<form>
  <Alert message={aliertMessage} />
  <div class="field">
    <label for="email" class="text-goldenFizz">Email Address</label>
    <input type="text" name="email" id="email" placeholder="Your email" bind:value={email} />
  </div>
  <div class="field">
    <div class="flex justify-between">
      <label for="password" class="text-goldenFizz">Password</label>
      <a href="/forgot-password" class="text-sm text-white underline hover:no-underline"
        >Forgot password ?</a
      >
    </div>
    <input type="password" placeholder="Your password" bind:value={password} />
  </div>
  <div class="field">
    <button type="submit" class="sign-button">Let's do that ! </button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/signup" class="underline hover:no-underline">Don't have a account yet ?</a>
    </p>
  </div>
</form>
