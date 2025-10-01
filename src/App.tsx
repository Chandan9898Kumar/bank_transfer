import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy } from 'react';
import { TransactionProvider } from "./contexts";
import { ErrorBoundary, SEO } from "./components";
import "./styles/App.css";

// Direct lazy loading in App.tsx
const AccountPage = lazy(() => import('./pages/Account').then(m => ({ default: m.AccountPage })));
const PayeePage = lazy(() => import('./pages/Payee').then(m => ({ default: m.PayeePage })));
const AmountPage = lazy(() => import('./pages/Amount').then(m => ({ default: m.TransferAmountPage })));
const SuccessPage = lazy(() => import('./pages/Success').then(m => ({ default: m.TransferSuccessPage })));
const ErrorPage = lazy(() => import('./pages/Error').then(m => ({ default: m.default })));
const AddPayeePage = lazy(() => import('./pages/AddPayee').then(m => ({ default: m.AddPayeePage })));

// Loading component
const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <div className="loader-spinner"></div>
    <span className="sr-only">Loading page...</span>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="app">
          <SEO />
          <BrowserRouter>
            <TransactionProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<AccountPage />} />
                  <Route path="/transfer/payee" element={<PayeePage />} />
                  <Route path="/transfer/amount" element={<AmountPage />} />
                  <Route path="/transfer/success" element={<SuccessPage />} />
                  <Route path="/transfer/error" element={<ErrorPage />} />
                  <Route path="/add-payee" element={<AddPayeePage />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </Suspense>
            </TransactionProvider>
          </BrowserRouter>
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
