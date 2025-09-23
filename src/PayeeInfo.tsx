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
      <div className="payee-info-page">
        <h1>Payee Information</h1>
        <div className="no-payee">No payee selected</div>
      </div>
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
    <div className="payee-info-container">
      <div className="payee-header">
        <button className="back-btn" onClick={onClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="page-title">Beneficiary Details</h1>
      </div>

      <div className="payee-profile-section">
        <div className="profile-avatar">
          <span className="avatar-text">{getInitials(selectpayee.name)}</span>
        </div>
        <div className="profile-info">
          <h2 className="beneficiary-name">{selectpayee.name}</h2>
          <p className="bank-label">{selectpayee.bankName}</p>
        </div>
      </div>

      <div className="details-container">
        <div className="section-header">
          <h3>Account Information</h3>
        </div>
        
        <div className="info-grid">
          <div className="info-item">
            <div className="info-label">Account Number</div>
            <div className="info-value">{selectpayee.account || 'Not Available'}</div>
          </div>
          
          <div className="info-item">
            <div className="info-label">Bank Name</div>
            <div className="info-value">{selectpayee.bankName}</div>
          </div>
          
          {selectpayee.mobile && (
            <div className="info-item">
              <div className="info-label">Mobile Number</div>
              <div className="info-value">{selectpayee.mobile}</div>
            </div>
          )}
          
          {selectpayee.address && (
            <div className="info-item full-width">
              <div className="info-label">Address</div>
              <div className="info-value">{selectpayee.address}</div>
            </div>
          )}
        </div>
      </div>

      <div className="action-section">
        <button className="primary-btn" onClick={handleTransfer}>
          <span>Transfer Money</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PayeeInfo;
