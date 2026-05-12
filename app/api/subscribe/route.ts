import { NextRequest, NextResponse } from 'next/server';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
const MAILCHIMP_DC = process.env.MAILCHIMP_DC!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, tags = [] } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Split name into first/last for Mailchimp
    const nameParts = (name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

    const data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
      tags: tags,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Mailchimp returns 400 if email already exists — handle gracefully
    if (response.status === 400 && result.title === 'Member Exists') {
      // Still tag them if they already exist
      await tagExistingMember(email, tags);
      return NextResponse.json({ success: true, note: 'Already subscribed — tags updated' });
    }

    if (!response.ok) {
      console.error('Mailchimp error:', result);
      return NextResponse.json(
        { error: 'Mailchimp subscription failed', detail: result.detail },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Subscribe route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Helper: update tags on an existing member
async function tagExistingMember(email: string, tags: string[]) {
  const crypto = await import('crypto');
  const emailHash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex');

  const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${emailHash}/tags`;

  const tagPayload = {
    tags: tags.map((tag) => ({ name: tag, status: 'active' })),
  };

  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `apikey ${MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tagPayload),
  });
}