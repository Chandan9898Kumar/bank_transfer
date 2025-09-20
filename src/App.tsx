import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransactionProvider } from "./Context";
import { AccountPage } from "./Account";
import { PayeePage } from "./Payee";
import { TransferAmountPage } from "./Amount";
import { TransferSuccessPage } from "./Success";
import "./App.css";
// import { NotFound } from './pages/NotFound';

// src/App.js
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <TransactionProvider>
          <Routes>
            <Route path="/" element={<AccountPage />} />
            <Route path="/transfer/payee" element={<PayeePage />} />
            <Route path="/transfer/amount" element={<TransferAmountPage />} />
            <Route path="/transfer/success" element={<TransferSuccessPage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </TransactionProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
