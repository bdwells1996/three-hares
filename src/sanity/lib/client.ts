import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) {
    throw new Error('Missing SANITY_API_WRITE_TOKEN environment variable')
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  })
}

