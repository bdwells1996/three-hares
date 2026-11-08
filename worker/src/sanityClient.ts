export interface SanityEnv {
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_API_VERSION: string;
  SANITY_API_WRITE_TOKEN: string;
}

export async function sanityQuery<T>(env: SanityEnv, query: string): Promise<T> {
  const url = `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v${env.SANITY_API_VERSION}/data/query/${env.SANITY_DATASET}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${env.SANITY_API_WRITE_TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`Sanity query failed: HTTP ${res.status} ${await res.text()}`);
  }
  const body = (await res.json()) as { result: T };
  return body.result;
}

export async function sanityMutate(env: SanityEnv, mutations: unknown[]): Promise<void> {
  const url = `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v${env.SANITY_API_VERSION}/data/mutate/${env.SANITY_DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.SANITY_API_WRITE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) {
    throw new Error(`Sanity mutate failed: HTTP ${res.status} ${await res.text()}`);
  }
}
