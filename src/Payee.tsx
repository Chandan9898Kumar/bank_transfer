// src/pages/PayeePage.js
import { useState } from "react";
import { useTransaction } from "./Context";
import type { Payee } from "./Context";
import { useNavigate } from "react-router-dom";
import { TransactionGuard } from "./Gaurd";
import "./Payee.css";
import PayeeInfo from "./PayeeInfo";

const mockPayees = [
  { id: "456", name: "John Doe", bankName: "ABC Bank" },
  { id: "4567", name: "John york", bankName: "DBMS Bank" },
];

export const PayeePage = () => {
  const [isInfo, setIsInfo] = useState(false);
  const navigate = useNavigate();
  const { getStepData, setStepData } = useTransaction();
  const selectedAccount = getStepData("account");
  const selectedPayee = getStepData("payee") as Payee;
  const handleSelectPayee = (payee: Payee) => {
    setStepData("payee", payee);
    navigate("/transfer/amount");
  };

  const handleItem = (payee: Payee) => {
    setStepData("payee", payee);
    setIsInfo(true);
  };

  if (isInfo) {
    return (
      <PayeeInfo selectpayee={selectedPayee} onClick={() => setIsInfo(false)} />
    );
  }
  return (
    <TransactionGuard requiredStep="account">
      <div className="payee-page">
        <h2>
          Select a Payee for Account{" "}
          {selectedAccount &&
          typeof selectedAccount === "object" &&
          "name" in selectedAccount
            ? selectedAccount.name
            : ""}
        </h2>
        <div className="payee-list">
          {mockPayees.map((payee) => {
            return (
              <div key={payee.id} className="payee-item">
                <button
                  className="payee-button"
                  onClick={() => handleSelectPayee(payee)}
                >
                  <div className="payee-info">
                    <div className="payee-details">
                      <h3>{payee.name}</h3>
                    </div>
                    <div className="bank-name">{payee.bankName}</div>
                  </div>
                </button>
                <button
                  className="info-button"
                  onClick={() => handleItem(payee)}
                >
                  Info
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </TransactionGuard>
  );
};
