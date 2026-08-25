const STORAGE_KEY = 'wedding_guest_slug';

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
}
