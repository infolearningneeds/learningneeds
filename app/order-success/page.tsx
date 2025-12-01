import { Suspense } from 'react';
import OrderSuccessClient from './OrderSuccessClient';

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OrderSuccessClient />
    </Suspense>
  );
}
// Simple loading UI
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading order details...</p>
      </div>
    </div>
  );
}