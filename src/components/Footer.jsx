import React from 'react';

const Footer = ({ t }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--primary-dark)', padding: '60px 0 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', textAlign: 'center' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/images/Thương hiệu/English/Tamling store logo.jpg"
              alt="Tamling Logo"
              style={{
                height: '70px',
                width: 'auto',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'var(--shadow-md)'
              }}
            />
          </div>

          {/* Connect description & direct portals */}
          <div style={{ maxWidth: '500px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', fontSize: '1.25rem', marginBottom: '10px' }}>
              {t.connect.title}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(245, 247, 245, 0.65)', lineHeight: '1.5' }}>
              {t.connect.desc}
            </p>
          </div>

          {/* Social direct links */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Zalo */}
            <a 
              href="https://zalo.me/0981498668" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '25px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'var(--bg-main)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0068ff';
                e.currentTarget.style.borderColor = '#0068ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <span>🔵</span> {t.connect.zalo}
            </a>

            <a 
              href="https://www.facebook.com/Tamling.organic.store" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '25px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'var(--bg-main)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0084ff';
                e.currentTarget.style.borderColor = '#0084ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <span>💬</span> {t.connect.messenger}
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/84981498668" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '25px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'var(--bg-main)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#25d366';
                e.currentTarget.style.borderColor = '#25d366';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <span>🟢</span> {t.connect.whatsapp}
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/tamling.store/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '25px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'var(--bg-main)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e1306c';
                e.currentTarget.style.borderColor = '#e1306c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <span>📸</span> {t.connect.instagram}
            </a>
          </div>

          <div style={{ borderTop: '1px solid rgba(245, 247, 245, 0.1)', width: '100%', paddingTop: '20px', fontSize: '0.8rem', color: 'rgba(245, 247, 245, 0.4)' }}>
            {t.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
