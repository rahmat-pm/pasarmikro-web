import type { APIRoute } from 'astro';
import { contactSchema, safeReturnPath, submissionMessage, toSubmission } from '../../lib/forms';
import { sendToLark } from '../../lib/lark';
import { verifyTurnstile } from '../../lib/turnstile';

// Public form endpoint for /contact/ and the EUDR page. JS clients get JSON; plain form posts get a 303 back.
export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const form = await request.formData();
  const wantsJson = request.headers.get('accept')?.includes('application/json') ?? false;
  const back = safeReturnPath(form.get('return_to'));

  const respond = (status: number, error?: 'verification' | 'invalid' | 'server') => {
    if (wantsJson) return Response.json({ ok: !error, error }, { status });
    const url = new URL(back, request.url);
    url.searchParams.set(error ? 'error' : 'sent', error ?? '1');
    url.hash = 'contact-form';
    return redirect(url.pathname + url.search + url.hash, 303);
  };

  if (!(await verifyTurnstile(form.get('cf-turnstile-response'), clientAddress))) return respond(403, 'verification');

  const parsed = contactSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return respond(400, 'invalid');

  // Lark is the only copy of the message, so the visitor only sees "sent" once Lark has it.
  return (await sendToLark(submissionMessage(toSubmission(parsed.data)))) ? respond(200) : respond(502, 'server');
};
