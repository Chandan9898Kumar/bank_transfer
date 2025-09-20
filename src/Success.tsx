// src/pages/TransferSuccessPage.js
import { useTransaction } from "./Context";
import { useNavigate } from "react-router-dom";
import { TransactionGuard } from "./Gaurd";
import { useEffect } from "react";
import "./Success.css";

import type { Account, Payee } from "./Context";

export const TransferSuccessPage = () => {
  const { getStepData, resetTransaction } = useTransaction();
  const navigate = useNavigate();
  const account = getStepData("account") as Account;
  const payee = getStepData("payee") as Payee;
  const amount = getStepData("amount") as string;

  useEffect(() => {
    if (!account || !payee || !amount) {
      // Handle the case where someone might reload this page
      navigate("/",{ replace: true });
    }
  }, [account, payee, amount, navigate]);
  console.log("success page:", account, amount, payee);
  return (
    <TransactionGuard requiredStep="amount">
      <div className="success-page">
        <div className="checkmark">✓</div>
        <h2>Transfer Successful!</h2>
        <div className="transaction-summary">
          <p>From: {account?.name}</p>
          <p>To: {payee?.name}</p>
          <p className="amount">Amount: ${amount}</p>
        </div>
        <button className="return-button" onClick={resetTransaction}>
          Return to Accounts
        </button>
      </div>
    </TransactionGuard>
  );
};

// export const TransferSuccessPage = () => {
//   const { getStepData, resetTransaction } = useTransaction();
//   const navigate = useNavigate();
//   const account = getStepData("account") as Account;
//   const payee = getStepData("payee") as Payee;
//   const amount = getStepData("amount") as string;

//   // Use useEffect to reset the transaction state on mount
//   useEffect(() => {
//     // Check if the necessary data exists before resetting.
//     // This handles a page refresh on the success page.
//     if (!account || !payee || !amount) {
//       navigate("/", { replace: true });
//     }

//     // Call the reset function immediately after showing the success message.
//     const timer = setTimeout(() => {
//       resetTransaction();
//       navigate("/", { replace: true });
//     }, 5000); // Redirect to accounts page after 5 seconds

//     // Optionally, you can clear the state immediately.
//     // resetTransaction();

//     return () => clearTimeout(timer);
//   }, [resetTransaction, navigate, account, payee, amount]);

//   return (
//     <TransactionGuard requiredStep="amount">
//       <div>
//         <h2>Transfer Successful!</h2>
//         <p>From: {account?.name}</p>
//         <p>To: {payee?.name}</p>
//         <p>Amount: ${amount}</p>
//         <button onClick={resetTransaction}>Return to Accounts</button>
//       </div>
//     </TransactionGuard>
//   );
// };
