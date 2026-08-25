const STORAGE_KEY = 'wedding_guest_slug';
const CHANGE_EVENT = 'wedding:guest-slug-changed';

// Remembers which personalised RSVP link a guest arrived on, so nav links
// elsewhere on the site can route back to it instead of the generic /rsvp
// (which just prompts them to find their link again).
export function getStoredGuestSlug() {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function setStoredGuestSlug(slug) {
  if (!slug) return;
  try {
    localStorage.setItem(STORAGE_KEY, slug);
  } catch {
    // Private browsing / storage disabled — fall back to no persistence.
  }
  // Notify listeners (e.g. the nav bar) immediately — a guest landing on
  // their personal link and clicking RSVP right away shouldn't have to
  // navigate elsewhere first for it to pick up the stored slug.
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: slug }));
}

// Subscribes to slug changes made via setStoredGuestSlug (including ones
// made from a different component in the same page). Returns an unsubscribe
// function, ready to hand straight to a useEffect cleanup.
export function subscribeGuestSlug(callback) {
  const handler = () => callback(getStoredGuestSlug());
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}
