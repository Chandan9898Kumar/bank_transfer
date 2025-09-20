

// src/pages/TransferAmountPage.js
import { useTransaction} from './Context';
import type { Account, Payee  } from "./Context";
import { useNavigate } from 'react-router-dom';
import { TransactionGuard } from './Gaurd';
import { useState } from 'react';

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
      <div>
        <h2>Enter Transfer Amount</h2>
        <p>Transferring from: {(getStepData('account') as Account)?.name}</p>
        <p>Transferring to: {(getStepData('payee') as Payee)?.name}</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleConfirmTransfer}>Confirm</button>
      </div>
    </TransactionGuard>
  );
};

