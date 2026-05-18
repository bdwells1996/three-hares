import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: 'rp373id5',
  dataset: 'production',
  schema,
  plugins: [
    structureTool({structure}),
  ],
})
