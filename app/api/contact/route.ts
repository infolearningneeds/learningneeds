// app/api/contact/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

interface ContactFormData {
  name: string
  email: string
  contact: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.contact || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate phone number (basic validation)
    if (body.contact.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert([
        {
          name: body.name.trim(),
          email: body.email.trim().toLowerCase(),
          contact: body.contact.trim(),
          message: body.message.trim(),
          status: 'unread'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for contacting us! We will get back to you soon.',
        submission: data
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again later.' },
      { status: 500 }
    )
  }
}