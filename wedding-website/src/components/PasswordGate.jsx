import { useState, useEffect } from 'react';

const AUTH_KEY = 'wedding_auth';

export default function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored === import.meta.env.VITE_SITE_PASSWORD) {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === import.meta.env.VITE_SITE_PASSWORD) {
      localStorage.setItem(AUTH_KEY, input);
      setAuthenticated(true);
    } else {
      setError(true);
      setInput('');
    }
  };

  if (checking) return null;
  if (authenticated) return children;

  return (
    <div className="min-h-screen bg-wedding-bg flex items-center justify-center px-6">
      <div className="w-full max-w-xs">

        <div className="text-center mb-10">
          <p
            className="font-sans text-wedding-accent mb-4"
            style={{ fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            Natalie & Adán · 28 Aug 2027
          </p>
          <h1
            className="font-display text-wedding-text leading-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 5rem)' }}
          >
            N & A
          </h1>
          <p
            className="font-serif italic text-wedding-muted mt-3"
            style={{ fontSize: '1rem', fontWeight: 300 }}
          >
            Valle de Bueida, Quirós
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="password"
            className="block font-sans text-wedding-muted mb-2"
            style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            className="w-full border border-wedding-accent/40 rounded-lg px-4 py-3 font-sans text-wedding-text bg-wedding-bg focus:outline-none focus:border-wedding-accent transition-colors"
            style={{ fontSize: '1rem' }}
            autoFocus
            autoComplete="current-password"
          />
          {error && (
            <p
              className="font-sans mt-2"
              style={{ fontSize: '0.8rem', color: '#b55252' }}
            >
              Not quite — try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full mt-4 bg-wedding-accent text-wedding-bg font-display py-3 rounded-lg hover:opacity-90 transition-opacity"
            style={{ fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Enter
          </button>
        </form>

      </div>
    </div>
  );
}
