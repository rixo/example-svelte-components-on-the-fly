import * as path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'
import { build, resolveConfig } from 'vite'
import del from 'del'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT = path.resolve(__dirname, '..')
const COMPONENTS_ROOT = path.resolve(ROOT, 'src')

// change working directory to project root, to respect
// expectations of default Vite config
export const setupCwd = () => {
  process.chdir(ROOT)
}

export const buildComponent = async componentName => {
  const componentFilename = componentName + '.svelte'
  const destFilename = 'index.js'
  const outputDir = path.resolve(ROOT, 'build', componentName)

  await del(outputDir)

  await build({
    build: {
      lib: {
        entry: path.resolve(COMPONENTS_ROOT, componentFilename),
        formats: ['es'],
        fileName: () => destFilename,
      },
      rollupOptions: {
        output: {
          dir: outputDir,
        },
      },
    },
  })

  return path.resolve(outputDir, destFilename)
}
