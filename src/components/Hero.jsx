import React from 'react';

const Hero = ({ t }) => {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="grid-2">
          <div className="hero-content">
            <span className="hero-subtitle">{t.hero.title}</span>
            <h1 className="hero-title">{t.hero.subtitle}</h1>
            <p className="hero-desc">{t.hero.description}</p>
            <div className="hero-btns">
              <a href="#experience" className="btn btn-primary">
                {t.hero.cta}
              </a>
              <a href="#origin" className="btn btn-outline">
                {t.hero.learnMore}
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-circle-bg"></div>
            <img 
              src="/images/tea-culture.jpg" 
              alt="Vietnamese specialty Teas - TamLing Tea" 
              className="hero-img" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
