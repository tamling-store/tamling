import React from 'react';

const Footer = ({ t }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-wrapper">
          <div className="footer-logo">
            Tam<span className="logo-accent">Ling</span>
          </div>
          <div className="footer-copy">
            &copy; {currentYear} TamLing Tea. All rights reserved. Designed for premium tea experience.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
