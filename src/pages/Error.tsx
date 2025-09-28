import { useSearchParams, useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";
import { useTransaction } from "../contexts";
import "./Error.css";

interface ErrorProps {
  navigate: NavigateFunction;
  resetTransaction: () => void;
}

const TransferError = ({ navigate, resetTransaction }: ErrorProps) => (
  <main className="error-page" role="main">
    <div className="error-container" role="alert" aria-live="assertive">
      <div className="error-icon" aria-hidden="true">💸</div>
      <h1 className="error-title" id="error-title">Transfer Failed</h1>
      <p className="error-description" aria-describedby="error-title">
        Your money transfer could not be completed
      </p>
      <div className="error-message" role="status">
        <strong>Error:</strong> Insufficient funds or network error occurred
      </div>
      <div className="error-code" aria-label="Error reference code">Code: TRF_001</div>
      <nav className="error-actions" aria-label="Error recovery options">
        <button
          className="primary-button"
          onClick={() => navigate("/transfer/amount")}
          aria-label="Return to transfer amount page to try again"
          type="button"
        >
          Try Again
        </button>
        <button 
          className="secondary-button" 
          onClick={resetTransaction}
          aria-label="Return to home page"
          type="button"
        >
          Go Home
        </button>
      </nav>
    </div>
  </main>
);

const AddPayeeError = ({ navigate }: Pick<ErrorProps, "navigate">) => (
  <div className="error-page">
    <div className="error-container">
      <div className="error-icon">➕</div>
      <h1 className="error-title">Add Payee Failed</h1>
      <p className="error-description">
        Could not add the new payee to your list
      </p>
      <div className="error-message">
        <strong>Error:</strong> Invalid payee details or duplicate entry
      </div>
      <div className="error-code">Code: PAY_001</div>
      <div className="error-actions">
        <button
          className="primary-button"
          onClick={() => navigate("/add-payee")}
        >
          Try Again
        </button>
        <button
          className="secondary-button"
          onClick={() => navigate("/transfer/payee")}
        >
          Back to Payees
        </button>
      </div>
    </div>
  </div>
);

const EditPayeeError = ({ navigate }: Pick<ErrorProps, "navigate">) => (
  <div className="error-page">
    <div className="error-container">
      <div className="error-icon">✏️</div>
      <h1 className="error-title">Edit Payee Failed</h1>
      <p className="error-description">
        Could not update the payee information
      </p>
      <div className="error-message">
        <strong>Error:</strong> Validation failed or payee not found
      </div>
      <div className="error-code">Code: PAY_002</div>
      <div className="error-actions">
        <button className="primary-button" onClick={() => navigate(-1)}>
          Try Again
        </button>
        <button
          className="secondary-button"
          onClick={() => navigate("/transfer/payee")}
        >
          Back to Payees
        </button>
      </div>
    </div>
  </div>
);

const DeletePayeeError = ({ navigate }: Pick<ErrorProps, "navigate">) => (
  <div className="error-page">
    <div className="error-container">
      <div className="error-icon">🗑️</div>
      <h1 className="error-title">Delete Payee Failed</h1>
      <p className="error-description">
        Could not remove the payee from your list
      </p>
      <div className="error-message">
        <strong>Error:</strong> Payee has pending transactions or system error
      </div>
      <div className="error-code">Code: PAY_003</div>
      <div className="error-actions">
        <button className="primary-button" onClick={() => navigate(-1)}>
          Try Again
        </button>
        <button
          className="secondary-button"
          onClick={() => navigate("/transfer/payee")}
        >
          Back to Payees
        </button>
      </div>
    </div>
  </div>
);

const GeneralError = ({ navigate, resetTransaction }: ErrorProps) => (
  <div className="error-page">
    <div className="error-container">
      <div className="error-icon">❌</div>
      <h1 className="error-title">Something Went Wrong</h1>
      <p className="error-description">An unexpected error occurred</p>
      <div className="error-message">
        <strong>Error:</strong> Please try again or contact support
      </div>
      <div className="error-code">Code: GEN_001</div>
      <div className="error-actions">
        <button className="primary-button" onClick={() => navigate(-1)}>
          Try Again
        </button>
        <button className="secondary-button" onClick={resetTransaction}>
          Go Home
        </button>
      </div>
    </div>
  </div>
);

const Error = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetTransaction } = useTransaction();

  const errorType = searchParams.get("type") || "general";

  if (errorType === "transfer") {
    return (
      <TransferError navigate={navigate} resetTransaction={resetTransaction} />
    );
  }

  if (errorType === "add_payee") {
    return <AddPayeeError navigate={navigate} />;
  }

  if (errorType === "edit_payee") {
    return <EditPayeeError navigate={navigate} />;
  }

  if (errorType === "delete_payee") {
    return <DeletePayeeError navigate={navigate} />;
  }

  return (
    <GeneralError navigate={navigate} resetTransaction={resetTransaction} />
  );
};

export default Error;
