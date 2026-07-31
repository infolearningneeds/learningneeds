/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

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

export default function PDFDownloadPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfProducts, setPdfProducts] = useState<PurchasedPDF[]>([]);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (orderId) {
      fetchPDFProducts();
    } else {
      setError('No order found');
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (pdfProducts.length > 0 && !downloadStarted && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !downloadStarted) {
      startDownloads();
    }
  }, [countdown, pdfProducts, downloadStarted]);

  const fetchPDFProducts = async () => {
    try {
      console.log('Fetching PDF products for order:', orderId);
      
      // Fetch order items that are PDFs
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId)
        .eq('category', 'PDF');

      if (itemsError) {
        console.error('Error fetching order items:', itemsError);
        throw itemsError;
      }

      console.log('Order items found:', orderItems);

      if (!orderItems || orderItems.length === 0) {
        console.log('No PDF products found, redirecting to order success');
        router.push(`/order-success?orderId=${orderId}`);
        return;
      }

      // Handle both UUID and numeric product_id formats
      const pdfData: PurchasedPDF[] = [];
      
      for (const item of orderItems) {
        console.log('Processing item:', item.product_title);
        console.log('Product ID from order_items:', item.product_id);
        
        let productData = null;
        let productError = null;
        
        // Method 1: Try extracting UUID from product_image URL (most reliable)
        if (item.product_image) {
          const imageUrl = item.product_image;
          const uuidMatch = imageUrl?.match(/\/([a-f0-9-]{36})\//i);
          const productUuid = uuidMatch ? uuidMatch[1] : null;
          
          if (productUuid) {
            console.log('Extracted UUID from image:', productUuid);
            
            const result = await supabase
              .from('products')
              .select('pdf_url')
              .eq('id', productUuid)
              .maybeSingle();
            
            productData = result.data;
            productError = result.error;
          }
        }
        
        // Method 2: If product_id looks like a UUID, try using it directly
        if (!productData && typeof item.product_id === 'string' && item.product_id.includes('-')) {
          console.log('Trying product_id as UUID:', item.product_id);
          
          const result = await supabase
            .from('products')
            .select('pdf_url')
            .eq('id', item.product_id)
            .maybeSingle();
          
          productData = result.data;
          productError = result.error;
        }
        
        // Method 3: Search by title as fallback
        if (!productData) {
          console.log('Searching by title:', item.product_title);
          
          const result = await supabase
            .from('products')
            .select('pdf_url')
            .eq('title', item.product_title)
            .maybeSingle();
          
          productData = result.data;
          productError = result.error;
        }
        
        console.log('Product data:', productData);
        console.log('Product error:', productError);
        
        if (productData?.pdf_url) {
          pdfData.push({
            id: item.id,
            product_title: item.product_title,
            pdf_url: productData.pdf_url,
            category: item.category
          });
        } else {
          console.error('Could not find PDF for:', item.product_title);
        }
      }

      console.log('Final PDF data:', pdfData);

      setPdfProducts(pdfData);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching PDF products:', err);
      setError('Failed to load download information');
      setLoading(false);
    }
  };

  const startDownloads = async () => {
    console.log('Starting automatic downloads...');
    setDownloadStarted(true);

    for (let i = 0; i < pdfProducts.length; i++) {
      const pdf = pdfProducts[i];
      console.log(`Downloading ${i + 1}/${pdfProducts.length}:`, pdf.product_title);
      
      await downloadPDF(pdf.pdf_url, pdf.product_title);
      
      // Wait between downloads to avoid browser blocking
      if (i < pdfProducts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log('All downloads initiated');
  };

  const downloadPDF = async (pdfUrl: string, fileName: string) => {
    console.log('Download function called for:', fileName);
    console.log('PDF URL:', pdfUrl);
    
    try {
      let downloadUrl = pdfUrl;
      
      // For Supabase storage URLs, always use signed URLs for better security
      if (pdfUrl.includes('supabase.co/storage')) {
        console.log('Supabase storage URL detected, creating signed URL...');
        
        // Extract the file path from the URL
        const urlParts = pdfUrl.split('/storage/v1/object/public/');
        if (urlParts[1]) {
          const fullPath = urlParts[1];
          const pathParts = fullPath.split('/');
          const bucketName = pathParts[0];
          const filePath = pathParts.slice(1).join('/');
          
          console.log('Bucket:', bucketName);
          console.log('File path:', filePath);
          
          // Create signed URL with download transformation
          const { data: signedUrlData, error: signedError } = await supabase
            .storage
            .from(bucketName)
            .createSignedUrl(filePath, 3600, {
              download: true // Force download instead of viewing
            });
          
          if (signedError) {
            console.error('Signed URL error:', signedError);
            console.error('This might be due to RLS policies - check Storage Policies in Supabase');
            
            // Try public URL anyway as fallback
            downloadUrl = pdfUrl;
          } else if (signedUrlData?.signedUrl) {
            downloadUrl = signedUrlData.signedUrl;
            console.log('Successfully created signed URL');
          }
        }
      }
      
      console.log('Downloading from:', downloadUrl);
      
      // Fetch and download
      const response = await fetch(downloadUrl);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      console.log('Blob created - Size:', blob.size, 'Type:', blob.type);
      
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }
      
      // Ensure proper PDF mime type
      const pdfBlob = blob.type.includes('pdf') || blob.type === 'application/pdf'
        ? blob 
        : new Blob([blob], { type: 'application/pdf' });
      
      // Create blob URL and download
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${fileName.replace(/[^a-z0-9\s]/gi, '_')}.pdf`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      console.log('Download triggered successfully');
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
      
    } catch (err) {
      console.error('Download failed:', err);
      
      // Last resort: Open signed URL in new tab
      try {
        console.log('Attempting to open in new tab...');
        
        // Try to create a signed URL one more time for viewing
        if (pdfUrl.includes('supabase.co/storage')) {
          const urlParts = pdfUrl.split('/storage/v1/object/public/');
          if (urlParts[1]) {
            const fullPath = urlParts[1];
            const pathParts = fullPath.split('/');
            const bucketName = pathParts[0];
            const filePath = pathParts.slice(1).join('/');
            
            const { data: signedUrlData } = await supabase
              .storage
              .from(bucketName)
              .createSignedUrl(filePath, 3600);
            
            if (signedUrlData?.signedUrl) {
              window.open(signedUrlData.signedUrl, '_blank');
              console.log('Opened signed URL in new tab');
              return;
            }
          }
        }
        
        // If all else fails, try original URL
        window.open(pdfUrl, '_blank');
      } catch (err2) {
        console.error('All download methods failed:', err2);
        alert('Unable to download PDF. Please contact support or try again later.');
      }
    }
  };

  const handleManualDownload = (pdfUrl: string, fileName: string) => {
    console.log('Manual download triggered for:', fileName);
    downloadPDF(pdfUrl, fileName);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600 text-lg">Preparing your downloads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-red-200">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Download Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/orders')}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 text-lg">
            Your digital products are ready
          </p>
        </div>

        {/* Download Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border border-gray-200">
          {!downloadStarted ? (
            <div className="text-center">
              <Download className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your download will start in {countdown} seconds...
              </h2>
              <p className="text-gray-600 mb-6">
                {pdfProducts.length === 1 
                  ? 'Your PDF will be downloaded automatically'
                  : `${pdfProducts.length} PDFs will be downloaded automatically`}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Downloads Started!
              </h2>
              <p className="text-gray-600">
                Check your browser's download folder
              </p>
            </div>
          )}
        </div>

        {/* PDF Products List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Your Downloads
          </h3>
          <div className="space-y-4">
            {pdfProducts.map((pdf) => (
              <div 
                key={pdf.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{pdf.product_title}</h4>
                    <p className="text-sm text-gray-600">PDF Document</p>
                  </div>
                </div>
                <button
                  onClick={() => handleManualDownload(pdf.pdf_url, pdf.product_title)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Downloads are available immediately after purchase</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>You can re-download your purchases anytime from your account</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>If automatic download doesn't start, use the manual download buttons above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Check your browser's download folder or download history</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/orders')}
            className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            View My Orders
          </button>
          <button
            onClick={() => router.push('/products')}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Continue Shopping
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Need help with your download?</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}