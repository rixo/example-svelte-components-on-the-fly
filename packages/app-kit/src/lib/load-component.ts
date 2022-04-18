import type { SvelteComponent } from 'svelte'

const serverHost = import.meta.env.VITE_COMPONENT_SERVER

export const loadComponent = async (name: string): Promise<SvelteComponent> => {
  const componentUrl = `${serverHost}/components/${name}`
  const module = await import(componentUrl)
  return module.default
}
