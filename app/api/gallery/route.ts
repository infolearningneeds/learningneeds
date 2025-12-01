// app/api/gallery/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// GET - Fetch all published gallery images (public endpoint)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = supabase
      .from('gallery')
      .select('id, image_url, category, created_at')
      .order('created_at', { ascending: false })

    if (category && (category === 'school' || category === 'training')) {
      query = query.eq('category', category)
    }

    const { data: images, error } = await query

    if (error) throw error

    return NextResponse.json({ images: images || [] })
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}