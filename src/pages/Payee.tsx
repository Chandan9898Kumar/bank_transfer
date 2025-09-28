// src/pages/PayeePage.js
import { useState, useEffect, useRef } from "react";
import { useTransaction } from "../contexts";
import type { Payee } from "../contexts";
import { useNavigate } from "react-router-dom";
import { TransactionGuard } from "../guards";
import { VirtualizedList } from "../components";
import "./Payee.css";
import PayeeInfo from "./PayeeInfo";

const generateMockPayees = (count: number) => {
  const names = [
    "John",
    "Jane",
    "Mike",
    "Sarah",
    "David",
    "Lisa",
    "Tom",
    "Anna",
    "Chris",
    "Emma",
  ];
  const surnames = [
    "Doe",
    "Smith",
    "Johnson",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
  ];
  const banks = [
    "ABC Bank",
    "DBMS Bank",
    "XYZ Bank",
    "First National",
    "City Bank",
    "Trust Bank",
  ];
  const streets = ["Main St", "Oak Ave", "Park Rd", "First St", "Second Ave", "Elm St"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"];

  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    name: `${names[i % names.length]} ${surnames[i % surnames.length]}`,
    bankName: banks[i % banks.length],
    address: `${100 + i} ${streets[i % streets.length]}, ${cities[i % cities.length]}`,
    account: `${1000000000 + i}`,
    mobile: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  }));
};

const mockPayees = generateMockPayees(1000);

export const PayeePage = () => {
  const [isInfo, setIsInfo] = useState(false);
  const [listHeight, setListHeight] = useState(400);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const calculateHeight = () => {
      const headerHeight = headerRef.current?.offsetHeight || 100;
      const footerHeight = footerRef.current?.offsetHeight || 80;
      const padding = 32;
      const availableHeight = window.innerHeight - headerHeight - footerHeight - padding;
      setListHeight(Math.max(300, availableHeight));
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    window.addEventListener('orientationchange', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
      window.removeEventListener('orientationchange', calculateHeight);
    };
  }, []);

  if (isInfo) {
    return (
      <PayeeInfo selectpayee={selectedPayee} onClick={() => setIsInfo(false)} />
    );
  }
  return (
    <TransactionGuard requiredStep="account">
      <main className="payee-page-container" role="main">
        <header className="payee-header" ref={headerRef}>
          <h1 id="payee-title">
            Select a Payee for Account{" "}
            {selectedAccount &&
            typeof selectedAccount === "object" &&
            "name" in selectedAccount
              ? selectedAccount.name
              : ""}
          </h1>
          <p className="sr-only">Choose a recipient from the list below to transfer money to</p>
        </header>
        
        <section className="payee-list-container" aria-labelledby="payee-title">
          <div role="listbox" aria-label="Available payees for money transfer">
            <VirtualizedList
              items={mockPayees}
              itemHeight={80}
              containerHeight={listHeight}
              className="payee-list"
              getItemKey={(payee) => payee.id}
              renderItem={(payee) => (
                <div className="payee-item" role="option" tabIndex={0}>
                  <button
                    className="payee-button"
                    onClick={() => handleSelectPayee(payee)}
                    aria-label={`Select ${payee.name} at ${payee.bankName} for money transfer`}
                    type="button"
                  >
                    <div className="payee-info">
                      <div className="payee-details">
                        <h3>{payee.name}</h3>
                      </div>
                      <div className="bank-name" aria-label={`Bank: ${payee.bankName}`}>{payee.bankName}</div>
                    </div>
                  </button>
                  <button 
                    className="info-button" 
                    onClick={() => handleItem(payee)}
                    aria-label={`View detailed information for ${payee.name}`}
                    type="button"
                  >
                    <span aria-hidden="true">Info</span>
                    <span className="sr-only">View details</span>
                  </button>
                </div>
              )}
            />
          </div>
        </section>

        <footer className="payee-footer" ref={footerRef}>
          <button 
            className="add-payee-button" 
            onClick={() => navigate('/add-payee')}
            aria-label="Add a new payee to your contact list"
            type="button"
          >
            Add Payee
          </button>
        </footer>
      </main>
    </TransactionGuard>
  );
};
