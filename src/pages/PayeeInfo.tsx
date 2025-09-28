import "./PayeeInfo.css";
import { useNavigate } from "react-router-dom";
interface Payee {
  id: string;
  name: string;
  bankName: string;
  address?: string;
  account?: string;
  mobile?: string;
  description?: string;
  reference?: string;
}

interface PayeeInfoProps {
  selectpayee: Payee | null;
  onClick: () => void;
}

const PayeeInfo = ({ selectpayee, onClick }: PayeeInfoProps) => {
  const navigate = useNavigate();
console.log(selectpayee, "  selectpayee in payee info");
  if (!selectpayee) {
    return (
      <main className="payee-info-page" role="main">
        <h1>Payee Information</h1>
        <div className="no-payee" role="status" aria-live="polite">
          No payee selected. Please go back and select a payee.
        </div>
      </main>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleTransfer = () => {
    navigate("/transfer/amount");
  };

  return (
    <main className="payee-info-container" role="main">
      <header className="payee-header">
        <button 
          className="back-btn" 
          onClick={onClick}
          aria-label="Go back to payee list"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="sr-only">Back</span>
        </button>
        <h1 className="page-title" id="payee-details-title">Beneficiary Details</h1>
      </header>

      <section className="payee-profile-section" aria-labelledby="profile-heading">
        <h2 id="profile-heading" className="sr-only">Payee Profile</h2>
        <div className="profile-avatar" aria-hidden="true">
          <span className="avatar-text">{getInitials(selectpayee.name)}</span>
        </div>
        <div className="profile-info">
          <h3 className="beneficiary-name">{selectpayee.name}</h3>
          <p className="bank-label" aria-label={`Bank: ${selectpayee.bankName}`}>{selectpayee.bankName}</p>
        </div>
      </section>

      <section className="details-container" aria-labelledby="account-info-heading">
        <header className="section-header">
          <h2 id="account-info-heading">Account Information</h2>
        </header>
        
        <dl className="info-grid">
          <div className="info-item">
            <dt className="info-label">Account Number</dt>
            <dd className="info-value">{selectpayee.account || 'Not Available'}</dd>
          </div>
          
          <div className="info-item">
            <dt className="info-label">Bank Name</dt>
            <dd className="info-value">{selectpayee.bankName}</dd>
          </div>
          
          {selectpayee.mobile && (
            <div className="info-item">
              <dt className="info-label">Mobile Number</dt>
              <dd className="info-value">{selectpayee.mobile}</dd>
            </div>
          )}
          
          {selectpayee.address && (
            <div className="info-item full-width">
              <dt className="info-label">Address</dt>
              <dd className="info-value">{selectpayee.address}</dd>
            </div>
          )}
        </dl>
      </section>

      <footer className="action-section">
        <button 
          className="primary-btn" 
          onClick={handleTransfer}
          aria-label={`Transfer money to ${selectpayee.name}`}
          type="button"
        >
          <span>Transfer Money</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </footer>
    </main>
  );
};

export default PayeeInfo;
