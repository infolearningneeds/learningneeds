/* eslint-disable @typescript-eslint/no-explicit-any */
// File: app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with service role key for admin access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// GET - Fetch all products with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const category = searchParams.get('category');
    const available = searchParams.get('available');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    // Build query
    let query = supabaseAdmin
      .from('products')
      .select(`
        *,
        product_images (
          id,
          image_url,
          display_order
        )
      `)
      .order('created_at', { ascending: false });

    // Apply filters
    if (productId) {
      query = query.eq('id', productId);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (available !== null && available !== undefined) {
      query = query.eq('available', available === 'true');
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    if (offset) {
      query = query.range(parseInt(offset), parseInt(offset) + parseInt(limit || '10') - 1);
    }

    const { data: products, error } = await query;

    if (error) throw error;

    // Sort images by display_order
    const productsWithSortedImages = products?.map(product => ({
      ...product,
      product_images: product.product_images?.sort(
        (a: any, b: any) => a.display_order - b.display_order
      ) || []
    }));

    return NextResponse.json({
      success: true,
      data: productsWithSortedImages,
      count: productsWithSortedImages?.length || 0,
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new product with images and PDF
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract product data
    const productData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      original_price: parseFloat(formData.get('originalPrice') as string),
      discount_price: formData.get('discountPrice') 
        ? parseFloat(formData.get('discountPrice') as string) 
        : null,
      available: formData.get('available') === 'true',
      stock_quantity: formData.get('stockQuantity') 
        ? parseInt(formData.get('stockQuantity') as string) 
        : null,
    };

    // Validate required fields
    if (!productData.title || !productData.description || !productData.category) {
      return NextResponse.json(
        { success: false, error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    // Insert product
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (productError) throw productError;

    // Upload images
    const imageUrls: string[] = [];
    const images = formData.getAll('images') as File[];

    for (let i = 0; i < images.length && i < 4; i++) {
      const image = images[i];
      const fileExt = image.name.split('.').pop();
      const fileName = `${product.id}/${Date.now()}-${i}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabaseAdmin
        .storage
        .from('product-images')
        .upload(fileName, image, {
          contentType: image.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        continue;
      }

      const { data: urlData } = supabaseAdmin
        .storage
        .from('product-images')
        .getPublicUrl(uploadData.path);

      imageUrls.push(urlData.publicUrl);

      // Insert image record
      await supabaseAdmin
        .from('product_images')
        .insert({
          product_id: product.id,
          image_url: urlData.publicUrl,
          display_order: i
        });
    }

    // Upload PDF if category is PDF
    let pdfUrl = null;
    if (productData.category === 'PDF') {
      const pdfFile = formData.get('pdfFile') as File;
      
      if (pdfFile) {
        const fileExt = pdfFile.name.split('.').pop();
        const fileName = `${product.id}/${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabaseAdmin
          .storage
          .from('product-pdfs')
          .upload(fileName, pdfFile, {
            contentType: pdfFile.type,
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabaseAdmin
          .storage
          .from('product-pdfs')
          .getPublicUrl(uploadData.path);

        pdfUrl = urlData.publicUrl;

        // Update product with PDF URL
        await supabaseAdmin
          .from('products')
          .update({ pdf_url: pdfUrl })
          .eq('id', product.id);
      }
    }

    // Fetch complete product with images
    const { data: completeProduct } = await supabaseAdmin
      .from('products')
      .select(`
        *,
        product_images (
          id,
          image_url,
          display_order
        )
      `)
      .eq('id', product.id)
      .single();

    return NextResponse.json({
      success: true,
      data: completeProduct,
      message: 'Product created successfully',
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const productId = formData.get('productId') as string;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Extract update data
    const updates: any = {};
    
    if (formData.has('title')) updates.title = formData.get('title');
    if (formData.has('description')) updates.description = formData.get('description');
    if (formData.has('category')) updates.category = formData.get('category');
    if (formData.has('originalPrice')) updates.original_price = parseFloat(formData.get('originalPrice') as string);
    if (formData.has('discountPrice')) {
      const discountPrice = formData.get('discountPrice');
      updates.discount_price = discountPrice ? parseFloat(discountPrice as string) : null;
    }
    if (formData.has('available')) updates.available = formData.get('available') === 'true';
    if (formData.has('stockQuantity')) {
      const stockQuantity = formData.get('stockQuantity');
      updates.stock_quantity = stockQuantity ? parseInt(stockQuantity as string) : null;
    }

    // Update product
    const { data: product, error: updateError } = await supabaseAdmin
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Handle new images if provided
    const newImages = formData.getAll('newImages') as File[];
    if (newImages.length > 0) {
      // Get current image count
      const { data: existingImages } = await supabaseAdmin
        .from('product_images')
        .select('id, display_order')
        .eq('product_id', productId)
        .order('display_order', { ascending: false });

      const startOrder = existingImages?.[0]?.display_order ? existingImages[0].display_order + 1 : 0;

      for (let i = 0; i < newImages.length; i++) {
        const image = newImages[i];
        const fileExt = image.name.split('.').pop();
        const fileName = `${productId}/${Date.now()}-${i}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabaseAdmin
          .storage
          .from('product-images')
          .upload(fileName, image, {
            contentType: image.type,
            upsert: false
          });

        if (uploadError) continue;

        const { data: urlData } = supabaseAdmin
          .storage
          .from('product-images')
          .getPublicUrl(uploadData.path);

        await supabaseAdmin
          .from('product_images')
          .insert({
            product_id: productId,
            image_url: urlData.publicUrl,
            display_order: startOrder + i
          });
      }
    }

    // Fetch updated product with images
    const { data: updatedProduct } = await supabaseAdmin
      .from('products')
      .select(`
        *,
        product_images (
          id,
          image_url,
          display_order
        )
      `)
      .eq('id', productId)
      .single();

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Get product images to delete from storage
    const { data: images } = await supabaseAdmin
      .from('product_images')
      .select('image_url')
      .eq('product_id', productId);

    // Delete images from storage
    if (images && images.length > 0) {
      const imagePaths = images.map(img => {
        const url = new URL(img.image_url);
        return url.pathname.split('/product-images/')[1];
      });

      await supabaseAdmin
        .storage
        .from('product-images')
        .remove(imagePaths);
    }

    // Get PDF to delete from storage
    const { data: product } = await supabaseAdmin
      .from('products')
      .select('pdf_url')
      .eq('id', productId)
      .single();

    if (product?.pdf_url) {
      const url = new URL(product.pdf_url);
      const pdfPath = url.pathname.split('/product-pdfs/')[1];
      
      await supabaseAdmin
        .storage
        .from('product-pdfs')
        .remove([pdfPath]);
    }

    // Delete product (cascades to product_images)
    const { error: deleteError } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', productId);

    if (deleteError) throw deleteError;

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}