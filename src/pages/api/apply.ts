import type { APIRoute } from 'astro';
import { getRole } from '../../lib/content';
import { applicationMessage, applySchema, safeReturnPath } from '../../lib/forms';
import { sendToLark } from '../../lib/lark';
import { verifyTurnstile } from '../../lib/turnstile';

type Failure = 'verification' | 'invalid' | 'cv' | 'closed' | 'server';

// Job application form on /career/<slug>/. Applicants share a link to their CV; it goes to Lark with the rest.
export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const form = await request.formData();
  const wantsJson = request.headers.get('accept')?.includes('application/json') ?? false;
  const back = safeReturnPath(form.get('return_to'));

  const respond = (status: number, error?: Failure) => {
    if (wantsJson) return Response.json({ ok: !error, error }, { status });
    const url = new URL(back, request.url);
    url.searchParams.set(error ? 'error' : 'sent', error ?? '1');
    url.hash = 'contact-form';
    return redirect(url.pathname + url.search + url.hash, 303);
  };

  if (!(await verifyTurnstile(form.get('cf-turnstile-response'), clientAddress))) return respond(403, 'verification');

  const parsed = applySchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    // A bad CV link gets its own message; everything else is "check the fields".
    return respond(400, parsed.error.issues.some((i) => i.path[0] === 'cvUrl') ? 'cv' : 'invalid');
  }
  const app = parsed.data;

  const role = await getRole(app.locale, app.roleSlug);
  if (!role?.open) return respond(409, 'closed');

  return (await sendToLark(applicationMessage(app, role.title))) ? respond(200) : respond(502, 'server');
};
