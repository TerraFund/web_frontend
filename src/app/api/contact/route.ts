import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  // Mock sending email
  console.log('Contact form submission:', { name, email, subject, message });

  // In real app, send email via SMTP or service

  return NextResponse.json({
    success: true,
    message: 'Message sent successfully. We will get back to you soon.',
  });
}