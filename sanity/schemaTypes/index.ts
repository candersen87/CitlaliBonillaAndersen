import { type SchemaTypeDefinition } from 'sanity'
import { painting } from './painting'
import { about } from './about'
import { contactSubmission } from './contactSubmission'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [painting, about, contactSubmission],
}
