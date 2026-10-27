// Lark custom bot message format, kept free of Worker imports so it can be unit tested.

export interface LarkMessage {
  title: string;
  /** Each row is "Label: value"; a row with `href` becomes a link. */
  rows: { label?: string; text: string; href?: string }[];
}

// Values come from visitors: keep each on one line and bounded.
const clean = (s: string, max = 2000) => s.replace(/[\r\n]+/g, ' ').trim().slice(0, max);

/** A "post" (rich text) message: a title and one paragraph per row. */
export function larkPayload(message: LarkMessage) {
  const content = message.rows.map((row) => {
    const parts: Record<string, string>[] = [];
    if (row.label) parts.push({ tag: 'text', text: `${row.label}: ` });
    // Multi-line text (messages, cover notes) keeps its line breaks inside the paragraph.
    parts.push(row.href ? { tag: 'a', text: clean(row.text, 300), href: row.href } : { tag: 'text', text: row.text.trim().slice(0, 5000) });
    return parts;
  });
  return { msg_type: 'post', content: { post: { en_us: { title: clean(message.title, 200), content } } } };
}

/** Lark signature: base64(HMAC-SHA256 with key "timestamp\nsecret" over an empty message). */
export async function larkSign(timestamp: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(`${timestamp}\n${secret}`), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new Uint8Array());
  return btoa(String.fromCharCode(...new Uint8Array(mac)));
}
