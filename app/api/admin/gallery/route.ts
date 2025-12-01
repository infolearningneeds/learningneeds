// app/api/admin/gallery/route.ts
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

// Helper function to verify admin
async function verifyAdmin(token: string) {
  const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (!roleData || roleData.role !== 'admin') return null

  return user
}

// GET - Fetch all gallery images
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const user = await verifyAdmin(token)
    
    if (!user) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = supabaseAdmin
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (category && (category === 'school' || category === 'training')) {
      query = query.eq('category', category)
    }

    const { data: images, error } = await query

    if (error) throw error

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST - Save image URL to database (upload happens on client)
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const user = await verifyAdmin(token)
    
    if (!user) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { category, image_url } = body

    if (!category || !image_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (category !== 'school' && category !== 'training') {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const { data: image, error } = await supabaseAdmin
      .from('gallery')
      .insert({
        category,
        image_url,
        uploaded_by: user.id
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ image }, { status: 201 })
  } catch (error) {
    console.error('Error saving image:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT - Update image category
export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const user = await verifyAdmin(token)
    
    if (!user) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { id, category } = body

    if (!id || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (category !== 'school' && category !== 'training') {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const { data: image, error } = await supabaseAdmin
      .from('gallery')
      .update({
        category,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ image })
  } catch (error) {
    console.error('Error updating image:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE - Delete image
export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const user = await verifyAdmin(token)
    
    if (!user) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Image ID required' }, { status: 400 })
    }

    // Get image URL to delete from storage
    const { data: image } = await supabaseAdmin
      .from('gallery')
      .select('image_url')
      .eq('id', id)
      .single()

    if (image?.image_url) {
      // Extract file path from URL
      const urlParts = image.image_url.split('/gallery-images/')
      if (urlParts.length > 1) {
        const filePath = urlParts[1]
        // Delete from storage
        await supabaseAdmin.storage
          .from('gallery-images')
          .remove([filePath])
      }
    }

    // Delete from database
    const { error } = await supabaseAdmin
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}