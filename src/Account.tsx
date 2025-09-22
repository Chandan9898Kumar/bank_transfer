// src/pages/AccountPage.js
import { useTransaction } from "./Context";
import type { Account } from "./Context";
import { useNavigate } from "react-router-dom";
import { ReactVirtualizedList } from "./components/ReactVirtualizedList";

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
  {
    id: "123343",
    name: "John Roy king",
    accountNumber: "1234567890",
    balance: 5000,
    type: "credit",
  },
  {
    id: "122424",
    name: "John Smith raus",
    accountNumber: "1234567890",
    balance: 5000,
    type: "savings",
  },
  {
    id: "11313",
    name: "John Cena da ",
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

  const getItemHeight = () => {
    if (typeof window === "undefined") return 90;
    const width = window.innerWidth;
    if (width <= 768) return 90;
    if (width <= 1024) return 100;
    return 115;
  };
  const itemHeight = getItemHeight();

  const renderAccountItem = (account: Account) => (
    <button
      className="account-button"
      onClick={() => handleSelectAccount(account)}
    >
      <div className="account-info">
        <div className="account-details">
          <h3>{account.name}</h3>
          <p>Account: {account.accountNumber}</p>
          <p>Type: {account.type}</p>
        </div>
        <div className="account-balance">${account.balance}</div>
      </div>
    </button>
  );

  console.log("AccountPage:", rest);
  return (
    <div className="account-page">
      <h2>Select an Account</h2>
      <div className="account-list-container">
        <ReactVirtualizedList
          items={mockAccounts}
          renderItem={renderAccountItem}
          itemHeight={itemHeight}
          getItemKey={(account) => account.id}
          onItemClick={handleSelectAccount}
          className="account-virtualized-list"
        />
      </div>
      <button>Add Account</button>
    </div>
  );
};
