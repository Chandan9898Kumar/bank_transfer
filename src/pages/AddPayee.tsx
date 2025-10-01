import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components';
import './AddPayee.css';

export const AddPayeePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    address: '',
    mobile: '',
    email: '',
    nickname: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      if (formData.name && formData.bankName && formData.accountNumber && formData.ifscCode) {
        navigate('/transfer/payee');
      } else {
        setError('Please fill in all required fields');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <>
      <SEO
        title="Add New Payee - SecureBank"
        description="Add a new payee to your SecureBank account for easy money transfers"
        keywords="add payee, new beneficiary, money transfer, banking"
      />
      <main className="add-payee-page" role="main">
        <header className="add-payee-header">
          <button 
            className="back-btn" 
            onClick={() => navigate('/transfer/payee')}
            aria-label="Go back to payee list"
            type="button"
          >
            ← Back
          </button>
          <h1>Add New Payee</h1>
        </header>

        <form className="add-payee-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Payee Information</h2>
            
            <div className="form-group">
              <label htmlFor="name" className="required">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                aria-describedby="name-help"
              />
              <div id="name-help" className="field-help">Enter the full name as per bank records</div>
            </div>

            <div className="form-group">
              <label htmlFor="nickname">Nickname (Optional)</label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                value={formData.nickname}
                onChange={handleInputChange}
                aria-describedby="nickname-help"
              />
              <div id="nickname-help" className="field-help">A friendly name to identify this payee</div>
            </div>
          </div>

          <div className="form-section">
            <h2>Bank Details</h2>
            
            <div className="form-group">
              <label htmlFor="bankName" className="required">Bank Name</label>
              <input
                id="bankName"
                name="bankName"
                type="text"
                value={formData.bankName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountNumber" className="required">Account Number</label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                value={formData.accountNumber}
                onChange={handleInputChange}
                required
                aria-describedby="account-help"
              />
              <div id="account-help" className="field-help">Enter the complete account number</div>
            </div>

            <div className="form-group">
              <label htmlFor="ifscCode" className="required">IFSC Code</label>
              <input
                id="ifscCode"
                name="ifscCode"
                type="text"
                value={formData.ifscCode}
                onChange={handleInputChange}
                required
                pattern="[A-Z]{4}0[A-Z0-9]{6}"
                aria-describedby="ifsc-help"
              />
              <div id="ifsc-help" className="field-help">11-character IFSC code (e.g., ABCD0123456)</div>
            </div>
          </div>

          <div className="form-section">
            <h2>Contact Information (Optional)</h2>
            
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleInputChange}
                aria-describedby="mobile-help"
              />
              <div id="mobile-help" className="field-help">Include country code (e.g., +1234567890)</div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                aria-describedby="address-help"
              />
              <div id="address-help" className="field-help">Complete address of the payee</div>
            </div>
          </div>

          {error && (
            <div className="error-message" role="alert" aria-live="polite">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/transfer/payee')}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
              aria-describedby="submit-help"
            >
              {loading ? 'Adding Payee...' : 'Add Payee'}
            </button>
            <div id="submit-help" className="sr-only">
              {loading ? 'Please wait while we add the payee' : 'Click to add the new payee'}
            </div>
          </div>
        </form>
      </main>
    </>
  );
};