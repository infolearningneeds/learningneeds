// File: lib/orderUtils.ts

interface CartItem {
  id: number;
  title: string;
  image: string;
  discountPrice: number;
  originalPrice: number;
  quantity: number;
  category: string;
}

/**
 * Check if order contains only PDF products
 */
export function hasOnlyPDFProducts(items: CartItem[]): boolean {
  return items.length > 0 && items.every(item => item.category === 'PDF');
}

/**
 * Check if order contains any PDF products
 */
export function hasPDFProducts(items: CartItem[]): boolean {
  return items.some(item => item.category === 'PDF');
}

/**
 * Separate PDF and physical products
 */
export function separateProducts(items: CartItem[]) {
  const pdfProducts = items.filter(item => item.category === 'PDF');
  const physicalProducts = items.filter(item => item.category !== 'PDF');
  
  return {
    pdfProducts,
    physicalProducts,
    hasPDFOnly: pdfProducts.length > 0 && physicalProducts.length === 0,
    hasPhysicalOnly: physicalProducts.length > 0 && pdfProducts.length === 0,
    hasMixed: pdfProducts.length > 0 && physicalProducts.length > 0
  };
}

/**
 * Get the redirect URL after successful payment
 * @param orderId - The order ID
 * @param items - Cart items
 * @returns Redirect URL
 */
export function getOrderSuccessRedirect(orderId: string, items: CartItem[]): string {
  const onlyPDFs = hasOnlyPDFProducts(items);
  
  if (onlyPDFs) {
    // Redirect to PDF download page
    return `/pdf-download?orderId=${orderId}`;
  } else {
    // Redirect to regular order success page
    return `/order-success?orderId=${orderId}`;
  }
}

/**
 * Calculate delivery charge for physical products only
 */
export function calculateDeliveryCharge(items: CartItem[], threshold: number = 500): number {
  const physicalItems = items.filter(item => item.category !== 'PDF');
  
  if (physicalItems.length === 0) {
    return 0; // No delivery charge for PDF-only orders
  }
  
  const physicalTotal = physicalItems.reduce(
    (sum, item) => sum + (item.discountPrice * item.quantity), 
    0
  );
  
  return physicalTotal >= threshold ? 0 : 50;
}

/**
 * Format order items for database insertion
 */
export function formatOrderItems(items: CartItem[], productIdMap: Record<number, string>) {
  return items.map(item => ({
    product_id: productIdMap[item.id], // Map to actual Supabase product ID
    product_title: item.title,
    product_image: item.image,
    quantity: item.category === 'PDF' ? 1 : item.quantity, // PDFs always quantity 1
    price: item.discountPrice,
    category: item.category
  }));
}