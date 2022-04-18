<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import { loadComponent } from '$lib/load-component'
  import Component from '$lib/Component.svelte'

  let componentPromise: Promise<SvelteComponent>

  const setComponent = (name: string) => {
    componentPromise = loadComponent(name)
  }
</script>

<div class="toolbar">
  <button on:click={() => setComponent('A')}>Load A</button>
  <button on:click={() => setComponent('B')}>Load B</button>
  <button on:click={() => setComponent('App')}>Load App</button>
</div>

<main>
  {#await componentPromise}
    <div>Loading...</div>
  {:then cmp}
    <Component this={cmp} />
  {:catch err}
    <h1>Oops!</h1>
    <pre>{err}</pre>
  {/await}
</main>

<style>
  .toolbar {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: #eee;
  }
</style>
