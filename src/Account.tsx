// src/pages/AccountPage.js
import { useTransaction } from "./Context";
import type { Account } from "./Context";
import { useNavigate } from "react-router-dom";
import "./Account.css";

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
    <div className="account-page">
      <h2>Select an Account</h2>
      <div className="account-list">
        {mockAccounts.map((acc) => (
          <button key={acc.id} className="account-button" onClick={() => handleSelectAccount(acc)}>
            <div className="account-info">
              <div className="account-details">
                <h3>{acc.name}</h3>
                <p>Account: {acc.accountNumber}</p>
                <p>Type: {acc.type}</p>
              </div>
              <div className="account-balance">${acc.balance}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
