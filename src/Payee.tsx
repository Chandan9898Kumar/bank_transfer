// src/pages/PayeePage.js
import { useState } from "react";
import { useTransaction } from "./Context";
import type { Payee } from "./Context";
import { useNavigate } from "react-router-dom";
import { TransactionGuard } from "./Gaurd";
import "./Payee.css";
import PayeeInfo from "./PayeeInfo";

const mockPayees = [
  { id: "1", name: "John Doe", bankName: "ABC Bank" },
  { id: "2", name: "John york", bankName: "DBMS Bank" },
  { id: "3", name: "John Doer", bankName: "ABC Bank" },
  { id: "4", name: "John yorker", bankName: "DBMS Bank" },
  { id: "5", name: "John Doing", bankName: "ABC Bank" },
  { id: "6", name: "tyson york", bankName: "DBMS Bank" },
  { id: "7", name: "tyson Doe", bankName: "ABC Bank" },
  { id: "8", name: "hero york", bankName: "DBMS Bank" },
  { id: "9", name: "honda Doe", bankName: "ABC Bank" },
  { id: "10", name: "randy york", bankName: "DBMS Bank" },
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
