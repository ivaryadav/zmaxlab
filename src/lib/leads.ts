// Every lead form on the site submits through here.
// Formspree emails the submission ("New Inquiry"); attribution travels as hidden fields;
// the conversion fires only after Formspree confirms (res.ok), exactly once per submission.

import { getAttribution } from './attribution'
import { newEventId, trackLead } from './analytics'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

export type LeadFields = Record<string, string | undefined>

export type SubmitResult = { ok: true; eventId: string } | { ok: false; error: string }

const inFlight = new Set<string>()

/**
 * @param formId  stable id for the form (e.g. "hero_intake")
 * @param fields  visible fields; `email` / `phone` are also used (hashed) for enhanced conversions
 */
export async function submitLead(formId: string, fields: LeadFields): Promise<SubmitResult> {
  if (!FORMSPREE_ID) return { ok: false, error: 'Form is not configured.' }
  // A second submit while the first is still in flight is ignored (double click, Enter + click).
  if (inFlight.has(formId)) return { ok: false, error: 'Already sending.' }
  inFlight.add(formId)

  const eventId = newEventId()
  const a = getAttribution()
  const body = {
    _subject: 'New Inquiry',
    form: formId,
    ...Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== undefined && v !== '')),
    page: window.location.pathname,
    // hidden attribution fields
    utm_source: a.utm_source ?? '', utm_medium: a.utm_medium ?? '', utm_campaign: a.utm_campaign ?? '',
    utm_term: a.utm_term ?? '', utm_content: a.utm_content ?? '',
    gclid: a.gclid ?? '', fbclid: a.fbclid ?? '',
    landing_page: a.landing_page ?? '', referrer: a.referrer ?? '',
    event_id: eventId,
  }

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) return { ok: false, error: 'That did not go through. Try again in a moment.' }
    void trackLead({ eventId, formId, email: fields.email, phone: fields.phone, specialty: fields.specialty })
    return { ok: true, eventId }
  } catch {
    return { ok: false, error: 'No connection. Check your internet and try again.' }
  } finally {
    inFlight.delete(formId)
  }
}
