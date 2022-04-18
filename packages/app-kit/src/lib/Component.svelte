<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import { onMount } from 'svelte'

  let Component: SvelteComponent
  export { Component as this }

  let target: HTMLElement

  onMount(() => {
    const cmp = new (Component as any)({ target })
    return () => {
      cmp.$destroy()
    }
  })
</script>

<div bind:this={target} />
