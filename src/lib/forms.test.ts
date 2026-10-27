import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { applicationMessage, applySchema, contactSchema, safeReturnPath, submissionMessage, toSubmission } from './forms';
import { larkPayload, larkSign } from './lark-message';

const base = { locale: 'en', name: 'Test Person', email: 'person@example.com' };

describe('contactSchema', () => {
  it('accepts a contact message and blanks empty optionals', () => {
    const r = contactSchema.parse({ ...base, source: 'contact', message: 'Hello', company: '', phone: '' });
    expect(r).toMatchObject({ company: null, phone: null });
  });

  it('accepts an EUDR sign-up and writes its answers into the message', () => {
    const r = contactSchema.parse({ ...base, source: 'eudr', company: 'Kopi Co', commodity: 'cocoa', role: 'exporter' });
    expect(toSubmission(r).message).toBe('EUDR program sign-up. Commodity: cocoa. Role: exporter.');
  });

  it.each([
    ['missing message', { ...base, source: 'contact' }],
    ['bad email', { ...base, source: 'contact', message: 'Hi', email: 'nope' }],
    ['EUDR without company', { ...base, source: 'eudr', commodity: 'coffee', role: 'exporter' }],
    ['unknown commodity', { ...base, source: 'eudr', company: 'X', commodity: 'tea', role: 'exporter' }],
    ['unknown source', { ...base, source: 'admin', message: 'Hi' }],
    ['unknown locale', { ...base, source: 'contact', message: 'Hi', locale: 'fr' }],
  ])('rejects %s', (_, input) => {
    expect(contactSchema.safeParse(input).success).toBe(false);
  });
});

describe('safeReturnPath', () => {
  it.each([
    ['/contact/', '/contact/'],
    ['/id/eudr/', '/id/eudr/'],
    ['//evil.com/', '/'],
    ['https://evil.com/', '/'],
    [null, '/'],
  ])('%s → %s', (input, out) => {
    expect(safeReturnPath(input)).toBe(out);
  });
});

// Every endpoint or page that accepts form posts must check Turnstile first.
describe('write handlers', () => {
  const files = (dir: string): string[] =>
    readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? files(join(dir, f)) : [join(dir, f)]));
  const writers = files('src/pages').filter((file) =>
    /export const (POST|PUT|PATCH|DELETE)\b|request\.method === 'POST'/.test(readFileSync(file, 'utf8')),
  );

  it('finds the known write handlers', () => {
    expect(writers.length).toBeGreaterThanOrEqual(2); // api/contact, api/apply
  });
  it.each(writers)('%s verifies Turnstile', (file) => {
    expect(readFileSync(file, 'utf8')).toContain('verifyTurnstile(');
  });
});

describe('submissionMessage', () => {
  it('lists the EUDR answers and keeps the title on one line', () => {
    const sub = toSubmission(contactSchema.parse({ ...base, source: 'eudr', name: 'Ani\r\nX', company: 'Kopi Co', commodity: 'coffee', role: 'exporter' }));
    const payload = larkPayload(submissionMessage(sub));
    const post = payload.content.post.en_us;
    expect(payload.msg_type).toBe('post');
    expect(post.title).toBe('EUDR program sign-up: Ani X, Kopi Co');
    expect(JSON.stringify(post.content)).toContain('Commodity: coffee. Role: exporter.');
    expect(post.content[1]).toEqual([{ tag: 'text', text: 'Email: ' }, { tag: 'a', text: 'person@example.com', href: 'mailto:person@example.com' }]);
  });
});

describe('applySchema and applicationMessage', () => {
  const ok = { roleSlug: 'field-officer', locale: 'id', name: 'Ani', email: 'ani@example.com', cvUrl: 'https://drive.google.com/file/d/abc/view' };
  it('accepts a minimal application', () => {
    expect(applySchema.parse({ ...ok, phone: '', linkedinUrl: '', message: '' })).toMatchObject({ phone: null, linkedinUrl: null, message: null });
  });
  it.each(['', 'ftp://x.com/cv.pdf', 'javascript:alert(1)', 'http://drive.google.com/x', 'not a link'])('rejects CV link %j', (cvUrl) => {
    expect(applySchema.safeParse({ ...ok, cvUrl }).success).toBe(false);
  });
  it('only accepts https LinkedIn links', () => {
    expect(applySchema.safeParse({ ...ok, linkedinUrl: 'javascript:alert(1)' }).success).toBe(false);
  });
  it('puts the CV link in the message as a link', () => {
    const post = larkPayload(applicationMessage(applySchema.parse(ok), 'Field Officer')).content.post.en_us;
    expect(post.title).toBe('Job application: Ani for Field Officer');
    expect(post.content).toContainEqual([{ tag: 'text', text: 'CV: ' }, { tag: 'a', text: ok.cvUrl, href: ok.cvUrl }]);
  });
});

describe('larkSign', () => {
  it('matches the HMAC-SHA256 signature Lark documents', async () => {
    // Reference value computed with Node crypto: hmac(key="1700000000\nsecret", "").
    const { createHmac } = await import('node:crypto');
    const expected = createHmac('sha256', '1700000000\nsecret').update('').digest('base64');
    expect(await larkSign('1700000000', 'secret')).toBe(expected);
  });
});
