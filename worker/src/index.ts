import { ContactEnv, handleContact } from './contact';
import { InstagramEnv, refreshInstagramTokens } from './refreshInstagram';
import { SanityEnv } from './sanityClient';

interface RateLimitOutcome {
  success: boolean;
}

type RateLimiter = { limit: (options: { key: string }) => Promise<RateLimitOutcome> };

interface Env extends ContactEnv, InstagramEnv, SanityEnv {
  ALLOWED_ORIGIN: string;
  CONTACT_RATE_LIMITER: RateLimiter;
  CRON_SECRET: string;
  ALERT_TO_EMAIL: string;
}

function corsHeaders(env: Env): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(data: unknown, status: number, env: Env): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(env) },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env) });
    }

    const url = new URL(request.url);
    const segments = url.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';

    if (request.method === 'POST' && segments.length === 1 && segments[0] === 'contact') {
      const { success: withinLimit } = await env.CONTACT_RATE_LIMITER.limit({ key: clientIp });
      if (!withinLimit) {
        return json(
          { success: false, message: 'Too many requests. Please try again shortly.' },
          429,
          env
        );
      }
      const result = await handleContact(request, env);
      return json(result.body, result.status, env);
    }

    // Manual trigger for testing the Instagram refresh outside the cron schedule.
    if (segments.length === 1 && segments[0] === 'refresh-instagram') {
      const authHeader = request.headers.get('authorization');
      const querySecret = url.searchParams.get('secret');
      const isAuthorized =
        authHeader === `Bearer ${env.CRON_SECRET}` || querySecret === env.CRON_SECRET;
      if (!isAuthorized) {
        return json({ success: false, message: 'Unauthorized' }, 401, env);
      }
      const result = await refreshInstagramTokens(env);
      return json(result, result.success ? 200 : 500, env);
    }

    return json({ success: false, message: 'Not found' }, 404, env);
  },

  async scheduled(_event: ScheduledEvent, env: Env): Promise<void> {
    const result = await refreshInstagramTokens(env);
    if (!result.success) {
      console.error('[refreshInstagram] cron run failed:', result.message);
      await sendAlert(env, 'Instagram token refresh could not run', result.message);
      return;
    }
    console.log('[refreshInstagram] cron run complete:', JSON.stringify(result.results));
    const failures = result.results.filter((r) => r.status === 'failed');
    if (failures.length) {
      await sendAlert(
        env,
        'Instagram token refresh failed',
        `These accounts failed to refresh. If the token has expired, generate a new one and paste it into Sanity > Instagram Settings.\n\n${JSON.stringify(failures, null, 2)}`
      );
    }
  },
};

async function sendAlert(env: Env, subject: string, text: string): Promise<void> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: env.ALERT_TO_EMAIL,
        subject: `[Three Hares] ${subject}`,
        text,
      }),
    });
    if (!res.ok) console.error('[alert] Resend failed', res.status, await res.text().catch(() => ''));
  } catch (err) {
    console.error('[alert] send error', err);
  }
}
