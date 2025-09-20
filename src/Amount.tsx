

// src/pages/TransferAmountPage.js
import { useTransaction} from './Context';
import type { Account, Payee  } from "./Context";
import { useNavigate } from 'react-router-dom';
import { TransactionGuard } from './Gaurd';
import { useState } from 'react';
import "./Amount.css";

export const TransferAmountPage = () => {
  const navigate = useNavigate();
  const { getStepData, setStepData,...rest } = useTransaction();
  const [amount, setAmount] = useState('');

  const handleConfirmTransfer = () => {
    setStepData('amount', amount);
    navigate('/transfer/success');
  };
console.log("amount page", rest);
  return (
    <TransactionGuard requiredStep="payee">
      <div className="amount-page">
        <h2>Enter Transfer Amount</h2>
        <div className="transfer-details">
          <p>Transferring from: {(getStepData('account') as Account)?.name}</p>
          <p>Transferring to: {(getStepData('payee') as Payee)?.name}</p>
        </div>
        <div className="amount-input-group">
          <input
            className="amount-input"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="confirm-button" onClick={handleConfirmTransfer} disabled={!amount}>
          Confirm Transfer
        </button>
      </div>
    </TransactionGuard>
  );
};

