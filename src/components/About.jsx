import React, { useState } from 'react';

const About = ({ t, currentLang }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const imgSrc = currentLang === 'vi'
    ? '/images/Thương hiệu/Tiếng Việt/GIỚI THIỆU VỀ THƯƠNG HIỆU TAM LINH.jpg'
    : '/images/Thương hiệu/English/ABOUT TAMLING BRAND .jpg';

  return (
    <section id="about" className="section" style={{ background: 'var(--bg-card)', paddingTop: '80px', paddingBottom: '80px' }}>
      <style>{`
        .about-brand-img {
          max-width: 860px;
          width: 100%;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          cursor: zoom-in;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid var(--border);
          display: block;
          margin: 0 auto;
        }
        .about-brand-img:hover {
          transform: scale(1.01);
          box-shadow: 0 24px 50px rgba(30, 63, 32, 0.18);
        }
        .about-lightbox {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(18, 40, 20, 0.92);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .about-lightbox-inner {
          position: relative;
          max-width: 95vw;
          max-height: 92vh;
        }
        .about-lightbox-inner img {
          max-width: 100%;
          max-height: 88vh;
          border-radius: var(--radius-md);
          box-shadow: 0 30px 70px rgba(0,0,0,0.6);
          display: block;
        }
        .about-lightbox-close {
          position: absolute;
          top: -42px;
          right: 0;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 2rem;
          cursor: pointer;
          line-height: 1;
          transition: color 0.2s;
        }
        .about-lightbox-close:hover {
          color: var(--accent);
        }
      `}</style>

      <div className="container">
        <div className="section-title-wrapper" style={{ marginBottom: '40px' }}>
          <span className="section-subtitle">{t.about.subtitle}</span>
          <h2 className="section-title">{t.about.title}</h2>
        </div>

        <img
          src={imgSrc}
          alt={t.about.title}
          className="about-brand-img"
          onClick={() => setLightboxOpen(true)}
        />
      </div>

      {lightboxOpen && (
        <div className="about-lightbox" onClick={() => setLightboxOpen(false)}>
          <div className="about-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="about-lightbox-close" onClick={() => setLightboxOpen(false)}>✕</button>
            <img src={imgSrc} alt={t.about.title} />
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
