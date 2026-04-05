'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/allybruglii/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: 'tvtp5ubl',
  dataset: 'production',
  plugins: [structureTool({structure}), visionTool({defaultApiVersion: apiVersion})],
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: schema.types,
  },
})
