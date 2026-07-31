/* eslint-disable @typescript-eslint/no-explicit-any */
// File: app/api/orders/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with service role key for admin access
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // You need to add this to .env.local
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// GET - Fetch all orders with details
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = searchParams.get('limit');

    // Build query
    let query = supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (orderId) {
      query = query.eq('id', orderId);
    }

    if (userId) {
      query = query.eq('user_id', userId);
    }

    if (status) {
      query = query.eq('order_status', status);
    }

    if (paymentStatus) {
      query = query.eq('payment_status', paymentStatus);
    }

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: orders, error } = await query;

    if (error) throw error;

    // Fetch additional details for each order
    const ordersWithDetails = await Promise.all(
      (orders || []).map(async (order) => {
        // Fetch customer details
        const { data: userData } = await supabaseAdmin.auth.admin.getUserById(order.user_id);

        // Fetch address
        const { data: addressData } = await supabaseAdmin
          .from('addresses')
          .select('*')
          .eq('id', order.address_id)
          .single();

        // Fetch order items
        const { data: itemsData } = await supabaseAdmin
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);

        // Fetch payment
        const { data: paymentData } = await supabaseAdmin
          .from('payments')
          .select('*')
          .eq('order_id', order.id)
          .maybeSingle();

        return {
          ...order,
          customer: userData?.user || null,
          address: addressData || null,
          items: itemsData || [],
          payment: paymentData || null,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: ordersWithDetails,
      count: ordersWithDetails.length,
    });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update order status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, orderStatus, paymentStatus } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const updates: any = {
      updated_at: new Date().toISOString(),
    };

    if (orderStatus) {
      updates.order_status = orderStatus;
    }

    if (paymentStatus) {
      updates.payment_status = paymentStatus;
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Order updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Cancel/Delete order
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Soft delete - update status to cancelled
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({
        order_status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Order cancelled successfully',
    });
  } catch (error: any) {
    console.error('Error cancelling order:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}