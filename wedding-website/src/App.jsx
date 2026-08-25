import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LanguageProvider } from './i18n/LanguageContext';
import PasswordGate from './components/PasswordGate';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import Location from './pages/Location';
import Accommodation from './pages/Accommodation';
import Asturias from './pages/Asturias';
import FAQs from './pages/FAQs';
import Rsvp from './pages/Rsvp';

export default function App() {
  return (
    <LanguageProvider>
    <PasswordGate>
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"              element={<Hero />} />
          <Route path="/location"      element={<Location />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/asturias"      element={<Asturias />} />
          <Route path="/faqs"          element={<FAQs />} />
          <Route path="/rsvp"          element={<Rsvp />} />
          <Route path="/rsvp/:slug"    element={<Rsvp />} />
          {/* Personalised invite links: land on the homepage, remembering the
              slug so the RSVP nav link is already theirs when they click through. */}
          <Route path="/:slug"         element={<Hero />} />
        </Routes>
      </main>
    </BrowserRouter>
    </PasswordGate>
    </LanguageProvider>
  );
}
