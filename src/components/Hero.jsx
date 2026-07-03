import React from 'react';

const Hero = ({ t, currentLang }) => {
  return (
    <section id="hero" className="hero" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.08) 0%, rgba(30, 63, 32, 0.02) 80%), var(--bg-main)' }}>
      <div className="container">
        <div className="grid-2" style={{ gap: '60px', alignItems: 'center' }}>

          <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '3.6rem',
                fontWeight: '900',
                letterSpacing: '6px',
                color: 'var(--primary-dark)',
                lineHeight: '1',
                textTransform: 'uppercase'
              }}>
                {t.hero.title}
              </div>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                letterSpacing: '4px',
                color: 'var(--accent-dark)',
                textTransform: 'uppercase',
                marginTop: '6px'
              }}>
                {t.hero.storeLabel}
              </div>
            </div>
            <h1 className="hero-title" style={{ fontSize: '1.6rem', lineHeight: '1.3', color: 'var(--text-muted)', margin: 0, fontWeight: '400' }}>
              {t.hero.subtitle}
            </h1>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#products" className="btn btn-primary">
                {t.hero.cta}
              </a>
              <a href="#about" className="btn btn-secondary">
                {t.hero.learnMore}
              </a>
            </div>
          </div>

          {/* Right: logo image */}
          <div className="hero-image-container" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div className="hero-circle-bg" style={{ borderStyle: 'solid', borderColor: 'rgba(197, 160, 89, 0.15)' }}></div>
            <img
              src="/images/Thương hiệu/English/Tamling store logo.jpg"
              alt="Tamling — Organic Teas & Herbs"
              className="hero-img"
              style={{
                zIndex: 2,
                borderRadius: '24px',
                boxShadow: 'var(--shadow-lg)',
                maxWidth: '85%',
                height: 'auto',
                border: '1px solid var(--border)'
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
