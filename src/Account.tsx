import { useTransaction } from "./Context";
import type { Account } from "./Context";
import { useNavigate } from "react-router-dom";
import { ReactVirtualizedList } from "./components/ReactVirtualizedList";
import { SEO } from "./components/SEO";

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

const accountPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Account Selection - SecureBank",
  "description": "Select your bank account to start a secure money transfer",
  "url": "https://securebank.com/",
  "isPartOf": {
    "@type": "WebSite",
    "name": "SecureBank",
    "url": "https://securebank.com"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://securebank.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Account Selection",
        "item": "https://securebank.com/"
      }
    ]
  }
};

export const AccountPage = () => {
  const navigate = useNavigate();
  const { setStepData } = useTransaction();

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
      aria-label={`Select ${account.name} account with balance $${account.balance}`}
      role="option"
    >
      <div className="account-info">
        <div className="account-details">
          <h3>{account.name}</h3>
          <p>Account: {account.accountNumber}</p>
          <p>Type: {account.type}</p>
        </div>
        <div className="account-balance" aria-label={`Balance: $${account.balance}`}>
          ${account.balance}
        </div>
      </div>
    </button>
  );

  return (
    <>
      <SEO
        title="Account Selection - SecureBank | Choose Your Account"
        description="Select your bank account to start a secure money transfer. View account balances and manage your banking needs with SecureBank."
        keywords="account selection, bank account, account balance, secure banking, money transfer"
        canonical="https://securebank.com/"
        structuredData={accountPageStructuredData}
      />
      <main className="account-page" role="main">
        <header>
          <h1>Select an Account</h1>
          <p className="page-description">
            Choose the account you'd like to transfer money from
          </p>
        </header>
        
        <section className="account-list-container" aria-label="Available accounts">
          <div role="listbox" aria-label="Account selection list">
            <ReactVirtualizedList
              items={mockAccounts}
              renderItem={renderAccountItem}
              itemHeight={itemHeight}
              containerHeight={400}
              getItemKey={(account) => account.id}
              onItemClick={handleSelectAccount}
              className="account-virtualized-list"
            />
          </div>
        </section>
        
        <footer className="page-actions">
          <button 
            className="add-account-btn"
            aria-label="Add a new bank account"
          >
            Add Account
          </button>
        </footer>
      </main>
    </>
  );
};

