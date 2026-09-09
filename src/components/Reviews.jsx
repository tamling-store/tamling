import React, { useState, useEffect } from 'react';

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Nguyễn Văn Hoàng',
    product: 'Bích Sa Trà',
    rating: 5,
    comment: 'Bích Sa Trà hương thơm thanh nhẹ, vị hậu ngọt rất sâu lắng. Nước trà óng vàng quyến rũ, đúng chất trà cổ thụ đỉnh núi.',
    date: '2026-03-02',
    status: 'approved'
  },
  {
    id: 'rev-2',
    name: 'Trần Thị Ánh Tuyết',
    product: 'Bạch Vân Trà',
    rating: 5,
    comment: 'Bạch Vân Trà vị trà dịu êm, không bị chát gắt. Uống vào buổi sáng cảm giác tinh thần rất thư thái và minh mẫn.',
    date: '2026-02-18',
    status: 'approved'
  },
  {
    id: 'rev-3',
    name: 'Phạm Minh Tú',
    product: 'Huyền Động Trà',
    rating: 5,
    comment: 'Huyền Động Trà nước trà thẫm đậm đà, hậu vị mật ngọt tự nhiên kéo dài. Sản phẩm đóng gói rất sang trọng và chỉn chu.',
    date: '2026-01-25',
    status: 'approved'
  },
  {
    id: 'rev-4',
    name: 'Lê Đăng Khoa',
    product: 'Hoàng Nha Trà',
    rating: 5,
    comment: 'Trà tôm búp Hoàng Nha pha được rất nhiều nước mà vẫn giữ trọn hương vị. Rất hài lòng về chất lượng sản phẩm Tamling.',
    date: '2026-01-10',
    status: 'approved'
  }
];

const TEA_PRODUCTS = [
  'Bích Sa Trà',
  'Bạch Vân Trà',
  'Hoàng Nha Trà',
  'Huyền Động Trà',
  'Hồng Dương Trà',
  'Lục Tuyền Trà',
  'Ngọc Sương Trà',
  'Phi Trang Trà'
];

