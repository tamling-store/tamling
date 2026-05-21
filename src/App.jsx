import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import BrewingGuide from './components/BrewingGuide';
import Warnings from './components/Warnings';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Translation files
import en from './locales/en';
import vi from './locales/vi';

function App() {
  // Default language is English (as requested: English primary)
  const [lang, setLang] = useState('en');
  const [translations, setTranslations] = useState(en);

  useEffect(() => {
    if (lang === 'vi') {
      setTranslations(vi);
      document.documentElement.lang = 'vi';
      document.title = 'Trà TamLing - Tinh Hoa Trà Rừng Cổ Thụ & Thảo Mộc';
    } else {
      setTranslations(en);
      document.documentElement.lang = 'en';
      document.title = 'TamLing Tea - Ancient Wild Teas & Longevity Herbs';
    }
  }, [lang]);

  return (
    <>
      <Header currentLang={lang} setLang={setLang} t={translations} />
      <main>
        <Hero t={translations} />
        <Products t={translations} />
        <BrewingGuide t={translations} />
        <Warnings t={translations} />
        <ContactForm t={translations} />
      </main>
      <Footer t={translations} />
    </>
  );
}

export default App;
