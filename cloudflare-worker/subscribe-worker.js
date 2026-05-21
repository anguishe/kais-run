const MAILCHIMP_API_KEY = 'MAILCHIMP_API_KEY_HERE'; // set as env var in CF dashboard
const MAILCHIMP_AUDIENCE_ID = '334201f588';
const MAILCHIMP_DC = 'us4';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://kaisrun.xyz',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    // Use env var if available, fall back to hardcoded (replace before deploy)
    const apiKey = env.MAILCHIMP_API_KEY || MAILCHIMP_API_KEY;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const { email, name, tags = [] } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email required' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const [firstName, ...rest] = (name || '').split(' ');
    const lastName = rest.join(' ');

    const mcPayload = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName || '',
        LNAME: lastName || '',
      },
      tags,
    };

    const mcResponse = await fetch(
      `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mcPayload),
      }
    );

    const mcData = await mcResponse.json();

    // 400 with "Member Exists" is not a failure — treat as success
    if (mcResponse.ok || mcData.title === 'Member Exists') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: mcData.detail || 'Mailchimp error' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  },
};
