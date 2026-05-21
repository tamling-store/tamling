import React, { useState, useEffect } from 'react';

const Header = ({ currentLang, setLang, t }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="nav-wrapper">
          <a href="#hero" className="logo">
            Tam<span className="logo-accent">Ling</span>
          </a>

          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li>
              <a href="#origin" className="nav-link" onClick={handleNavLinkClick}>
                {t.nav.origin}
              </a>
            </li>
            <li>
              <a href="#products" className="nav-link" onClick={handleNavLinkClick}>
                {t.nav.products}
              </a>
            </li>
            <li>
              <a href="#brewing" className="nav-link" onClick={handleNavLinkClick}>
                {t.nav.brewing}
              </a>
            </li>
            <li>
              <a href="#benefits" className="nav-link" onClick={handleNavLinkClick}>
                {t.nav.benefits}
              </a>
            </li>
            <li>
              <a href="#warnings" className="nav-link" onClick={handleNavLinkClick}>
                {t.nav.warnings}
              </a>
            </li>
            <li>
              <a href="#experience" className="nav-link" onClick={handleNavLinkClick}>
                {t.nav.experience}
              </a>
            </li>
          </ul>

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
