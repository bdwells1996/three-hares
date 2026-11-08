import { sanityMutate, sanityQuery, SanityEnv } from './sanityClient';

export interface InstagramEnv extends SanityEnv {
  INSTAGRAM_ACCESS_TOKEN_SHOP?: string;
  INSTAGRAM_ACCESS_TOKEN_NIKKI?: string;
  INSTAGRAM_ACCESS_TOKEN_PETE?: string;
}

interface InstagramAccount {
  _key?: string;
  name: string;
  accessToken: string;
  lastRefreshed?: string;
}

interface InstagramSettingsDoc {
  _id: string;
  _type: string;
  accounts?: InstagramAccount[];
}

interface RefreshSuccess {
  account: string;
  status: 'refreshed';
  expiresInDays: number;
  lastRefreshed: string;
}

interface RefreshFailure {
  account: string;
  status: 'failed';
  error: unknown;
}

export async function refreshInstagramTokens(
  env: InstagramEnv
): Promise<{ success: true; timestamp: string; results: (RefreshSuccess | RefreshFailure)[] } | { success: false; message: string }> {
  const existing = await sanityQuery<InstagramSettingsDoc | null>(
    env,
    `*[_type == "instagramSettings" && _id == "instagramSettings"][0]`
  );

  let accounts: InstagramAccount[] = existing?.accounts ?? [];

  if (!accounts.length) {
    const envAccounts: InstagramAccount[] = [];
    if (env.INSTAGRAM_ACCESS_TOKEN_SHOP) {
      envAccounts.push({ _key: 'shop', name: 'Shop', accessToken: env.INSTAGRAM_ACCESS_TOKEN_SHOP });
    }
    if (env.INSTAGRAM_ACCESS_TOKEN_NIKKI) {
      envAccounts.push({ _key: 'nikki', name: 'Nikki', accessToken: env.INSTAGRAM_ACCESS_TOKEN_NIKKI });
    }
    if (env.INSTAGRAM_ACCESS_TOKEN_PETE) {
      envAccounts.push({ _key: 'pete', name: 'Pete', accessToken: env.INSTAGRAM_ACCESS_TOKEN_PETE });
    }
    accounts = envAccounts;
  }

  if (!accounts.length) {
    return { success: false, message: 'No Instagram accounts found to refresh in Sanity or environment variables.' };
  }

  const results: (RefreshSuccess | RefreshFailure)[] = [];
  const updatedAccounts: InstagramAccount[] = [];

  for (const account of accounts) {
    try {
      const res = await fetch(
        `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(account.accessToken)}`
      );

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        results.push({ account: account.name, status: 'failed', error: errorBody });
        updatedAccounts.push(account);
        continue;
      }

      const data = (await res.json()) as { access_token: string; expires_in: number };
      const now = new Date().toISOString();

      updatedAccounts.push({ ...account, accessToken: data.access_token, lastRefreshed: now });
      results.push({
        account: account.name,
        status: 'refreshed',
        expiresInDays: Math.round(data.expires_in / 86400),
        lastRefreshed: now,
      });
    } catch (err) {
      results.push({
        account: account.name,
        status: 'failed',
        error: err instanceof Error ? err.message : String(err),
      });
      updatedAccounts.push(account);
    }
  }

  await sanityMutate(env, [
    {
      createOrReplace: {
        _id: 'instagramSettings',
        _type: 'instagramSettings',
        adminNotice:
          'AUTOMATED TOKEN MANAGEMENT ACTIVE: Instagram tokens are refreshed automatically by a Cloudflare Worker Cron Trigger. Do NOT change, replace, or delete these tokens manually, as doing so will break the refresh cycle and disconnect the Instagram feed.',
        accounts: updatedAccounts,
      },
    },
  ]);

  return { success: true, timestamp: new Date().toISOString(), results };
}
