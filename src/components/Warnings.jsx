import React from 'react';

const Warnings = ({ t }) => {
  return (
    <section id="benefits" className="section">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'start', gap: '60px' }}>
          
          {/* Left Column: Benefits & Instructions */}
          <div>
            <div className="section-title-wrapper" style={{ textAlign: 'left', marginBottom: '40px' }}>
              <span className="section-subtitle">{t.benefits.benefitsTitle}</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>{t.benefits.title}</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px' }}>
              {t.benefits.items.map((benefit, idx) => (
                <div key={idx} className="benefit-item">
                  <span className="benefit-num">0{idx + 1}</span>
                  <div className="benefit-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Preparation Methods */}
            <div className="section-title-wrapper" style={{ textAlign: 'left', marginBottom: '30px' }}>
              <span className="section-subtitle">{t.benefits.usageTitle}</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--primary-dark)' }}>
                {t.benefits.usageTitle}
              </h3>
            </div>
            <div className="grid-2" style={{ gap: '20px' }}>
              {t.benefits.usage.map((use, idx) => (
                <div key={idx} style={{ padding: '20px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '8px' }}>
                    {idx + 1}. {use.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {use.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Warnings & Precautions */}
          <div id="warnings" style={{ position: 'sticky', top: '100px' }}>
            <div className="section-title-wrapper" style={{ textAlign: 'left', marginBottom: '40px' }}>
              <span className="section-subtitle" style={{ color: '#d9534f' }}>{t.nav.warnings}</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>{t.warnings.title}</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {t.warnings.list.map((warn, idx) => {
                // Highlight contraindications and discontinue signs
                const isSevere = idx === 0 || idx === 1;
                return (
                  <div key={idx} className={`warning-card ${isSevere ? 'severe' : ''}`}>
                    <h4 className="warning-title">
                      {isSevere ? '⚠️' : 'ℹ️'} {warn.title}
                    </h4>
                    <p className="warning-desc">
                      {warn.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <img 
                src="/images/warnings.jpg" 
                alt="Important warning details" 
                style={{ maxHeight: '160px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} 
              />
              <img 
                src="/images/benefits.jpg" 
                alt="Important benefits details" 
                style={{ maxHeight: '160px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Warnings;
