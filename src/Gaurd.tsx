// src/components/TransactionGuard.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTransaction } from "./Context";

interface TransactionGuardProps {
  requiredStep: keyof ReturnType<typeof useTransaction>["transactionData"];
  children: React.ReactNode;
}

export const TransactionGuard = ({
  requiredStep,
  children,
}: TransactionGuardProps) => {
  const navigate = useNavigate();
  const { getStepData } = useTransaction();

  useEffect(() => {
    if (!getStepData(requiredStep)) {
      // If the data for the required step is missing,
      // redirect the user back to the beginning of the transaction.
      navigate("/");
    }
  }, [getStepData, navigate, requiredStep]);

  return children;
};
