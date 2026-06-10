export async function subscribeToMailchimp(
  email: string,
  name: string,
  tags: string[]
): Promise<{ success: boolean; error?: string }> {
  const url =
    process.env.NEXT_PUBLIC_SUBSCRIBE_URL ||
    'https://kaisrun-subscribe.kaisrunmobile.workers.dev';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, tags }),
    });
    const data = await res.json();
    if (data.success) return { success: true };
    return { success: false, error: data.error || 'Unknown error' };
  } catch {
    return { success: false, error: 'Network error' };
  }
}
