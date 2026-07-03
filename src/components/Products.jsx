import React, { useState, useEffect } from 'react';

const Products = ({ t, currentLang }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTea, setActiveTea] = useState(null);
  const [brewingTab, setBrewingTab] = useState(0);

  useEffect(() => {
    setCurrentSlide(0);
    setActiveTea(null);
    setBrewingTab(0);
  }, [activeTab, currentLang]);

  // ── Image path roots ──────────────────────────────────────────────────────
  const VI = 'Tiếng Việt';
  const EN = 'English';
  const lang = currentLang === 'vi' ? VI : EN;

  // Base paths per language
  const spVI = `/images/Sản phẩm/${VI}`;
  const spEN = `/images/Sản phẩm/${EN}`;
  const sp = currentLang === 'vi' ? spVI : spEN;

  // ── Wellness Tea slides (named files) ─────────────────────────────────────
  const wellnessSlides = currentLang === 'vi'
    ? [
        { file: 'GIỚI THIỆU.jpg',                   label: 'Giới thiệu' },
        { file: 'THÀNH PHẦN.jpg',                   label: 'Thành phần' },
        { file: 'CÔNG DỤNG.jpg',                    label: 'Công dụng' },
        { file: 'LỘ TRÌNH SỬ DỤNG BAN ĐẦU.jpg',    label: 'Lộ trình sử dụng ban đầu' },
        { file: 'HƯỚNG DẪN SỬ DỤNG.jpg',            label: 'Hướng dẫn sử dụng' },
        { file: 'LIỀU LƯỢNG DỤNG LÂU DÀI.jpg',      label: 'Liều lượng lâu dài' },
        { file: 'KHUYẾN CÁO.jpg',                   label: 'Khuyến cáo' },
        { file: 'LƯU Ý.jpg',                        label: 'Lưu ý' },
        { file: 'ỦNG HỘ DỰ ÁN TẶNG TRÀ MIỄN PHÍ.jpg', label: 'Dự án miễn phí' },
      ]
    : [
        { file: 'INTRODUCTION.jpg',           label: 'Introduction' },
        { file: 'INGREDIENTS.jpg',            label: 'Ingredients' },
        { file: 'BENEFITS.jpg',               label: 'Benefits' },
        { file: 'LINITIAL USAGE TIMELINE.jpg',label: 'Initial Usage Timeline' },
        { file: 'HOW TO USE.jpg',             label: 'How to Use' },
        { file: 'LONG-TERM DOSAGE.jpg',       label: 'Long-term Dosage' },
        { file: 'PRECAUTIONS.jpg',            label: 'Precautions' },
        { file: 'RECOMMENDATIONS.jpg',        label: 'Recommendations' },
        { file: 'DONATE FOR FREE PROJECT.jpg',label: 'Donate for Free Project' },
      ];

  // ── Herbal Bath / Skin Cleansing slides ───────────────────────────────────
  const bathSlides = currentLang === 'vi'
    ? [
        { file: 'GIỚI THIỆU.jpg',             label: 'Giới thiệu' },
        { file: 'THÀNH PHẦN.jpg',             label: 'Thành phần' },
        { file: 'CÔNG DỤNG.jpg',              label: 'Công dụng' },
        { file: 'HƯỚNG DẪN SỬ DỤNG.jpg',      label: 'Hướng dẫn sử dụng' },
        { file: 'LƯU Ý KHI SỬ DỤNG.jpg',     label: 'Lưu ý khi sử dụng' },
        { file: 'CẢNH BÁO AN TOÀN.jpg',       label: 'Cảnh báo an toàn' },
        { file: 'ỦNG HỘ TẶNG SẢN PHẨM MIỄN PHÍ.jpg', label: 'Dự án miễn phí' },
      ]
    : [
        { file: 'INTRODUCTION.jpg',      label: 'Introduction' },
        { file: 'INGREDIENTS.jpg',       label: 'Ingredients' },
        { file: 'BENEFITS.jpg',          label: 'Benefits' },
        { file: 'DIRECTIONS FOR USE.jpg',label: 'Directions for Use' },
        { file: 'USAGE NOTES.jpg',       label: 'Usage Notes' },
        { file: 'SAFETY WARNINGS.jpg',   label: 'Safety Warnings' },
        { file: 'DONATE FREE PROJECT.jpg',label: 'Donate Free Project' },
      ];

  // ── 7 Specialty Teas ─────────────────────────────────────────────────────
  const teas = currentLang === 'vi'
    ? [
        { id: 'bich-sa',    name: 'Bích Sa Trà',   file: 'Bích Sa Trà.jpg' },
        { id: 'bach-van',   name: 'Bạch Vân Trà',  file: 'Bạch Vân Trà.jpg' },
        { id: 'hoang-nha',  name: 'Hoàng Nha Trà', file: 'Hoàng Nha Trà.jpg' },
        { id: 'hong-duong', name: 'Hồng Dương Trà',file: 'Hồng Dương Trà.jpg' },
        { id: 'luc-tuyen',  name: 'Lục Tuyền Trà', file: 'Lục Tuyền Trà.jpg' },
        { id: 'ngoc-suong', name: 'Ngọc Sương Trà',file: 'Ngọc Sương Trà.jpg' },
        { id: 'phi-trang',  name: 'Phi Trang Trà', file: 'Phi Trang Trà.jpg' },
      ]
    : [
        { id: 'bich-sa',    name: 'Navi Sand Tea',     file: 'Navi Sand Tea.jpg' },
        { id: 'bach-van',   name: 'White Cloud Tea',   file: 'White Cloud Tea.jpg' },
        { id: 'hoang-nha',  name: 'Yellow Syrupt Tea', file: 'Yellow Syrupt Tea.jpg' },
        { id: 'hong-duong', name: 'Pink Sunshine Tea', file: 'Pink Sunshine Tea.jpg' },
        { id: 'luc-tuyen',  name: 'Green Cascade Tea', file: 'Green Cascade Tea.jpg' },
        { id: 'ngoc-suong', name: 'Turquoise Brume Tea',file: 'Turquoise Brume Tea.jpg' },
        { id: 'phi-trang',  name: 'Purple Field Tea',  file: 'Purple Field Tea.jpg' },
      ];

  // ── Folder names per language ─────────────────────────────────────────────
  const specialtyFolder = currentLang === 'vi'
    ? 'Trà cổ thụ đặc sản Việt Nam'
    : 'Vietnamese specialty teas';

  const wellnessFolder = currentLang === 'vi'
    ? 'Trà thảo mộc dưỡng sinh hàng ngày'
    : 'Daily detox & wellness herbal tea';

  const bathFolder = currentLang === 'vi'
    ? 'Dung dịch thảo mộc làm sạch ngoài da'
    : 'Herbal external skin cleansing solution';

  const ceramicFolder = currentLang === 'vi'
    ? 'Gốm hoạt khoáng hữu cơ Việt Nam'
    : "Vietnam's active trace element and organic stoneware";

  const incenseFolder = currentLang === 'vi'
    ? 'Nhang Thiền'
    : 'Zen incense';

  const categories = [
    { id: 'ceramic',   label: t.catalog.categories.ceramic },
    { id: 'incense',   label: t.catalog.categories.incense },
    { id: 'specialty', label: t.catalog.categories.specialtyTea },
    { id: 'wellness',  label: t.catalog.categories.wellnessTea },
    { id: 'bath',      label: t.catalog.categories.herbalBath },
  ];

  const handlePrevSlide = (max) => setCurrentSlide(p => (p > 0 ? p - 1 : max - 1));
  const handleNextSlide = (max) => setCurrentSlide(p => (p < max - 1 ? p + 1 : 0));

  const openLightbox = (name, image) => setActiveTea({ name, image });

  return (
    <section id="products" className="section" style={{ paddingTop: '80px', background: 'var(--bg-main)' }}>
      <style>{`
        .catalog-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 15px;
          flex-wrap: wrap;
        }
        .catalog-tab-btn {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 20px;
          color: var(--text-muted);
          background-color: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: var(--transition);
        }
        .catalog-tab-btn:hover {
          color: var(--primary);
          background-color: rgba(30, 63, 32, 0.04);
        }
        .catalog-tab-btn.active {
          color: var(--bg-main);
          background-color: var(--primary);
          border-color: var(--primary);
          box-shadow: var(--shadow-sm);
        }
        .catalog-content-wrapper {
          background-color: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 30px;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border);
          min-height: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .catalog-single-img {
          max-height: 80vh;
          width: auto;
          max-width: 100%;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          transition: var(--transition);
          cursor: zoom-in;
        }
        .catalog-single-img:hover {
          transform: scale(1.01);
          box-shadow: 0 20px 40px rgba(30, 63, 32, 0.15);
        }
        /* Slider */
        .slider-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 820px;
        }
        .slider-main {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
          gap: 16px;
        }
        .slider-control-btn {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--primary);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          font-weight: bold;
          font-size: 1.2rem;
          flex-shrink: 0;
          z-index: 10;
        }
        .slider-control-btn:hover {
          background-color: var(--primary);
          color: var(--bg-main);
          transform: scale(1.05);
        }
        .slider-dots {
          display: flex;
          gap: 8px;
          margin-top: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .slider-dot {
          padding: 4px 10px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background-color: var(--bg-card);
          font-size: 0.72rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 600;
          white-space: nowrap;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .slider-dot:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        .slider-dot.active {
          background-color: var(--primary);
          color: var(--bg-main);
          border-color: var(--primary);
        }
        /* Specialty tea grid */
        .specialty-intro {
          width: 100%;
          max-width: 820px;
          margin-bottom: 36px;
        }
        .teas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
          max-width: 860px;
          margin-bottom: 36px;
        }
        .tea-item-card {
          background-color: var(--bg-main);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          text-align: center;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }
        .tea-item-card:hover {
          border-color: var(--accent);
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        .tea-thumb-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background-color: var(--bg-card);
        }
        .tea-thumb-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.4s ease;
          display: block;
        }
        .tea-item-card:hover .tea-thumb-wrap img {
          transform: scale(1.05);
        }
        .tea-item-info {
          padding: 12px 10px;
        }
        .tea-item-card h4 {
          font-family: var(--font-heading);
          color: var(--primary-dark);
          font-size: 0.92rem;
          margin: 0 0 4px;
          font-weight: 700;
          line-height: 1.3;
        }
        .tea-item-card span {
          font-size: 0.72rem;
          color: var(--accent-dark);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        /* Brewing sub-section */
        .sub-sections {
          width: 100%;
          max-width: 900px;
          border-top: 1px solid var(--border);
          padding-top: 36px;
          margin-top: 10px;
        }
        .sub-nav {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .sub-nav-btn {
          font-size: 0.88rem;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 15px;
          color: var(--text-muted);
          border: 1px solid var(--border);
          background-color: var(--bg-main);
          cursor: pointer;
          transition: var(--transition);
        }
        .sub-nav-btn:hover { color: var(--primary); border-color: var(--primary); }
        .sub-nav-btn.active {
          background-color: var(--primary);
          color: var(--bg-main);
          border-color: var(--primary);
        }
        /* Lightbox */
        .lightbox-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: rgba(18, 40, 20, 0.92);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .lightbox-content {
          position: relative;
          max-width: 92%;
          max-height: 90vh;
        }
        .lightbox-img {
          max-width: 100%;
          max-height: 88vh;
          border-radius: var(--radius-sm);
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          display: block;
        }
        .lightbox-close-btn {
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
        .lightbox-close-btn:hover { color: var(--accent); }
        @media (max-width: 992px) {
          .teas-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .teas-grid { grid-template-columns: repeat(2, 1fr); }
          .catalog-content-wrapper { padding: 20px 10px; }
          .slider-control-btn { width: 36px; height: 36px; font-size: 1rem; }
        }
        @media (max-width: 480px) {
          .teas-grid { grid-template-columns: repeat(2, 1fr); }
          .catalog-tabs { gap: 6px; }
          .catalog-tab-btn { padding: 8px 12px; font-size: 0.85rem; }
        }
      `}</style>

      <div className="container">
        <div className="section-title-wrapper" style={{ marginBottom: '40px' }}>
          <span className="section-subtitle">{t.catalog.subtitle}</span>
          <h2 className="section-title">{t.catalog.title}</h2>
        </div>

        {/* Tab navigation */}
        <div className="catalog-tabs">
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              className={`catalog-tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="catalog-content-wrapper">

          {/* ── TAB 0: Gốm hoạt khoáng hữu cơ ─────────────────────── */}
          {activeTab === 0 && (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <img
                src={`${sp}/${ceramicFolder}/${currentLang === 'vi' ? 'Chén trà.jpg' : 'Tea Cup.jpg'}`}
                alt={t.catalog.categories.ceramic}
                className="catalog-single-img"
                onClick={() => openLightbox(
                  t.catalog.categories.ceramic,
                  `${sp}/${ceramicFolder}/${currentLang === 'vi' ? 'Chén trà.jpg' : 'Tea Cup.jpg'}`
                )}
              />
            </div>
          )}

          {/* ── TAB 1: Nhang Thiền ──────────────────────────────────── */}
          {activeTab === 1 && (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <img
                src={`${sp}/${incenseFolder}/${currentLang === 'vi' ? 'Nhang Thiền.jpg' : 'Zen incense.jpg'}`}
                alt={t.catalog.categories.incense}
                className="catalog-single-img"
                onClick={() => openLightbox(
                  t.catalog.categories.incense,
                  `${sp}/${incenseFolder}/${currentLang === 'vi' ? 'Nhang Thiền.jpg' : 'Zen incense.jpg'}`
                )}
              />
            </div>
          )}

          {/* ── TAB 2: Trà đặc sản Việt Nam ────────────────────────── */}
          {activeTab === 2 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Intro image — natural square ratio */}
              <div className="specialty-intro" style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={`${sp}/${specialtyFolder}/${
                    currentLang === 'vi'
                      ? 'Giới Thiệu Trà Cổ Thụ Đặc Sản Việt Nam.jpg'
                      : 'Vietnam Specialty Teas Introduction.jpg'
                  }`}
                  alt={t.catalog.categories.specialtyTea}
                  className="catalog-single-img"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: 'min(600px, 100%)',
                    maxHeight: '80vh',
                    aspectRatio: '1 / 1',
                    objectFit: 'contain',
                    cursor: 'zoom-in'
                  }}
                  onClick={() => openLightbox(
                    t.catalog.categories.specialtyTea,
                    `${sp}/${specialtyFolder}/${
                      currentLang === 'vi'
                        ? 'Giới Thiệu Trà Cổ Thụ Đặc Sản Việt Nam.jpg'
                        : 'Vietnam Specialty Teas Introduction.jpg'
                    }`
                  )}
                />
              </div>

              {/* 7 Tea Cards */}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--primary-dark)',
                fontSize: '1.4rem',
                marginBottom: '18px',
                textAlign: 'center',
                fontWeight: '700'
              }}>
                {t.catalog.teasTitle}
              </h3>
              <div className="teas-grid">
                {teas.map(tea => (
                  <div
                    key={tea.id}
                    className="tea-item-card"
                    onClick={() => openLightbox(
                      tea.name,
                      `${sp}/${specialtyFolder}/${tea.file}`
                    )}
                  >
                    {/* Square thumbnail */}
                    <div className="tea-thumb-wrap">
                      <img
                        src={`${sp}/${specialtyFolder}/${tea.file}`}
                        alt={tea.name}
                        loading="lazy"
                      />
                    </div>
                    {/* Name + CTA */}
                    <div className="tea-item-info">
                      <h4>{tea.name}</h4>
                      <span>{t.catalog.viewDetails}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Brewing methods */}
              <div className="sub-sections">
                <div className="sub-nav">
                  <button
                    className={`sub-nav-btn ${brewingTab === 0 ? 'active' : ''}`}
                    onClick={() => setBrewingTab(0)}
                  >
                    {t.catalog.brewingTeapot}
                  </button>
                  <button
                    className={`sub-nav-btn ${brewingTab === 1 ? 'active' : ''}`}
                    onClick={() => setBrewingTab(1)}
                  >
                    {t.catalog.brewingPourover}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  {brewingTab === 0 && (
                    <img
                      src={`${sp}/${specialtyFolder}/${
                        currentLang === 'vi' ? 'Cách Pha Trà Bằng Ấm.jpg' : 'INDIGENOUS BREWING.jpg'
                      }`}
                      alt={t.catalog.brewingTeapot}
                      className="catalog-single-img"
                      style={{ maxWidth: '820px' }}
                      onClick={() => openLightbox(
                        t.catalog.brewingTeapot,
                        `${sp}/${specialtyFolder}/${
                          currentLang === 'vi' ? 'Cách Pha Trà Bằng Ấm.jpg' : 'INDIGENOUS BREWING.jpg'
                        }`
                      )}
                    />
                  )}
                  {brewingTab === 1 && (
                    <img
                      src={`${sp}/${specialtyFolder}/${
                        currentLang === 'vi' ? 'Cách Pha Trà Pour-over.jpg' : 'MODERN POUR-OVER.jpg'
                      }`}
                      alt={t.catalog.brewingPourover}
                      className="catalog-single-img"
                      style={{ maxWidth: '820px' }}
                      onClick={() => openLightbox(
                        t.catalog.brewingPourover,
                        `${sp}/${specialtyFolder}/${
                          currentLang === 'vi' ? 'Cách Pha Trà Pour-over.jpg' : 'MODERN POUR-OVER.jpg'
                        }`
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: Trà dưỡng sinh ──────────────────────────────── */}
          {activeTab === 3 && (
            <div className="slider-wrapper">
              <div className="slider-main">
                <button className="slider-control-btn" onClick={() => handlePrevSlide(wellnessSlides.length)}>‹</button>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <img
                    src={`${sp}/${wellnessFolder}/${wellnessSlides[currentSlide].file}`}
                    alt={wellnessSlides[currentSlide].label}
                    className="catalog-single-img"
                    onClick={() => openLightbox(
                      wellnessSlides[currentSlide].label,
                      `${sp}/${wellnessFolder}/${wellnessSlides[currentSlide].file}`
                    )}
                  />
                </div>
                <button className="slider-control-btn" onClick={() => handleNextSlide(wellnessSlides.length)}>›</button>
              </div>
              <div className="slider-dots">
                {wellnessSlides.map((slide, idx) => (
                  <button
                    key={idx}
                    className={`slider-dot ${currentSlide === idx ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(idx)}
                    title={slide.label}
                  >
                    {slide.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 4: Dung dịch thảo mộc / Herbal Bath ────────────── */}
          {activeTab === 4 && (
            <div className="slider-wrapper">
              <div className="slider-main">
                <button className="slider-control-btn" onClick={() => handlePrevSlide(bathSlides.length)}>‹</button>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <img
                    src={`${sp}/${bathFolder}/${bathSlides[currentSlide].file}`}
                    alt={bathSlides[currentSlide].label}
                    className="catalog-single-img"
                    onClick={() => openLightbox(
                      bathSlides[currentSlide].label,
                      `${sp}/${bathFolder}/${bathSlides[currentSlide].file}`
                    )}
                  />
                </div>
                <button className="slider-control-btn" onClick={() => handleNextSlide(bathSlides.length)}>›</button>
              </div>
              <div className="slider-dots">
                {bathSlides.map((slide, idx) => (
                  <button
                    key={idx}
                    className={`slider-dot ${currentSlide === idx ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(idx)}
                    title={slide.label}
                  >
                    {slide.label}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Lightbox */}
      {activeTea && (
        <div className="lightbox-overlay" onClick={() => setActiveTea(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setActiveTea(null)}>✕</button>
            <img src={activeTea.image} alt={activeTea.name} className="lightbox-img" />
            <div style={{
              color: '#fff',
              textAlign: 'center',
              marginTop: '10px',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-body)',
              fontWeight: '600'
            }}>
              {activeTea.name}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
