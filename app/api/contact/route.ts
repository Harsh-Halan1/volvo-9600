import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const resendKey = process.env.RESEND_API_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(resendKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, company, message } = body;

    // 1. Basic Server-side validation
    if (!fullName || !email || !company || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // 2. Insert into Supabase
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([
        { full_name: fullName, email, company, message }
      ]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      return NextResponse.json(
        { error: 'Failed to process lead.' },
        { status: 500 }
      );
    }

    // 3. Send Email using Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Volvo 9600 XL Portal <onboarding@resend.dev>', // Update with a verified domain later
      to: ['sales@company.com'], // Placeholder for sales team
      replyTo: email,
      subject: `New Lead: ${fullName} from ${company}`,
      html: `
        <h2>New Lead - Volvo 9600 XL</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (emailError) {
      console.error('Resend Error:', emailError);
      // We still return 200/success for the user, but maybe log the email failure.
    }

    return NextResponse.json(
      { success: true, message: 'Lead submitted successfully.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
