import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';
import { getStoredGuestSlug, subscribeGuestSlug } from '../utils/guestSlug';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const { t, language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  // Subscribes to the guest slug being stored, however/whenever that
  // happens — including on the very first page a guest lands on — rather
  // than waiting for the next navigation to notice it.
  const [guestSlug, setGuestSlug] = useState(getStoredGuestSlug);
  useEffect(() => subscribeGuestSlug(setGuestSlug), []);

  const NAV_LINKS = [
    { to: '/location',      label: t.nav.location },
    { to: '/accommodation', label: t.nav.accommodation },
    // The Asturias page isn't part of the Asturian site — see Asturias.jsx.
    ...(language === 'ast' ? [] : [{ to: '/asturias', label: t.nav.asturias }]),
    { to: '/dress-code',    label: t.nav.dressCode },
    { to: '/gifts',         label: t.nav.gifts },
    { to: '/faqs',          label: t.nav.faqs },
    { to: guestSlug ? `/rsvp/${guestSlug}` : '/rsvp', label: t.nav.rsvp },
  ];

  const linkClass = ({ isActive }) =>
    `font-sans transition-colors ${
      isActive ? 'text-wedding-bg' : 'text-wedding-bg/70 hover:text-wedding-bg'
    }`;
  const textShadow = { textShadow: '0 1px 4px rgba(0,0,0,0.5)' };

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="font-heading text-wedding-bg text-2xl leading-none"
          style={textShadow}
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
                  style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', ...textShadow }}
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
            className="block w-5 h-px bg-wedding-bg origin-center transition-transform duration-200"
            style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
          />
          <span
            className="block w-5 h-px bg-wedding-bg transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1, boxShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
          />
          <span
            className="block w-5 h-px bg-wedding-bg origin-center transition-transform duration-200"
            style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-5"
          style={{ background: '#14180f' }}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
              style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', ...textShadow }}
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
