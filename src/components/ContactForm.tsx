import { useMemo, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { profile } from '../data/profile';
import type { Notify } from '../hooks/useToast';
import {
  MESSAGE_MAX,
  REASON_MAX,
  isConfigured,
  sendContactMessage,
  validate,
  type ContactPayload,
} from '../lib/contact';

type Field = keyof ContactPayload;
type Status = 'idle' | 'sending' | 'success' | 'error';

const FIELD_ORDER: Field[] = ['name', 'email', 'reason', 'message'];
const COOLDOWN_MS = 30_000;
const empty: ContactPayload = { name: '', email: '', reason: '', message: '' };

export function ContactForm({ notify }: { notify: Notify }) {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [botcheck, setBotcheck] = useState(false);
  const cooldownUntil = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  const errors = useMemo(() => validate(values), [values]);
  const showError = (f: Field) => (touched[f] ? errors[f] : undefined);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (status === 'error') setStatus('idle');
  };
  const onBlur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Honeypot filled → almost certainly a bot. Pretend it worked, send nothing.
    if (botcheck) {
      setStatus('success');
      return;
    }

    const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      setTouched({ name: true, email: true, reason: true, message: true });
      formRef.current?.querySelector<HTMLElement>(`#cf-${firstInvalid}`)?.focus();
      return;
    }

    if (!isConfigured) return; // button is disabled; guard for Enter-key submits

    if (Date.now() < cooldownUntil.current) {
      notify('Please wait a few seconds before sending another message.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');
    try {
      await sendContactMessage(values);
      cooldownUntil.current = Date.now() + COOLDOWN_MS;
      setStatus('success');
      notify('Message sent');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const sendAnother = () => {
    setValues((v) => ({ ...empty, name: v.name, email: v.email }));
    setTouched({});
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className="contact-form form-success" role="status">
        <div className="success-icon" aria-hidden="true">✓</div>
        <h3>Message sent</h3>
        <p>
          Thanks{values.name.trim() ? `, ${values.name.trim().split(' ')[0]}` : ''}! It's in my inbox and I'll get back to
          you soon.
        </p>
        <button type="button" className="btn btn-ghost" onClick={sendAnother}>
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate aria-label="Contact form">
      <div className="form-row">
        <FieldShell id="name" label="Name" error={showError('name')}>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            onBlur={onBlur('name')}
            aria-invalid={!!showError('name')}
            aria-describedby={showError('name') ? 'cf-name-err' : undefined}
            disabled={sending}
            placeholder="Jane Doe"
          />
        </FieldShell>
        <FieldShell id="email" label="Email" error={showError('email')}>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur('email')}
            aria-invalid={!!showError('email')}
            aria-describedby={showError('email') ? 'cf-email-err' : undefined}
            disabled={sending}
            placeholder="jane@company.com"
          />
        </FieldShell>
      </div>

      <FieldShell id="reason" label="Reason" error={showError('reason')}>
        <input
          id="cf-reason"
          name="reason"
          type="text"
          value={values.reason}
          onChange={onChange}
          onBlur={onBlur('reason')}
          aria-invalid={!!showError('reason')}
          aria-describedby={showError('reason') ? 'cf-reason-err' : undefined}
          disabled={sending}
          maxLength={REASON_MAX}
          placeholder="e.g. Backend engineer role at Acme"
        />
      </FieldShell>

      <FieldShell id="message" label="Message" error={showError('message')}>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          maxLength={MESSAGE_MAX}
          value={values.message}
          onChange={onChange}
          onBlur={onBlur('message')}
          aria-invalid={!!showError('message')}
          aria-describedby={showError('message') ? 'cf-message-err' : undefined}
          disabled={sending}
          placeholder="Hi Shalaka, I'd love to chat about…"
        />
      </FieldShell>

      {/* Honeypot: hidden from people, tempting to bots */}
      <label className="hp" aria-hidden="true">
        Leave this unchecked
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          checked={botcheck}
          onChange={(e) => setBotcheck(e.target.checked)}
        />
      </label>

      {status === 'error' && (
        <div className="form-alert" role="alert">
          <strong>Your message didn't send.</strong> {errorMsg} Your text is still here, so please try again in a
          moment, or{' '}
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            message me on LinkedIn
          </a>
          .
        </div>
      )}

      {!isConfigured && (
        <div className="form-alert" role="status">
          The contact form isn't set up yet. Please reach me on{' '}
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{' '}
          for now.
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={sending || !isConfigured}>
          {sending ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending…
            </>
          ) : (
            'Send message'
          )}
        </button>
        {isConfigured && <span className="form-note">Goes straight to my inbox. I usually reply within a few days.</span>}
      </div>
    </form>
  );
}

interface ShellProps {
  id: Field;
  label: string;
  error?: string;
  aside?: ReactNode;
  children: ReactNode;
}

function FieldShell({ id, label, error, aside, children }: ShellProps) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <div className="field-label">
        <label htmlFor={`cf-${id}`}>{label}</label>
        {aside}
      </div>
      {children}
      {error && (
        <p className="field-error" id={`cf-${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}
