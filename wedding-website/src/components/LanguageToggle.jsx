import { useLanguage } from '../i18n/useLanguage';

const OPTIONS = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ast', label: 'AST' },
];

export default function LanguageToggle({ className = '' }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center border border-wedding-accent/30 rounded-full p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {OPTIONS.map(({ code, label }) => {
        const active = language === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={active}
            className={`font-sans rounded-full px-2.5 py-1 transition-colors ${
              active
                ? 'bg-wedding-accent text-wedding-bg'
                : 'text-wedding-muted hover:text-wedding-text'
            }`}
            style={{ fontSize: '0.625rem', letterSpacing: '0.08em', fontWeight: active ? 600 : 400 }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
