import { z } from 'zod';
import { locales, t, type Locale } from '../i18n';
import type { LarkMessage } from './lark-message';

const text = (max: number) => z.string().trim().max(max);
const optional = (max: number) =>
  text(max)
    .optional()
    .transform((v) => v || null);

/** Contact page and EUDR program form. Both land in `contact_submissions`. */
export const contactSchema = z.discriminatedUnion('source', [
  z.object({
    source: z.literal('contact'),
    locale: z.enum(locales as [Locale, ...Locale[]]),
    name: text(120).min(1),
    email: z.email().max(200),
    company: optional(200),
    phone: optional(50),
    message: text(5000).min(1),
  }),
  z.object({
    source: z.literal('eudr'),
    locale: z.enum(locales as [Locale, ...Locale[]]),
    name: text(120).min(1),
    email: z.email().max(200),
    company: text(200).min(1),
    phone: optional(50),
    commodity: z.enum(['coffee', 'cocoa', 'both']),
    role: z.enum(['exporter', 'cooperative', 'processor', 'eu-buyer']),
  }),
]);

export type ContactInput = z.infer<typeof contactSchema>;

/** Row for `contact_submissions`; EUDR answers are kept readable in the message column. */
export function toSubmission(input: ContactInput) {
  const message =
    input.source === 'eudr' ? `EUDR program sign-up. Commodity: ${input.commodity}. Role: ${input.role}.` : input.message;
  return {
    source: input.source,
    locale: input.locale,
    name: input.name,
    email: input.email,
    company: input.company,
    phone: input.phone,
    message,
  };
}

export type Submission = ReturnType<typeof toSubmission>;

/** Lark message for a new contact or EUDR submission. */
export function submissionMessage(sub: Submission): LarkMessage {
  const kind = sub.source === 'eudr' ? 'EUDR program sign-up' : 'Contact message';
  return {
    title: `${kind}: ${sub.name}${sub.company ? `, ${sub.company}` : ''}`,
    rows: [
      { label: 'Name', text: sub.name },
      { label: 'Email', text: sub.email, href: `mailto:${sub.email}` },
      ...(sub.company ? [{ label: 'Company', text: sub.company }] : []),
      ...(sub.phone ? [{ label: 'Phone', text: sub.phone }] : []),
      { label: 'Language', text: t(sub.locale).langName },
      { label: 'Message', text: sub.message },
    ],
  };
}

/** Job application form (/career/<slug>/). Lark cannot receive files, so applicants share a link to their CV. */
export const applySchema = z.object({
  roleSlug: text(120).min(1),
  locale: z.enum(locales as [Locale, ...Locale[]]),
  name: text(120).min(1),
  email: z.email().max(200),
  phone: optional(50),
  cvUrl: z.url({ protocol: /^https$/ }).max(500),
  linkedinUrl: optional(300).refine((v) => v === null || /^https:\/\//.test(v), 'https link'),
  message: optional(5000),
});

export function applicationMessage(app: z.infer<typeof applySchema>, roleTitle: string): LarkMessage {
  return {
    title: `Job application: ${app.name} for ${roleTitle}`,
    rows: [
      { label: 'Role', text: roleTitle },
      { label: 'Name', text: app.name },
      { label: 'Email', text: app.email, href: `mailto:${app.email}` },
      ...(app.phone ? [{ label: 'Phone', text: app.phone }] : []),
      { label: 'CV', text: app.cvUrl, href: app.cvUrl },
      ...(app.linkedinUrl ? [{ label: 'LinkedIn', text: app.linkedinUrl, href: app.linkedinUrl }] : []),
      { label: 'Cover note', text: app.message ?? '(none)' },
    ],
  };
}

/** Only same-site paths are allowed as the redirect target after a no-JS submit. */
export function safeReturnPath(value: FormDataEntryValue | null): string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/';
}
