import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { TransactionProvider } from "./contexts";
import { 
  ErrorBoundary,
  SEO,
  LazyAccountPage, 
  LazyPayeePage, 
  LazyTransferAmountPage, 
  LazyTransferSuccessPage, 
  LazyErrorPage,
  withSuspense 
} from "./components";
import "./styles/App.css";

const AccountPageWithSuspense = withSuspense(LazyAccountPage);
const PayeePageWithSuspense = withSuspense(LazyPayeePage);
const TransferAmountPageWithSuspense = withSuspense(LazyTransferAmountPage);
const TransferSuccessPageWithSuspense = withSuspense(LazyTransferSuccessPage);
const ErrorPageWithSuspense = withSuspense(LazyErrorPage);

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="app">
          <SEO />
          <BrowserRouter>
            <TransactionProvider>
              <Routes>
                <Route path="/" element={<AccountPageWithSuspense />} />
                <Route path="/transfer/payee" element={<PayeePageWithSuspense />} />
                <Route path="/transfer/amount" element={<TransferAmountPageWithSuspense />} />
                <Route path="/transfer/success" element={<TransferSuccessPageWithSuspense />} />
                <Route path="/transfer/error" element={<ErrorPageWithSuspense />} />
                <Route path="*" element={<ErrorPageWithSuspense />} />
              </Routes>
            </TransactionProvider>
          </BrowserRouter>
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
