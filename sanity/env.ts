export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-03'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined | null, errorMessage: string): T {
  // Hardening: Ensure the value is not undefined, null, or an empty string.
  // This prevents silent failures when environment variables are declared but empty.
  if (v === undefined || v === null || v === '') {
    throw new Error(errorMessage)
  }

  return v
}
