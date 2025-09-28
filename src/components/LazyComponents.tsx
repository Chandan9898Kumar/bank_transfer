import { lazy, Suspense } from 'react';

const LoadingSpinner = () => (
  <div className="loading-spinner" role="status" aria-label="Loading">
    <div className="spinner"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export const LazyAccountPage = lazy(() => 
  import('../Account').then(module => ({ default: module.AccountPage }))
);

export const LazyPayeePage = lazy(() => 
  import('../Payee').then(module => ({ default: module.PayeePage }))
);

export const LazyTransferAmountPage = lazy(() => 
  import('../Amount').then(module => ({ default: module.TransferAmountPage }))
);

export const LazyTransferSuccessPage = lazy(() => 
  import('../Success').then(module => ({ default: module.TransferSuccessPage }))
);

export const LazyErrorPage = lazy(() => 
  import('../Error').then(module => ({ default: module.default || module }))
);

export const withSuspense = (Component: React.ComponentType) => (props: any) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component {...props} />
  </Suspense>
);