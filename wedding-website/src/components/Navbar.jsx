import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';
import { getStoredGuestSlug, subscribeGuestSlug } from '../utils/guestSlug';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  // Subscribes to the guest slug being stored, however/whenever that
  // happens — including on the very first page a guest lands on — rather
  // than waiting for the next navigation to notice it.
  const [guestSlug, setGuestSlug] = useState(getStoredGuestSlug);
  useEffect(() => subscribeGuestSlug(setGuestSlug), []);

  const NAV_LINKS = [
    { to: '/location',      label: t.nav.location },
    { to: '/accommodation', label: t.nav.accommodation },
    { to: '/asturias',      label: t.nav.asturias },
    { to: '/faqs',          label: t.nav.faqs },
    { to: guestSlug ? `/rsvp/${guestSlug}` : '/rsvp', label: t.nav.rsvp },
  ];

  const linkClass = ({ isActive }) =>
    `font-sans transition-colors ${
      isActive ? 'text-wedding-text' : 'text-wedding-muted hover:text-wedding-text'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-wedding-bg border-b border-wedding-accent/25">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="font-display text-wedding-text text-xl leading-none"
          onClick={() => setMenuOpen(false)}
        >
          N&A
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={linkClass}
                  style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={t.nav.toggleMenu}
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-px bg-wedding-text origin-center transition-transform duration-200"
            style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }}
          />
          <span
            className="block w-5 h-px bg-wedding-text transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-wedding-text origin-center transition-transform duration-200"
            style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-wedding-bg border-t border-wedding-accent/20 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
              style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <LanguageToggle className="mt-2" />
        </div>
      )}
    </nav>
  );
}
