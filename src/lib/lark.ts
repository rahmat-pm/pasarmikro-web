import { env } from 'cloudflare:workers';
import { larkPayload, larkSign, type LarkMessage } from './lark-message';

/**
 * Posts a form submission to the team's Lark group (incoming webhook bot).
 * Lark is the only place submissions go, so this returns false on any failure and the
 * form then asks the visitor to try again or email us, instead of losing the message.
 */
export async function sendToLark(message: LarkMessage): Promise<boolean> {
  const url = env.LARK_WEBHOOK_URL;
  if (!url) {
    if (import.meta.env.DEV) {
      console.info('[lark] LARK_WEBHOOK_URL is empty; message not sent:\n' + JSON.stringify(message, null, 2));
      return true;
    }
    console.error('[lark] LARK_WEBHOOK_URL is not set');
    return false;
  }

  const body: Record<string, unknown> = larkPayload(message);
  if (env.LARK_WEBHOOK_SECRET) {
    const timestamp = String(Math.floor(Date.now() / 1000));
    Object.assign(body, { timestamp, sign: await larkSign(timestamp, env.LARK_WEBHOOK_SECRET) });
  }

  try {
    const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const data = (await res.json().catch(() => ({}))) as { code?: number; StatusCode?: number; msg?: string };
    // Lark answers 200 even for rejected messages; success is code 0 (older bots: StatusCode 0).
    if (res.ok && (data.code === 0 || data.StatusCode === 0)) return true;
    console.error('[lark] rejected', res.status, data);
    return false;
  } catch (err) {
    console.error('[lark] request failed', err);
    return false;
  }
}
