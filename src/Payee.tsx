// src/pages/PayeePage.js
import { useState, useEffect, useRef } from "react";
import { useTransaction } from "./Context";
import type { Payee } from "./Context";
import { useNavigate } from "react-router-dom";
import { TransactionGuard } from "./Gaurd";
import { VirtualizedList } from "./components/VirtualizedList";
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

  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    name: `${names[i % names.length]} ${surnames[i % surnames.length]}`,
    bankName: banks[i % banks.length],
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
      <div className="payee-page-container">
        <div className="payee-header" ref={headerRef}>
          <h2>
            Select a Payee for Account{" "}
            {selectedAccount &&
            typeof selectedAccount === "object" &&
            "name" in selectedAccount
              ? selectedAccount.name
              : ""}
          </h2>
        </div>
        
        <div className="payee-list-container">
          <VirtualizedList
            items={mockPayees}
            itemHeight={80}
            containerHeight={listHeight}
            className="payee-list"
            getItemKey={(payee) => payee.id}
            renderItem={(payee) => (
              <div className="payee-item">
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
                <button className="info-button" onClick={() => handleItem(payee)}>
                  Info
                </button>
              </div>
            )}
          />
        </div>

        <div className="payee-footer" ref={footerRef}>
          <button className="add-payee-button" onClick={() => navigate('/add-payee')}>
            Add Payee
          </button>
        </div>
      </div>
    </TransactionGuard>
  );
};
