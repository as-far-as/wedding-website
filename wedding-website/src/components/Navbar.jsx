import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/location',      label: 'Location' },
  { to: '/accommodation', label: 'Accommodation' },
  { to: '/transport',     label: 'Transport' },
  { to: '/asturias',      label: 'Asturias' },
  { to: '/faqs',          label: 'FAQs' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <ul className="hidden md:flex items-center gap-8">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
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
        </div>
      )}
    </nav>
  );
}
