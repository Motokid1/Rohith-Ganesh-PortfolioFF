'use client';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { contact, services } from '../data/content';
import { useClientReady } from './useClientReady';
export default function Inquiry() {
  const ready = useClientReady();
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get('website')) return;
    const values = Object.fromEntries(
      ['name', 'email', 'category', 'message', 'budget', 'timeline'].map(
        (k) => [k, String(f.get(k) || '').trim()],
      ),
    );
    if (!values.name || !values.email || values.message.length < 20) {
      setStatus(
        'Please enter your name, a valid email and a project description of at least 20 characters.',
      );
      return;
    }
    if (contact.endpoint) {
      setBusy(true);
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 12000);
        try {
          const r = await fetch(contact.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
            signal: controller.signal,
          });
          if (!r.ok) throw Error('failed');
          setStatus('Your inquiry was submitted to the configured service.');
          form.reset();
        } finally {
          clearTimeout(timer);
        }
      } catch {
        setStatus(
          'Submission failed or timed out. Please use the direct email link.',
        );
      } finally {
        setBusy(false);
      }
    } else {
      const body = `Project inquiry from ${values.name} (${values.email})\nService: ${values.category}\nBudget: ${values.budget || 'Not specified'}\nTimeline: ${values.timeline || 'Not specified'}\n\n${values.message}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent('Portfolio project inquiry')}&body=${encodeURIComponent(body)}`;
      setStatus(
        'An email draft has been requested in your email app. Review and send it there. If it did not open, use the direct email link.',
      );
    }
  }
  return (
    <form data-ready={ready} onSubmit={submit}>
      <h3>Tell me about your project.</h3>
      <label htmlFor="inquiry-name">Client name</label>
      <input
        id="inquiry-name"
        name="name"
        required
        maxLength={120}
        autoComplete="name"
      />
      <label htmlFor="inquiry-email">Email</label>
      <input
        id="inquiry-email"
        name="email"
        type="email"
        required
        maxLength={254}
        autoComplete="email"
      />
      <label htmlFor="inquiry-category">Service category</label>
      <select id="inquiry-category" name="category">
        <option>Help me scope the project</option>
        {services.map((s) => (
          <option key={s.name}>{s.name}</option>
        ))}
      </select>
      <label htmlFor="inquiry-message">Project description</label>
      <textarea
        id="inquiry-message"
        name="message"
        rows={5}
        required
        minLength={20}
        maxLength={5000}
      />
      <div className="inquiry-options">
        <div>
          <label htmlFor="inquiry-budget">Budget (optional)</label>
          <input
            id="inquiry-budget"
            name="budget"
            maxLength={100}
            placeholder="Your range and currency"
          />
        </div>
        <div>
          <label htmlFor="inquiry-timeline">Timeline (optional)</label>
          <input
            id="inquiry-timeline"
            name="timeline"
            maxLength={100}
            placeholder="Your preferred timing"
          />
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="button dark" type="submit" disabled={!ready || busy}>
        {busy
          ? 'Submitting…'
          : contact.endpoint
            ? 'Send inquiry'
            : 'Create email inquiry'}
        <ArrowUpRight size={18} />
      </button>
      <p className="micro">
        {contact.endpoint
          ? 'Sent to the configured contact provider.'
          : 'Opens a prefilled draft in your email app; you review and send it.'}
      </p>
      <p role="status">{status}</p>
    </form>
  );
}
