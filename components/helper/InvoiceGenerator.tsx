/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { FileText, Download, Printer, X } from 'lucide-react';

interface InvoiceProps {
  order: any;
  onClose: () => void;
}

const InvoiceGenerator: React.FC<InvoiceProps> = ({ order, onClose }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    if (invoiceRef.current) {
      window.print();
    }
  };

  const downloadInvoice = () => {
    generatePDF();
  };

  const calculateSubtotal = () => {
    return order.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Action Bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10 no-print">
          <h2 className="text-xl font-bold text-gray-900">Invoice</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={downloadInvoice}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={generatePDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div ref={invoiceRef} className="p-8 print-content">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
              <div className="text-sm text-gray-600">
                <p className="font-semibold">Learning Needs</p>
                <p>123 Business Street</p>
                <p>City, State 123456</p>
                <p>Email: contact@yourcompany.com</p>
                <p>Phone: +91 1234567890</p>
                <p className="mt-2">GSTIN: 22AAAAA0000A1Z5</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg inline-block mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <div className="text-sm">
                <p className="font-semibold">Invoice #: INV-{order.id.slice(0, 8).toUpperCase()}</p>
                <p>Date: {new Date(order.created_at).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full inline-block">
                  {order.payment_status.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Bill To & Ship To */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase">Bill To:</h3>
              <div className="text-sm text-gray-700">
                <p className="font-semibold">{order.address?.full_name}</p>
                <p>{order.address?.email}</p>
                <p>{order.address?.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase">Ship To:</h3>
              <div className="text-sm text-gray-700">
                <p className="font-semibold">{order.address?.full_name}</p>
                <p>{order.address?.address_line1}</p>
                {order.address?.address_line2 && <p>{order.address.address_line2}</p>}
                <p>{order.address?.city}, {order.address?.state} {order.address?.pincode}</p>
                <p>{order.address?.country}</p>
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="text-left py-3 px-2 text-sm font-bold text-gray-900">Item</th>
                  <th className="text-left py-3 px-2 text-sm font-bold text-gray-900">Category</th>
                  <th className="text-center py-3 px-2 text-sm font-bold text-gray-900">Qty</th>
                  <th className="text-right py-3 px-2 text-sm font-bold text-gray-900">Price</th>
                  <th className="text-right py-3 px-2 text-sm font-bold text-gray-900">Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: any, index: number) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-2 text-sm text-gray-700">
                      <p className="font-semibold">{item.product_title}</p>
                      {item.variant && (
                        <p className="text-xs text-gray-500">{item.variant}</p>
                      )}
                    </td>
                    <td className="py-4 px-2 text-sm text-gray-600">{item.category}</td>
                    <td className="py-4 px-2 text-sm text-gray-700 text-center">{item.quantity}</td>
                    <td className="py-4 px-2 text-sm text-gray-700 text-right">₹{item.price.toFixed(2)}</td>
                    <td className="py-4 px-2 text-sm text-gray-900 font-semibold text-right">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900 font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-600">GST (18%):</span>
                <span className="text-gray-900 font-semibold">₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 text-lg border-t-2 border-gray-900 mt-2">
                <span className="font-bold text-gray-900">Total:</span>
                <span className="font-bold text-gray-900">₹{order.total_amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Payment Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Payment Method:</p>
                <p className="font-semibold text-gray-900 uppercase">{order.payment_method}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Status:</p>
                <p className="font-semibold text-gray-900 uppercase">{order.payment_status}</p>
              </div>
              {order.payment?.transaction_id && (
                <div className="col-span-2">
                  <p className="text-gray-600">Transaction ID:</p>
                  <p className="font-semibold text-gray-900">{order.payment.transaction_id}</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Thank you for your business!</p>
            <p className="text-xs text-gray-500">
              This is a computer-generated invoice and does not require a signature.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              For any queries, please contact us at contact@yourcompany.com
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content,
          .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          @page {
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
};

export default InvoiceGenerator;