import React, { useState } from 'react';

const ContactForm = ({ t }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    option: 'sample', // sample or visit
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API request to Vercel Serverless Function or email service
    setTimeout(() => {
      // Basic validation
      if (formData.fullName && formData.phone) {
        setStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          option: 'sample',
          message: ''
        });
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <section id="experience" className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          
          {/* Left Column: Contact details */}
          <div className="contact-info-panel">
            <span className="section-subtitle">{t.nav.experience}</span>
            <h2 className="contact-info-title">{t.general.contactUs}</h2>
            <p className="contact-info-desc">
              {t.general.registerDesc}
            </p>
            
            <div className="info-details">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <span className="info-label">{t.general.address}</span>
                  <div className="info-value">Phù Đổng, Gia Lâm, Hà Nội, Việt Nam</div>
                </div>
              </div>
              
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <span className="info-label">{t.general.phone}</span>
                  <div className="info-value">0981 498 668</div>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <span className="info-label">Email</span>
                  <div className="info-value">info@tamlingtea.vn</div>
                </div>
              </div>
            </div>

            {/* Embed a stylish placeholder map or graphic for Phù Đổng space */}
            <div style={{ marginTop: '40px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)', height: '180px', backgroundColor: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(30, 63, 32, 0.4), rgba(30, 63, 32, 0.7))', zIndex: 1 }}></div>
              <div style={{ zIndex: 2, textAlign: 'center', color: '#fff', padding: '20px' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '8px' }}>TamLing Tea Tasting Space</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Phù Đổng, Gia Lâm, Hà Nội</p>
                <a 
                  href="https://maps.google.com/?q=Phù+Đổng,+Gia+Lâm,+Hà+Nội" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginTop: '12px', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '700', textDecoration: 'underline' }}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="form-card">
            {status === 'success' ? (
              <div className="form-success">
                <div className="form-success-icon">✓</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
                  Thank You!
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  {t.general.successMsg}
                </p>
                <button 
                  className="btn btn-primary" 
                  style={{ marginTop: '24px' }}
                  onClick={() => setStatus('idle')}
                >
                  Register Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
                  {t.general.registerTitle}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Fill out the form below and we will get back to you to confirm.
                </p>

                {status === 'error' && (
                  <div style={{ padding: '12px', backgroundColor: '#f2dede', color: '#a94442', border: '1px solid #ebccd1', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.9rem' }}>
                    {t.general.errorMsg}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">{t.general.fullName} *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-control" 
                    placeholder="e.g. John Doe / Nguyễn Văn A"
                  />
                </div>

                <div className="grid-2" style={{ gap: '16px', marginBottom: 0 }}>
                  <div className="form-group">
                    <label className="form-label">{t.general.phoneInput} *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="e.g. 0981498668"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t.general.email}</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t.general.selectOption}</label>
                  <select 
                    name="option"
                    value={formData.option}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="sample">{t.general.optSample}</option>
                    <option value="visit">{t.general.optVisit}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t.general.message}</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control" 
                    placeholder="Tell us any special requests..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  {status === 'submitting' ? t.general.submitting : t.general.submit}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
