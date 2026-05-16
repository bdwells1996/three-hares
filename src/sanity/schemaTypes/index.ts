import { type SchemaTypeDefinition } from 'sanity'
import { faqItem } from './faqItem'
import { teamMember } from './teamMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [faqItem, teamMember],
}
