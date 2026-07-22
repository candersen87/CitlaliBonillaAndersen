import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Using CDN in production for speed, but disabling it in development 
  // to ensure design matches the latest data structure.
  useCdn: process.env.NODE_ENV === 'production',
})
