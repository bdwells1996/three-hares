import { type SchemaTypeDefinition } from 'sanity'
import { faqItem } from './faqItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [faqItem],
}
