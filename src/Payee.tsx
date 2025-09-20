// src/pages/PayeePage.js
import { useTransaction } from "./Context";
import type { Payee } from "./Context";
import { useNavigate } from "react-router-dom";
import { TransactionGuard } from "./Gaurd";

const mockPayees = [
  { id: "456", name: "John Doe", bankName: "ABC Bank" },
  { id: "4567", name: "John york", bankName: "DBMS Bank" },
];

export const PayeePage = () => {
  const navigate = useNavigate();
  const { getStepData, setStepData,...rest } = useTransaction();
  const selectedAccount = getStepData("account");
  
  const handleSelectPayee = (payee: Payee) => {
    setStepData("payee", payee);
    navigate("/transfer/amount");
  };
console.log("payee:", rest);
  return (
    <TransactionGuard requiredStep="account">
      <div>
        <h2>
          Select a Payee for an Account{" "}
          {selectedAccount && typeof selectedAccount === "object" && "name" in selectedAccount
            ? selectedAccount.name
            : ""}
        </h2>
        {mockPayees.map((payee) => (
          <button key={payee.id} onClick={() => handleSelectPayee(payee)}>
            {payee.name}
          </button>
        ))}
      </div>
    </TransactionGuard>
  );
};
