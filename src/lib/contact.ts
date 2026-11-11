export interface ContactPayload {
  name: string;
  email: string;
  reason: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 5000;
export const REASON_MAX = 120;

const ENDPOINT = 'https://api.web3forms.com/submit';
const TIMEOUT_MS = 15_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const accessKey = (import.meta.env.VITE_WEB3FORMS_KEY ?? '').trim();
export const isConfigured = accessKey.length > 0;

export function validate(p: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (!p.name.trim()) errors.name = 'Please enter your name.';
  if (!p.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(p.email.trim())) errors.email = 'That email address doesn’t look right.';
  if (!p.reason.trim()) errors.reason = 'Please tell me what this is about.';
  else if (p.reason.trim().length > REASON_MAX) errors.reason = `Please keep it under ${REASON_MAX} characters.`;
  const len = p.message.trim().length;
  if (len === 0) errors.message = 'Please write a message.';
  else if (len < MESSAGE_MIN) errors.message = `A little more detail please (at least ${MESSAGE_MIN} characters).`;
  else if (len > MESSAGE_MAX) errors.message = `Please keep it under ${MESSAGE_MAX} characters.`;
  return errors;
}

export const subjectFor = (p: ContactPayload) => `[Portfolio] ${p.reason.trim()} (from ${p.name.trim()})`;

/** Sends the message via Web3Forms. Resolves on success; throws an Error with a user-facing message otherwise. */
export async function sendContactMessage(p: ContactPayload): Promise<void> {
  if (!isConfigured) throw new Error('The contact form isn’t configured yet.');

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: subjectFor(p),
        from_name: 'Portfolio contact form',
        name: p.name.trim(),
        email: p.email.trim(), // Web3Forms uses this as Reply-To
        reason: p.reason.trim(),
        message: p.message.trim(),
        botcheck: false,
      }),
      signal: controller.signal,
    });

    let data: { success?: boolean; message?: string } = {};
    try {
      data = await res.json();
    } catch {
      /* non-JSON response */
    }
    if (!res.ok || !data.success) {
      throw new Error(data.message || `The server responded with ${res.status}.`);
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('The request timed out.');
    }
    if (err instanceof TypeError) {
      throw new Error('Couldn’t reach the server. Check your connection.');
    }
    throw err;
  } finally {
    window.clearTimeout(timer);
  }
}
