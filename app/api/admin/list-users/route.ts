/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/admin/list-users/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function GET(request: Request) {
  try {
    // Verify admin access from the request
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (!roleData || roleData.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Fetch all users from auth using admin client
    const { data: { users: authUsers }, error: authError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (authError) {
      console.error('Error fetching auth users:', authError)
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }
    
    if (!authUsers || authUsers.length === 0) {
      return NextResponse.json({ users: [] })
    }
    
    // For each auth user, fetch their role
    const usersList = await Promise.all(
      authUsers.map(async (authUser: any) => {
        try {
          // Fetch role from user_roles table
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role, created_at')
            .eq('user_id', authUser.id)
            .single()
          
          return {
            id: authUser.id,
            name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'N/A',
            email: authUser.email || 'N/A',
            mobile: authUser.user_metadata?.phone || authUser.phone || 'N/A',
            role: roleData?.role || 'user',
            created_at: roleData?.created_at || authUser.created_at
          }
        } catch (err) {
          console.error('Error processing user:', err)
          return {
            id: authUser.id,
            name: authUser.user_metadata?.full_name || 'Unknown',
            email: authUser.email || 'N/A',
            mobile: authUser.user_metadata?.phone || 'N/A',
            role: 'user',
            created_at: authUser.created_at
          }
        }
      })
    )
    
    // Sort by created_at descending
    usersList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    
    return NextResponse.json({ users: usersList })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}