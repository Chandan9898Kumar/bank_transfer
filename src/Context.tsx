// src/context/TransactionContext.js
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Account {
  id: string;
  name: string;
  accountNumber: string | number;
  balance: string | number;
  type: "savings" | "current" | "credit";
}

export interface Payee {
  id: string;
  name: string;
  bankName: string;
}

export interface TransferData {
  account?: Account;
  payee?: Payee;
  amount?: number;
  description?: string;
  reference?: string;
  pin?: string;
  isCompleted?: boolean;
}

interface TransfercontextType {
  transactionData: TransferData;
  setStepData: (step: keyof TransferData, data: TransferData[keyof TransferData]) => void;
  getStepData: (step: keyof TransferData) => TransferData[keyof TransferData];
  resetTransaction: () => void;
}

interface TransactionProviderProps {
  children: React.ReactNode;
}

const TransactionContext = createContext<TransfercontextType | undefined>(
  undefined
);

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [transactionData, setTransactionData] = useState<TransferData>({});
  const navigate = useNavigate();

  const setStepData = (step: keyof TransferData, data: TransferData[keyof TransferData]) => {
    setTransactionData((prev) => ({ ...prev, [step]: data }));
  };

  const getStepData = (step: keyof TransferData) => transactionData[step];

  const resetTransaction = () => {
    setTransactionData({});
    navigate("/");
  };

  return (
    <TransactionContext.Provider
      value={{ transactionData, setStepData, getStepData, resetTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
