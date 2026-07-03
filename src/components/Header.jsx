import React, { useState, useEffect } from 'react';

const Header = ({ currentLang, setLang, t }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleNavLinkClick = () => setMobileMenuOpen(false);

  return (
    <header className={scrolled ? 'scrolled' : ''} style={{ height: '80px', transition: 'var(--transition)' }}>
      <div className="container" style={{ height: '100%' }}>
        <div className="nav-wrapper" style={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Logo + Brand identity */}
          <a href="#hero" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
            <img
              src="/images/Thương hiệu/English/Tamling store logo.jpg"
              alt="Tamling Logo"
              style={{
                height: '52px',
                width: 'auto',
                borderRadius: '8px',
                objectFit: 'contain',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: '900',
                fontSize: '1.35rem',
                letterSpacing: '3px',
                color: 'var(--primary-dark)',
                textTransform: 'uppercase'
              }}>
                Tamling
              </span>
              <span style={{
                fontSize: '0.62rem',
                fontWeight: '700',
                letterSpacing: '2.5px',
                color: 'var(--accent-dark)',
                textTransform: 'uppercase'
              }}>
                Online Store
              </span>
            </div>
          </a>

          {/* Nav links */}
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li>
              <a href="#hero" className="nav-link" onClick={handleNavLinkClick}>
                {t.nav.home}
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link" onClick={handleNavLinkClick}>
                {t.nav.about}
              </a>
            </li>
            <li>
              <a href="#products" className="nav-link" onClick={handleNavLinkClick}>
                {t.nav.products}
              </a>
            </li>
          </ul>

          {/* Lang switch + mobile toggle */}
          <div className="nav-actions">
            <div className="lang-switch">
              <button
                className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button
                className={`lang-btn ${currentLang === 'vi' ? 'active' : ''}`}
                onClick={() => setLang('vi')}
              >
                VI
              </button>
            </div>

            <div className="menu-toggle" onClick={toggleMobileMenu}>
              <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none' }}></span>
              <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
              <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
