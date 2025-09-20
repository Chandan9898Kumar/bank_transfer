import "./PayeeInfo.css";
import { useNavigate } from "react-router-dom";
interface Payee {
  id: string;
  name: string;
  bankName: string;
  description?: string;
  reference?: string;
}

interface PayeeInfoProps {
  selectpayee: Payee | null;
  onClick: () => void;
}

const PayeeInfo = ({ selectpayee, onClick }: PayeeInfoProps) => {
  const navigate = useNavigate();


  console.log(selectpayee,'  selectpayee in payee info');

  
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
    <div className="payee-info-page">
      <div className="header">
        <button className="back-button" onClick={onClick}>
          ←
        </button>
        <h1>Payee Information</h1>
      </div>
      <div className="payee-card">
        <div className="payee-avatar">{getInitials(selectpayee.name)}</div>
        <div className="payee-name">{selectpayee.name}</div>
        <div className="payee-bank">{selectpayee.bankName}</div>

        <div className="payee-details">
          <div className="detail-row">
            <span className="detail-label">Payee ID:</span>
            <span className="detail-value">{selectpayee.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Bank Name:</span>
            <span className="detail-value">{selectpayee.bankName}</span>
          </div>
          {selectpayee.description && (
            <div className="detail-row">
              <span className="detail-label">Description:</span>
              <span className="detail-value">{selectpayee.description}</span>
            </div>
          )}
          {selectpayee.reference && (
            <div className="detail-row">
              <span className="detail-label">Reference:</span>
              <span className="detail-value">{selectpayee.reference}</span>
            </div>
          )}
        </div>
        <button className="transfer-button" onClick={handleTransfer}>
          Transfer Amount
        </button>
      </div>
    </div>
  );
};

export default PayeeInfo;
