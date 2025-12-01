// app/pdf-download/PDFDownloadClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Download, CheckCircle, FileText, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface PurchasedPDF {
  id: string;
  product_title: string;
  pdf_url: string;
  category: string;
}

export default function PDFDownloadClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfProducts, setPdfProducts] = useState<PurchasedPDF[]>([]);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!orderId) {
      setError('Invalid order link');
      setLoading(false);
      return;
    }
    fetchPDFProducts();
  }, [orderId]);

  useEffect(() => {
    if (pdfProducts.length > 0 && !downloadStarted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !downloadStarted) {
      startDownloads();
    }
  }, [countdown, pdfProducts.length, downloadStarted]);

  const fetchPDFProducts = async () => {
    try {
      const { data: items, error } = await supabase
        .from('order_items')
        .select('id, product_id, product_title, product_image, category')
        .eq('order_id', orderId!)
        .eq('category', 'PDF');

      if (error) throw error;
      if (!items || items.length === 0) {
        router.replace(`/order-success?orderId=${orderId}`);
        return;
      }

      const pdfs: PurchasedPDF[] = [];

      for (const item of items) {
        let pdfUrl = null;

        // Try to extract UUID from image URL
        const uuidMatch = item.product_image?.match(/([a-f0-9-]{36})/i);
        const uuid = uuidMatch?.[0] || item.product_id;

        if (uuid) {
          const { data } = await supabase
            .from('products')
            .select('pdf_url')
            .eq('id', uuid)
            .single();

          if (data?.pdf_url) pdfUrl = data.pdf_url;
        }

        // Fallback: search by title
        if (!pdfUrl) {
          const { data } = await supabase
            .from('products')
            .select('pdf_url')
            .eq('title', item.product_title)
            .single();

          if (data?.pdf_url) pdfUrl = data.pdf_url;
        }

        if (pdfUrl) {
          pdfs.push({
            id: item.id,
            product_title: item.product_title,
            pdf_url: pdfUrl,
            category: item.category,
          });
        }
      }

      setPdfProducts(pdfs);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load your downloads');
      setLoading(false);
    }
  };

  const downloadPDF = async (url: string, title: string) => {
    try {
      let downloadUrl = url;

      if (url.includes('supabase.co/storage')) {
        const path = url.split('/storage/v1/object/public/')[1];
        if (path) {
          const [bucket, ...fileParts] = path.split('/');
          const filePath = fileParts.join('/');

          const { data } = await supabase.storage
            .from(bucket)
            .createSignedUrl(filePath, 3600, { download: true });

          if (data?.signedUrl) downloadUrl = data.signedUrl;
        }
      }

      const res = await fetch(downloadUrl);
      if (!res.ok) throw new Error('Download failed');

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      a.click();

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
        a.remove();
      }, 100);
    } catch (err) {
      window.open(url, '_blank');
    }
  };

  const startDownloads = async () => {
    setDownloadStarted(true);
    for (const pdf of pdfProducts) {
      await downloadPDF(pdf.pdf_url, pdf.product_title);
      await new Promise(r => setTimeout(r, 800));
    }
  };

  if (loading) return <LoadingFallback />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Download Ready!</h1>
          <p className="text-xl text-gray-600">
            {pdfProducts.length} PDF{pdfProducts.length > 1 ? 's' : ''} will start downloading automatically
          </p>
        </div>

        {!downloadStarted ? (
          <div className="text-center bg-white rounded-2xl shadow-xl p-10 mb-8">
            <Download className="w-20 h-20 text-blue-600 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold mb-4">Starting in {countdown}...</h2>
            <div className="w-64 h-3 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-1000"
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center bg-white rounded-2xl shadow-xl p-10 mb-8">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-2">Downloads Started!</h2>
            <p className="text-gray-600">Check your downloads folder</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            Your Files
          </h3>
          {pdfProducts.map((pdf) => (
            <div key={pdf.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{pdf.product_title}</h4>
                  <p className="text-sm text-gray-600">PDF Document</p>
                </div>
              </div>
              <button
                onClick={() => downloadPDF(pdf.pdf_url, pdf.product_title)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/orders')}
            className="flex-1 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition"
          >
            View My Orders
          </button>
          <button
            onClick={() => router.push('/products')}
            className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable components
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-6" />
        <p className="text-xl text-gray-700">Preparing your downloads...</p>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 text-center border border-red-200">
        <AlertCircle className="w-20 h-20 text-red-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Download Failed</h2>
        <p className="text-gray-600 mb-8">{message}</p>
        <button
          onClick={() => router.push('/orders')}
          className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800"
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
}