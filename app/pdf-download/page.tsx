// app/pdf-download/page.tsx
import { Suspense } from 'react';
import PDFDownloadClient from './PDFDownloadClient';

export default function PDFDownloadPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PDFDownloadClient />
    </Suspense>
  );
}

// Beautiful loading state (matches your design)
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-gray-700 text-lg font-medium">Preparing your downloads...</p>
      </div>
    </div>
  );
}