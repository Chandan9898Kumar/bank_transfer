// src/pages/AccountPage.js
import { useTransaction } from "./Context";
import type { Account } from "./Context";
import { useNavigate } from "react-router-dom";

const mockAccounts: Account[] = [
  {
    id: "123",
    name: "John Roy",
    accountNumber: "1234567890",
    balance: 5000,
    type: "credit",
  },
  {
    id: "12",
    name: "John Smith",
    accountNumber: "1234567890",
    balance: 5000,
    type: "savings",
  },
  {
    id: "1",
    name: "John Cena",
    accountNumber: "1234567890",
    balance: 5000,
    type: "current",
  },
];

export const AccountPage = () => {
  const navigate = useNavigate();
  const { setStepData, ...rest } = useTransaction();

  const handleSelectAccount = (account: Account) => {
    setStepData("account", account);
    navigate("/transfer/payee");
  };
  console.log("AccountPage:", rest);
  return (
    <div>
      <h2>Select an Account</h2>
      {mockAccounts.map((acc) => (
        <button key={acc.id} onClick={() => handleSelectAccount(acc)}>
          {acc.name}
        </button>
      ))}
    </div>
  );
};
