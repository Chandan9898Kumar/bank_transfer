// src/pages/TransferSuccessPage.js
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Account, Payee } from "./Context";
import { useTransaction } from "./Context";
import { TransactionGuard } from "./Gaurd";
import "./Success.css";
import type { NavigateFunction } from "react-router-dom";

interface SuccessProps {
  navigate: NavigateFunction;
  resetTransaction: () => void;
  account?: Account;
  payee?: Payee;
  amount?: string;
}

const TransferSuccess = ({
  navigate,
  resetTransaction,
  account,
  amount,
  payee,
}: SuccessProps) => (
  <div className="success-page">
    <div className="success-card">
      <div className="success-icon">✓</div>
      <h2>Transfer Successful!</h2>
      <p className="success-description">
        Your money has been transferred successfully
      </p>
      <div className="transaction-summary">
        <p>From: {account?.name}</p>
        <p>To: {payee?.name}</p>
        <p className="amount">Amount: ${amount}</p>
      </div>
      <div className="success-message">
        <strong>Success:</strong> Transaction completed successfully
      </div>
      <div className="success-code">Code: TRF_SUCCESS</div>
      <div className="success-actions">
        <button className="primary-button" onClick={resetTransaction}>
          Return to Accounts
        </button>
        <button
          className="secondary-button"
          onClick={() => navigate("/transfer/amount")}
        >
          Make Another Transfer
        </button>
      </div>
    </div>
  </div>
);

const AddPayeeSuccess = ({ navigate }: Pick<SuccessProps, "navigate">) => (
  <div className="success-page">
    <div className="success-card">
      <div className="success-icon">✓</div>
      <h2>Payee Added Successfully!</h2>
      <p className="success-description">
        New payee has been added to your list
      </p>
      <div className="success-message">
        <strong>Success:</strong> Payee information saved successfully
      </div>
      <div className="success-code">Code: PAY_ADD_SUCCESS</div>
      <div className="success-actions">
        <button
          className="primary-button"
          onClick={() => navigate("/transfer/payee")}
        >
          View Payees
        </button>
        <button
          className="secondary-button"
          onClick={() => navigate("/add-payee")}
        >
          Add Another Payee
        </button>
      </div>
    </div>
  </div>
);

const EditPayeeSuccess = ({ navigate }: Pick<SuccessProps, "navigate">) => (
  <div className="success-page">
    <div className="success-card">
      <div className="success-icon">✓</div>
      <h2>Payee Updated Successfully!</h2>
      <p className="success-description">Payee information has been updated</p>
      <div className="success-message">
        <strong>Success:</strong> Changes saved successfully
      </div>
      <div className="success-code">Code: PAY_EDIT_SUCCESS</div>
      <div className="success-actions">
        <button
          className="primary-button"
          onClick={() => navigate("/transfer/payee")}
        >
          Back to Payees
        </button>
        <button className="secondary-button" onClick={() => navigate(-1)}>
          Continue Editing
        </button>
      </div>
    </div>
  </div>
);

const DeletePayeeSuccess = ({ navigate }: Pick<SuccessProps, "navigate">) => (
  <div className="success-page">
    <div className="success-card">
      <div className="success-icon">✓</div>
      <h2>Payee Deleted Successfully!</h2>
      <p className="success-description">
        Payee has been removed from your list
      </p>
      <div className="success-message">
        <strong>Success:</strong> Payee deleted successfully
      </div>
      <div className="success-code">Code: PAY_DEL_SUCCESS</div>
      <div className="success-actions">
        <button
          className="primary-button"
          onClick={() => navigate("/transfer/payee")}
        >
          Back to Payees
        </button>
        <button
          className="secondary-button"
          onClick={() => navigate("/add-payee")}
        >
          Add New Payee
        </button>
      </div>
    </div>
  </div>
);

const GeneralSuccess = ({ navigate, resetTransaction }: SuccessProps) => (
  <div className="success-page">
    <div className="success-card">
      <div className="success-icon">✓</div>
      <h2>Operation Successful!</h2>
      <p className="success-description">
        Your action has been completed successfully
      </p>
      <div className="success-message">
        <strong>Success:</strong> Operation completed successfully
      </div>
      <div className="success-code">Code: GEN_SUCCESS</div>
      <div className="success-actions">
        <button className="primary-button" onClick={resetTransaction}>
          Go Home
        </button>
        <button className="secondary-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  </div>
);

export const TransferSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { getStepData, resetTransaction } = useTransaction();
  const navigate = useNavigate();
  const account = getStepData("account") as Account;
  const payee = getStepData("payee") as Payee;
  const amount = getStepData("amount") as string;
  const successType = searchParams.get("type") || "general";

  useEffect(() => {
    if (!account || !payee || !amount) {
      // Handle the case where someone might reload this page
      navigate("/", { replace: true });
    }
  }, [account, payee, amount, navigate]);
  console.log("success page:", account, amount, payee, successType);
  return (
    <TransactionGuard requiredStep="amount">
      {successType === "transfer" && (
        <TransferSuccess
          navigate={navigate}
          resetTransaction={resetTransaction}
          account={account}
          payee={payee}
          amount={amount}
        />
      )}

      {successType === "add_payee" && <AddPayeeSuccess navigate={navigate} />}
      {successType === "edit_payee" && <EditPayeeSuccess navigate={navigate} />}
      {successType === "delete_payee" && (
        <DeletePayeeSuccess navigate={navigate} />
      )}
      {successType === "general" && (
        <GeneralSuccess
          navigate={navigate}
          resetTransaction={resetTransaction}
        />
      )}
    </TransactionGuard>
  );
};

// const Success = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const { resetTransaction } = useTransaction();

//   const successType = searchParams.get("type") || "general";

//   if (successType === "transfer") {
//     return (
//       <TransferSuccess
//         navigate={navigate}
//         resetTransaction={resetTransaction}
//       />
//     );
//   }

//   if (successType === "add_payee") {
//     return <AddPayeeSuccess navigate={navigate} />;
//   }

//   if (successType === "edit_payee") {
//     return <EditPayeeSuccess navigate={navigate} />;
//   }

//   if (successType === "delete_payee") {
//     return <DeletePayeeSuccess navigate={navigate} />;
//   }

//   return (
//     <GeneralSuccess navigate={navigate} resetTransaction={resetTransaction} />
//   );
// };

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
