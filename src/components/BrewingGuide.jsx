import React, { useState } from 'react';

const BrewingGuide = ({ t }) => {
  const [activeTab, setActiveTab] = useState('taste');

  return (
    <section id="brewing" className="section section-dark">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">{t.nav.brewing}</span>
          <h2 className="section-title" style={{ color: 'var(--bg-main)' }}>{t.brewing.title}</h2>
          <p style={{ maxWidth: '600px', margin: '20px auto 0', color: 'rgba(245, 247, 245, 0.7)', fontSize: '1.05rem' }}>
            {t.brewing.desc}
          </p>
        </div>

        <div className="tabs-container">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'taste' ? 'active' : ''}`}
              onClick={() => setActiveTab('taste')}
            >
              {t.brewing.unfolding}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              {t.schedule.title}
            </button>
          </div>

          <div className="tab-content" style={{ color: 'var(--text-main)' }}>
            {activeTab === 'taste' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '10px', textAlign: 'center' }}>
                  {t.brewing.unfolding}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '40px' }}>
                  {t.brewing.unfoldingDesc}
                </p>
                <div className="taste-cards">
                  <div className="taste-card">
                    <div className="taste-header">
                      <span className="taste-step">{t.brewing.steep1_5}</span>
                      <span className="taste-temp">70–75°C</span>
                    </div>
                    <p className="timeline-desc" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-main)' }}>
                      {t.brewing.steep1_5Desc}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic' }}>
                      {t.brewing.steep1_5Temp}
                    </p>
                  </div>

                  <div className="taste-card">
                    <div className="taste-header">
                      <span className="taste-step">{t.brewing.steep6_10}</span>
                      <span className="taste-temp">75–80°C</span>
                    </div>
                    <p className="timeline-desc" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-main)' }}>
                      {t.brewing.steep6_10Desc}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic' }}>
                      {t.brewing.steep6_10Temp}
                    </p>
                  </div>

                  <div className="taste-card">
                    <div className="taste-header">
                      <span className="taste-step">{t.brewing.steep11_15}</span>
                      <span className="taste-temp">80–85°C</span>
                    </div>
                    <p className="timeline-desc" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-main)' }}>
                      {t.brewing.steep11_15Desc}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic' }}>
                      {t.brewing.steep11_15Temp}
                    </p>
                  </div>

                  <div className="taste-card">
                    <div className="taste-header">
                      <span className="taste-step">{t.brewing.steep16_20}</span>
                      <span className="taste-temp">85–90°C</span>
                    </div>
                    <p className="timeline-desc" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-main)' }}>
                      {t.brewing.steep16_20Desc}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic' }}>
                      {t.brewing.steep16_20Temp}
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                  <img 
                    src="/images/schedule.jpg" 
                    alt="Taste Journey Detail Graphic" 
                    style={{ maxHeight: '200px', borderRadius: 'var(--radius-md)', opacity: 0.9 }} 
                  />
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '10px', textAlign: 'center' }}>
                  {t.schedule.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', textAlign: 'center', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                  {t.schedule.desc}
                </p>

                <div className="grid-2" style={{ gap: '50px', alignItems: 'start' }}>
                  {/* Left Column: Timeline */}
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                      {t.schedule.timelineTitle}
                    </h4>
                    <div className="timeline">
                      <div className="timeline-item">
                        <h5 className="timeline-title">{t.schedule.week1}</h5>
                        <p className="timeline-desc">{t.schedule.week1Desc}</p>
                      </div>
                      <div className="timeline-item">
                        <h5 className="timeline-title">{t.schedule.week2}</h5>
                        <p className="timeline-desc">{t.schedule.week2Desc}</p>
                      </div>
                      <div className="timeline-item">
                        <h5 className="timeline-title">{t.schedule.week3}</h5>
                        <p className="timeline-desc">{t.schedule.week3Desc}</p>
                      </div>
                      <div className="timeline-item">
                        <h5 className="timeline-title">{t.schedule.nextWeeks}</h5>
                        <p className="timeline-desc">{t.schedule.nextWeeksDesc}</p>
                      </div>
                      <div className="timeline-item">
                        <h5 className="timeline-title">{t.schedule.maxDose}</h5>
                        <p className="timeline-desc">{t.schedule.maxDoseDesc}</p>
                      </div>
                      <div className="timeline-item" style={{ marginBottom: 0 }}>
                        <h5 className="timeline-title">{t.schedule.afterMax}</h5>
                        <p className="timeline-desc">{t.schedule.afterMaxDesc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Other Dosages */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ padding: '24px', backgroundColor: 'rgba(197, 160, 89, 0.05)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-md)' }}>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '10px' }}>
                        🛡️ {t.schedule.maintenanceTitle}
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                        {t.schedule.maintenanceDesc}
                      </p>
                    </div>

                    <div style={{ padding: '24px', backgroundColor: 'rgba(48, 95, 51, 0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '10px' }}>
                        ⚡ {t.schedule.enhancedTitle}
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        {t.schedule.enhancedDesc}
                      </p>
                    </div>

                    <div style={{ padding: '24px', backgroundColor: 'rgba(30, 63, 32, 0.05)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-md)' }}>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '10px' }}>
                        🔄 {t.schedule.after30WeeksTitle}
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '500', lineHeight: '1.6' }}>
                        {t.schedule.after30WeeksDesc}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrewingGuide;