const Reviews = ({ t, currentLang }) => {
  const [reviews, setReviews] = useState([]);
  const [filterProduct, setFilterProduct] = useState('ALL');

  // Form State
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    product: 'Bích Sa Trà',
    rating: 5,
    comment: ''
  });

  // Admin Moderation State
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [adminTab, setAdminTab] = useState('pending');

  // Load reviews on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tamling_reviews');
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        setReviews(DEFAULT_REVIEWS);
        localStorage.setItem('tamling_reviews', JSON.stringify(DEFAULT_REVIEWS));
      }
    } catch (e) {
      setReviews(DEFAULT_REVIEWS);
    }
  }, []);

  // Save helper
  const updateReviews = (newReviews) => {
    setReviews(newReviews);
    try {
      localStorage.setItem('tamling_reviews', JSON.stringify(newReviews));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  };

  // Submit customer review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      name: formData.name.trim(),
      product: formData.product,
      rating: Number(formData.rating),
      comment: formData.comment.trim(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending' // ALWAYS pending for owner moderation!
    };

    const updated = [newRev, ...reviews];
    updateReviews(updated);

    // Reset form
    setFormData({
      name: '',
      product: 'Bích Sa Trà',
      rating: 5,
      comment: ''
    });

    setShowFormModal(false);
    setShowSuccessModal(true);
  };

  // Admin Actions
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin.trim() === 'tamling2026') {
      setIsAdminAuthenticated(true);
      setAdminError('');
    } else {
      setAdminError(t.reviews.invalidPin);
    }
  };

  const handleApprove = (id) => {
    const updated = reviews.map(r => r.id === id ? { ...r, status: 'approved' } : r);
    updateReviews(updated);
  };

  const handleReject = (id) => {
    const updated = reviews.map(r => r.id === id ? { ...r, status: 'rejected' } : r);
    updateReviews(updated);
  };

  const handleDelete = (id) => {
    const updated = reviews.filter(r => r.id !== id);
    updateReviews(updated);
  };

  // Filter approved reviews for display
  const approvedReviews = reviews.filter(r => r.status === 'approved');
  const filteredApproved = filterProduct === 'ALL'
    ? approvedReviews
    : approvedReviews.filter(r => r.product === filterProduct);

  // Moderation lists
  const pendingReviews = reviews.filter(r => r.status === 'pending');
  const allApprovedReviews = reviews.filter(r => r.status === 'approved');
  const rejectedReviews = reviews.filter(r => r.status === 'rejected');

  // Compute average rating
  const avgRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
    : '5.0';

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < count ? '#c5a059' : '#e3ebd9', fontSize: '1.1rem', marginRight: '2px' }}>
        ★
      </span>
    ));
  };

  return (
    <section id="reviews" className="section" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '60px', paddingBottom: '80px' }}>
      <style>{`
        .reviews-header-card {
          background-color: var(--bg-card);
          border-radius: var(--radius-lg);
          padding: 36px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .rating-summary-box {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .rating-score {
          font-family: var(--font-heading);
          font-size: 3.2rem;
          font-weight: 800;
          color: var(--primary-dark);
          line-height: 1;
        }
        .reviews-filter-bar {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          overflow-x: auto;
          padding-bottom: 10px;
          flex-wrap: wrap;
        }
        .filter-chip {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid var(--border);
          background-color: var(--bg-card);
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
        }
        .filter-chip:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        .filter-chip.active {
          background-color: var(--primary);
          color: var(--bg-main);
          border-color: var(--primary);
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .review-card {
          background-color: var(--bg-card);
          border-radius: var(--radius-md);
          padding: 24px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .review-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--border-accent);
        }
        .review-user-name {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary-dark);
        }
        .review-product-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-dark);
          background-color: rgba(197, 160, 89, 0.12);
          padding: 4px 10px;
          border-radius: 12px;
          margin-top: 4px;
        }
        .review-text {
          font-size: 0.95rem;
          color: var(--text-main);
          line-height: 1.6;
          margin: 16px 0;
          font-style: italic;
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: rgba(18, 40, 20, 0.88);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .modal-box {
          background-color: #fff;
          border-radius: var(--radius-lg);
          padding: 36px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 24px 60px rgba(0,0,0,0.3);
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          color: var(--primary-dark);
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: 8px;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          font-size: 0.95rem;
          background-color: var(--bg-main);
          transition: var(--transition);
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--primary);
          background-color: #fff;
        }
        .admin-mod-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px;
          margin-bottom: 14px;
        }
        @media (max-width: 768px) {
          .reviews-grid { grid-template-columns: 1fr; }
          .reviews-header-card { flex-direction: column; text-align: center; justify-content: center; }
          .rating-summary-box { flex-direction: column; }
        }
      `}</style>

      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrapper" style={{ marginBottom: '30px' }}>
          <span className="section-subtitle">{t.reviews.subtitle}</span>
          <h2 className="section-title">{t.reviews.title}</h2>
        </div>

        {/* Rating Summary & Write Button */}
        <div className="reviews-header-card">
          <div className="rating-summary-box">
            <div className="rating-score">{avgRating}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                {renderStars(Math.round(Number(avgRating)))}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                {approvedReviews.length} {t.reviews.totalReviews}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => setShowFormModal(true)}
            >
              ✍️ {t.reviews.writeReview}
            </button>
            <button
              className="btn btn-outline"
              style={{ fontSize: '0.85rem', padding: '10px 18px' }}
              onClick={() => setShowAdminModal(true)}
            >
              {t.reviews.adminBtn} {pendingReviews.length > 0 && `(${pendingReviews.length})`}
            </button>
          </div>
        </div>

        {/* Product Filter Chips */}
        <div className="reviews-filter-bar">
          <button
            className={`filter-chip ${filterProduct === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilterProduct('ALL')}
          >
            {t.reviews.filterAll}
          </button>
          {TEA_PRODUCTS.map(tea => (
            <button
              key={tea}
              className={`filter-chip ${filterProduct === tea ? 'active' : ''}`}
              onClick={() => setFilterProduct(tea)}
            >
              {tea}
            </button>
          ))}
        </div>

        {/* Reviews Cards List */}
        {filteredApproved.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            {t.reviews.noReviews}
          </div>
        ) : (
          <div className="reviews-grid">
            {filteredApproved.map(rev => (
              <div key={rev.id} className="review-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div className="review-user-name">{rev.name}</div>
                      <span className="review-product-tag">🍵 {rev.product}</span>
                    </div>
                    <div>{renderStars(rev.rating)}</div>
                  </div>

                  <p className="review-text">"{rev.comment}"</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border)', paddingTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontWeight: '600' }}>
                    ✓ {t.reviews.verifiedPurchase}
                  </span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── MODAL 1: Customer Write Review Form ─────────────────────── */}
      {showFormModal && (
        <div className="modal-overlay" onClick={() => setShowFormModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="modal-title" style={{ margin: 0 }}>{t.reviews.writeReview}</h3>
              <button onClick={() => setShowFormModal(false)} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            </div>

            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label className="form-label">{t.reviews.yourName} *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Anh Nguyễn Văn A"
                  className="form-input"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.reviews.selectProduct} *</label>
                <select
                  className="form-select"
                  value={formData.product}
                  onChange={e => setFormData({ ...formData, product: e.target.value })}
                >
                  {TEA_PRODUCTS.map(tea => (
                    <option key={tea} value={tea}>{tea}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t.reviews.yourRating} *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[5, 4, 3, 2, 1].map(num => (
                    <label key={num} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', color: formData.rating === num ? 'var(--primary)' : 'var(--text-muted)' }}>
                      <input
                        type="radio"
                        name="rating"
                        value={num}
                        checked={Number(formData.rating) === num}
                        onChange={() => setFormData({ ...formData, rating: num })}
                      />
                      {num} ★
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t.reviews.yourComment} *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Chia sẻ cảm nhận của bạn về hương vị, màu nước, đóng gói..."
                  className="form-textarea"
                  value={formData.comment}
                  onChange={e => setFormData({ ...formData, comment: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowFormModal(false)}>
                  {t.reviews.close}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t.reviews.submitBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 2: Customer Success Submission Notice ──────────────── */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-box" style={{ textAlign: 'center', maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '3.5rem', color: 'var(--primary)', marginBottom: '16px' }}>🍃</div>
            <h3 className="modal-title" style={{ fontSize: '1.4rem' }}>{t.reviews.successTitle}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '28px' }}>
              {t.reviews.successMsg}
            </p>
            <button className="btn btn-primary" onClick={() => setShowSuccessModal(false)}>
              {t.reviews.close}
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL 3: Owner Moderation Dashboard (Kiểm duyệt Review) ─── */}
      {showAdminModal && (
        <div className="modal-overlay" onClick={() => setShowAdminModal(false)}>
          <div className="modal-box" style={{ maxWidth: '750px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
              <h3 className="modal-title" style={{ margin: 0, fontSize: '1.35rem' }}>{t.reviews.adminTitle}</h3>
              <button onClick={() => setShowAdminModal(false)} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            </div>

            {!isAdminAuthenticated ? (
              <form onSubmit={handleAdminLogin} style={{ padding: '20px 0' }}>
                <div className="form-group">
                  <label className="form-label">{t.reviews.enterPin}</label>
                  <input
                    type="password"
                    required
                    placeholder={t.reviews.pinPlaceholder}
                    className="form-input"
                    value={adminPin}
                    onChange={e => setAdminPin(e.target.value)}
                  />
                  {adminError && <p style={{ color: '#d9534f', fontSize: '0.85rem', marginTop: '8px', fontWeight: '600' }}>{adminError}</p>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button type="submit" className="btn btn-primary">
                    {t.reviews.loginBtn}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                {/* Admin Tabs */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <button
                    className={`filter-chip ${adminTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setAdminTab('pending')}
                  >
                    ⏳ {t.reviews.pendingTab} ({pendingReviews.length})
                  </button>
                  <button
                    className={`filter-chip ${adminTab === 'approved' ? 'active' : ''}`}
                    onClick={() => setAdminTab('approved')}
                  >
                    ✓ {t.reviews.approvedTab} ({allApprovedReviews.length})
                  </button>
                  <button
                    className={`filter-chip ${adminTab === 'rejected' ? 'active' : ''}`}
                    onClick={() => setAdminTab('rejected')}
                  >
                    ✕ {t.reviews.rejectedTab} ({rejectedReviews.length})
                  </button>
                </div>

                {/* Tab: Pending Moderation */}
                {adminTab === 'pending' && (
                  <div>
                    {pendingReviews.length === 0 ? (
                      <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>Không có review nào đang chờ duyệt.</p>
                    ) : (
                      pendingReviews.map(r => (
                        <div key={r.id} className="admin-mod-card">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <div>
                              <strong>{r.name}</strong> — <span style={{ color: 'var(--accent-dark)', fontWeight: '600' }}>{r.product}</span>
                            </div>
                            <div>{renderStars(r.rating)}</div>
                          </div>
                          <p style={{ fontSize: '0.92rem', color: '#333', marginBottom: '12px', fontStyle: 'italic' }}>"{r.comment}"</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.date}</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => handleApprove(r.id)}
                                style={{ backgroundColor: '#2e7d32', color: '#fff', padding: '6px 14px', borderRadius: '15px', border: 'none', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
                              >
                                {t.reviews.approveAction}
                              </button>
                              <button
                                onClick={() => handleReject(r.id)}
                                style={{ backgroundColor: '#c62828', color: '#fff', padding: '6px 14px', borderRadius: '15px', border: 'none', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
                              >
                                {t.reviews.rejectAction}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Tab: Approved */}
                {adminTab === 'approved' && (
                  <div>
                    {allApprovedReviews.length === 0 ? (
                      <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>Chưa có review nào được duyệt.</p>
                    ) : (
                      allApprovedReviews.map(r => (
                        <div key={r.id} className="admin-mod-card">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <div>
                              <strong>{r.name}</strong> — <span style={{ color: 'var(--accent-dark)', fontWeight: '600' }}>{r.product}</span>
                            </div>
                            <div>{renderStars(r.rating)}</div>
                          </div>
                          <p style={{ fontSize: '0.92rem', color: '#333', marginBottom: '12px', fontStyle: 'italic' }}>"{r.comment}"</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.date}</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => handleReject(r.id)}
                                style={{ backgroundColor: '#ed6c02', color: '#fff', padding: '6px 12px', borderRadius: '15px', border: 'none', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}
                              >
                                🚫 Ẩn review
                              </button>
                              <button
                                onClick={() => handleDelete(r.id)}
                                style={{ backgroundColor: '#d32f2f', color: '#fff', padding: '6px 12px', borderRadius: '15px', border: 'none', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}
                              >
                                {t.reviews.deleteAction}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Tab: Rejected */}
                {adminTab === 'rejected' && (
                  <div>
                    {rejectedReviews.length === 0 ? (
                      <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>Không có review bị từ chối.</p>
                    ) : (
                      rejectedReviews.map(r => (
                        <div key={r.id} className="admin-mod-card" style={{ backgroundColor: '#fff5f5' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <div>
                              <strong>{r.name}</strong> — <span style={{ color: 'var(--accent-dark)', fontWeight: '600' }}>{r.product}</span>
                            </div>
                            <div>{renderStars(r.rating)}</div>
                          </div>
                          <p style={{ fontSize: '0.92rem', color: '#555', marginBottom: '12px', fontStyle: 'italic' }}>"{r.comment}"</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.date}</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => handleApprove(r.id)}
                                style={{ backgroundColor: '#2e7d32', color: '#fff', padding: '6px 12px', borderRadius: '15px', border: 'none', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}
                              >
                                ✓ Khôi phục & Duyệt
                              </button>
                              <button
                                onClick={() => handleDelete(r.id)}
                                style={{ backgroundColor: '#d32f2f', color: '#fff', padding: '6px 12px', borderRadius: '15px', border: 'none', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' }}
                              >
                                {t.reviews.deleteAction}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
