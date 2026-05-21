import React from 'react';

const Products = ({ t }) => {
  return (
    <section id="products" className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">{t.nav.products}</span>
          <h2 className="section-title">{t.hero.title} Selection</h2>
        </div>

        {/* Section 1: Vietnamese Specialty Teas */}
        <div id="origin" className="grid-2" style={{ marginBottom: '80px', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="section-title" style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '20px' }}>
              {t.specialtyTea.title}
            </h3>
            <p className="product-desc" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
              {t.specialtyTea.description}
            </p>
            <p className="product-desc" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
              {t.specialtyTea.location}
            </p>
            <p style={{ fontStyle: 'italic', fontWeight: '600', color: 'var(--accent-dark)', borderLeft: '3px solid var(--accent)', paddingLeft: '16px' }}>
              "{t.specialtyTea.slogan}"
            </p>
          </div>
          <div className="product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="product-img-wrapper" style={{ flex: 1, minHeight: '300px' }}>
              <span className="product-badge">Specialty Tea</span>
              <img 
                src="/images/brewing-guide.jpg" 
                alt="Ancient Specialty Tea Brewing Guide" 
                className="product-img" 
              />
            </div>
            <div className="product-info" style={{ backgroundColor: 'var(--bg-main)' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '15px', color: 'var(--primary-dark)' }}>
                {t.brewing.suggestion}
              </h4>
              <div className="product-meta" style={{ border: 'none', paddingTop: 0 }}>
                <div className="meta-item">
                  <span className="meta-label">{t.brewing.temp}:</span>
                  <span className="meta-val">{t.brewing.tempVal}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">{t.brewing.time}:</span>
                  <span className="meta-val">{t.brewing.timeVal}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">{t.brewing.ratio}:</span>
                  <span className="meta-val">{t.brewing.ratioVal}</span>
                </div>
                <div className="meta-item" style={{ marginBottom: 0 }}>
                  <span className="meta-label">{t.brewing.endurance}:</span>
                  <span className="meta-val">{t.brewing.enduranceVal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Bitter Melon Longevity Tea */}
        <div className="grid-2" style={{ alignItems: 'stretch' }}>
          <div className="product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="product-img-wrapper" style={{ flex: 1, minHeight: '350px' }}>
              <span className="product-badge product-badge-secondary">{t.bitterMelon.badge}</span>
              <img 
                src="/images/bitter-melon-tea.jpg" 
                alt="Bitter Melon Longevity Tea" 
                className="product-img" 
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="section-title" style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '20px' }}>
              {t.bitterMelon.title}
            </h3>
            <p className="product-desc" style={{ fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '24px' }}>
              {t.bitterMelon.intro}
            </p>

            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '12px', color: 'var(--primary-dark)' }}>
              {t.general.ingredients}:
            </h4>
            <div className="ingredients-grid" style={{ marginBottom: '30px' }}>
              {t.bitterMelon.ingredientsList.map((ing, idx) => (
                <div key={idx} className="ingredient-tag">
                  <span className="ingredient-name">{ing.name}</span>
                  <span className="ingredient-percentage">{ing.percentage}</span>
                </div>
              ))}
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">{t.general.packing}:</span>
                <span className="meta-val" style={{ maxWidth: '65%', textAlign: 'right', fontWeight: '500' }}>
                  {t.bitterMelon.packingVal}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{t.general.retailPrice}:</span>
                <span className="meta-val">{t.bitterMelon.priceVal}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{t.general.bestBefore}:</span>
                <span className="meta-val" style={{ maxWidth: '65%', textAlign: 'right', fontWeight: '500' }}>
                  {t.bitterMelon.bestBeforeVal}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Products;
