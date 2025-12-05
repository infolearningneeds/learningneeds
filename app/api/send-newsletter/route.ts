/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const { emails, subject, content } = await request.json();

    console.log('📧 Attempting to send to:', emails.length, 'recipients');
    console.log('📧 From:', process.env.ADMIN_EMAIL);
    console.log('📧 Subject:', subject);

    // Send emails individually with better error handling
    const results = await Promise.allSettled(
      emails.map(async (email: string) => {
        const msg = {
          to: email,
          from: {
            email: process.env.ADMIN_EMAIL!,
            name: process.env.ADMIN_NAME || 'Newsletter'
          },
          subject: subject,
          html: content,
        };

        try {
          const result = await sgMail.send(msg);
          console.log(`✅ Sent to ${email}:`, result[0].statusCode);
          return { email, success: true, statusCode: result[0].statusCode };
        } catch (error: any) {
          console.error(`❌ Failed to send to ${email}:`, error.response?.body || error.message);
          return { email, success: false, error: error.response?.body || error.message };
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)).length;

    console.log(`✅ Success: ${successful}, ❌ Failed: ${failed}`);

    return NextResponse.json({ 
      success: true, 
      message: `Sent to ${successful} subscriber(s)${failed > 0 ? `, ${failed} failed` : ''}`,
      details: { successful, failed }
    });

  } catch (error: any) {
    console.error('❌ SendGrid error:', error.response?.body || error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send emails',
        details: error.response?.body 
      }, 
      { status: 500 }
    );
  }
}