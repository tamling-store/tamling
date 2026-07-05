import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Footer from './components/Footer';

// Translation files
import en from './locales/en';
import vi from './locales/vi';

function App() {
  const [lang, setLang] = useState('en');
  const [translations, setTranslations] = useState(en);

  useEffect(() => {
    if (lang === 'vi') {
      setTranslations(vi);
      document.documentElement.lang = 'vi';
      document.title = 'Tamling — Organic Teas & Herbs';
    } else {
      setTranslations(en);
      document.documentElement.lang = 'en';
      document.title = 'Tamling — Organic Teas & Herbs';
    }
  }, [lang]);

  return (
    <>
      <Header currentLang={lang} setLang={setLang} t={translations} />

      <main>
        <Hero t={translations} currentLang={lang} />
        <About t={translations} currentLang={lang} />
        <Products t={translations} currentLang={lang} />
      </main>

      <Footer t={translations} />

      {/* Floating Contact Buttons */}
      <div
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* Zalo */}
        <a
          href="https://zalo.me/0981498668"
          target="_blank"
          rel="noopener noreferrer"
          title={translations.connect.zalo}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#0068ff',
            color: '#fff',
            fontSize: '1.4rem',
            fontWeight: '800',
            boxShadow: '0 4px 15px rgba(0, 104, 255, 0.4)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 104, 255, 0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 104, 255, 0.4)';
          }}
        >
          Z
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/Tamling.organic.store"
          target="_blank"
          rel="noopener noreferrer"
          title={translations.connect.messenger}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#1877f2',
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: '800',
            boxShadow: '0 4px 15px rgba(24, 119, 242, 0.4)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(24, 119, 242, 0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(24, 119, 242, 0.4)';
          }}
        >
          F
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/84981498668"
          target="_blank"
          rel="noopener noreferrer"
          title={translations.connect.whatsapp}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#25d366',
            color: '#fff',
            fontSize: '1.5rem',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            textDecoration: 'none'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
          }}
        >
          💬
        </a>
      </div>
    </>
  );
}

export default App;
