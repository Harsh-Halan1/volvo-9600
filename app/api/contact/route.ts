import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Validate environment variables
const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

const getResend = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
};

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

    const supabase = getSupabase();
    const resend = getResend();

    if (!supabase || !resend) {
      console.log('Missing Supabase or Resend keys. Mocking successful form submission.');
      return NextResponse.json(
        { success: true, message: 'Lead submitted successfully. (Mock Response)' },
        { status: 200 }
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
      from: 'Surendra & Co. Portal <onboarding@resend.dev>', // Update with a verified domain later
      to: ['surendra_bareja@yahoo.com'], // Surendra & Co. sales
      replyTo: email,
      subject: `New Lead: ${fullName} from ${company}`,
      html: `
        <h2>New Lead — Surendra & Co.</h2>
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
