// src/pages/TransferAmountPage.js
import { useTransaction } from "./Context";
import type { Account, Payee } from "./Context";
import { useNavigate } from "react-router-dom";
import { TransactionGuard } from "./Gaurd";
import { useState } from "react";
import "./Amount.css";

export const TransferAmountPage = () => {
  const navigate = useNavigate();
  const { getStepData, setStepData, ...rest } = useTransaction();
  const [amount, setAmount] = useState("");

  const handleConfirmTransfer = () => {
    setStepData("amount", amount);
    navigate("/transfer/success?type=transfer", { replace: true });
  };
  console.log("amount page", rest);
  return (
    <TransactionGuard requiredStep="payee">
      <main className="amount-page" role="main">
        <header>
          <h1 id="amount-title">Enter Transfer Amount</h1>
        </header>
        
        <section className="transfer-details" aria-labelledby="transfer-summary">
          <h2 id="transfer-summary" className="sr-only">Transfer Summary</h2>
          <dl className="transfer-info">
            <dt>Transferring from:</dt>
            <dd>{(getStepData("account") as Account)?.name}</dd>
            <dt>Transferring to:</dt>
            <dd>{(getStepData("payee") as Payee)?.name}</dd>
          </dl>
        </section>
        
        <form onSubmit={(e) => { e.preventDefault(); handleConfirmTransfer(); }}>
          <div className="amount-input-group">
            <label htmlFor="transfer-amount" className="amount-label">
              Transfer Amount ($)
            </label>
            <input
              id="transfer-amount"
              className="amount-input"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-describedby="amount-help"
              aria-required="true"
              autoComplete="off"
            />
            <div id="amount-help" className="input-help">
              Enter the amount you want to transfer
            </div>
          </div>
          
          <button
            className="confirm-button"
            type="submit"
            disabled={!amount || parseFloat(amount) <= 0}
            aria-describedby="confirm-help"
          >
            Confirm Transfer
          </button>
          <div id="confirm-help" className="sr-only">
            {!amount || parseFloat(amount) <= 0 
              ? "Please enter a valid amount to continue" 
              : "Click to proceed with the money transfer"}
          </div>
        </form>
      </main>
    </TransactionGuard>
  );
};
