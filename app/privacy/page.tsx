import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Kai's Run",
  description:
    "Privacy policy for Kai's Run mobile dog gym serving Destin, Fort Walton Beach, and Niceville FL.",
  alternates: { canonical: 'https://kaisrun.xyz/privacy/' },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0F1117] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="privacy-content"
          style={{ color: '#F0EDE6' }}
          dangerouslySetInnerHTML={{
            __html: `<span data-custom-class="title">Privacy Policy</span><br><br>
<span data-custom-class="subtitle">Last updated: May 12, 2026</span><br><br>
<span data-custom-class="body_text">This Privacy Policy describes how Kai&apos;s Run (&quot;Kai&apos;s Run,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares information when you visit <a href="https://kaisrun.xyz/" data-custom-class="link">kaisrun.xyz</a> (our &quot;Site&quot;), contact us, join our waitlist or email list, or otherwise interact with our mobile canine conditioning services in Destin, Fort Walton Beach, Niceville, and nearby areas of Florida.</span><br><br>
<span data-custom-class="heading_1">Information we collect</span><br><br>
<span data-custom-class="heading_2">Information you provide</span><br><br>
<span data-custom-class="body_text">We may collect information that you voluntarily provide, including but not limited to your name, email address, phone number, mailing or service address, messages you send us, and details you share about your dog or scheduling preferences when you fill out a form (such as contact, booking, waitlist, or lead magnet requests), call or text us, or communicate with us by email or social media.</span><br><br>
<span data-custom-class="heading_2">Information collected automatically</span><br><br>
<span data-custom-class="body_text">When you use our Site, we and our service providers may automatically collect certain technical information, such as IP address, device type, browser type, general location derived from IP, and pages or content viewed. We may use cookies or similar technologies where supported by your browser; you can control cookies through your browser settings.</span><br><br>
<span data-custom-class="heading_1">How we use information</span><br><br>
<span data-custom-class="body_text">We use the information we collect to:</span><br><br>
<ul>
<li><span data-custom-class="body_text">Respond to inquiries and provide customer support</span></li>
<li><span data-custom-class="body_text">Schedule visits, deliver our mobile services, and operate our business</span></li>
<li><span data-custom-class="body_text">Send service-related messages and, where you have opted in, marketing communications such as newsletters or waitlist updates</span></li>
<li><span data-custom-class="body_text">Improve our Site, offerings, and security</span></li>
<li><span data-custom-class="body_text">Comply with law, enforce our terms, and protect rights and safety</span></li>
</ul>
<span data-custom-class="heading_1">How we share information</span><br><br>
<span data-custom-class="body_text">We may share information with service providers who assist us. Our website contact, waitlist, founding, and lead magnet forms are delivered through Formspree, Inc., which processes submissions on our behalf. If you join our email list or receive marketing updates, your contact information may be stored and sent through Mailchimp (or a comparable ESP we configure) so we can honor unsubscribe requests and measure engagement. We use Google Analytics on this Site to understand aggregate traffic patterns (for example, which pages are viewed and from what general regions). We do not sell your personal information for monetary consideration, and we do not allow these vendors to use your information for their own independent advertising except as described in their respective policies.</span><br><br>
<span data-custom-class="heading_1">Cookies and analytics</span><br><br>
<span data-custom-class="body_text">Google Analytics and similar technologies may set cookies or read technical data such as device type, approximate location derived from IP address, and on-site navigation paths. You can install a browser add-on to limit Google Analytics, adjust ad personalization settings in your Google account, or use browser controls to block cookies where supported.</span><br><br>
<span data-custom-class="heading_1">Florida and U.S. visitors</span><br><br>
<span data-custom-class="body_text">Kai&apos;s Run is based in Florida and primarily serves customers in the United States. If you contact us from another country, note that your information may be processed in the United States where privacy laws may differ from those where you live.</span><br><br>
<span data-custom-class="heading_1">Email marketing and subscriptions</span><br><br>
<span data-custom-class="body_text">If you join our list or request updates, we may process your contact information through our email or marketing tools. You can unsubscribe using the link in marketing emails or by contacting us using the information below.</span><br><br>
<span data-custom-class="heading_1">Data retention</span><br><br>
<span data-custom-class="body_text">We retain information for as long as needed to fulfill the purposes described in this policy, unless a longer period is required or permitted by law.</span><br><br>
<span data-custom-class="heading_1">Security</span><br><br>
<span data-custom-class="body_text">We take reasonable measures designed to protect personal information. No method of transmission over the Internet is completely secure.</span><br><br>
<span data-custom-class="heading_1">Your choices and rights</span><br><br>
<span data-custom-class="body_text">Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing of your personal information, or to opt out of certain uses. To exercise these rights, contact us at the information below. We may need to verify your request before responding.</span><br><br>
<span data-custom-class="heading_1">Children</span><br><br>
<span data-custom-class="body_text">Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13.</span><br><br>
<span data-custom-class="heading_1">Changes to this policy</span><br><br>
<span data-custom-class="body_text">We may update this Privacy Policy from time to time. We will post the updated version on this page and revise the &quot;Last updated&quot; date above.</span><br><br>
<span data-custom-class="heading_1">Contact us</span><br><br>
<span data-custom-class="body_text">If you have questions about this Privacy Policy or our practices, contact us:</span><br><br>
<ul>
<li><span data-custom-class="body_text"><span data-custom-class="link">Phone:</span> <a href="tel:850-218-5855" data-custom-class="link">850-218-5855</a></span></li>
<li><span data-custom-class="body_text"><span data-custom-class="link">Email:</span> <a href="mailto:kaisrunmobile@gmail.com" data-custom-class="link">kaisrunmobile@gmail.com</a></span></li>
</ul>`,
          }}
        />
      </div>
      <style>{`
        .privacy-content [data-custom-class='title'],
        .privacy-content [data-custom-class='title'] * {
          color: #F0EDE6 !important;
          font-family: Arial !important;
          font-size: 26px !important;
        }
        .privacy-content [data-custom-class='subtitle'],
        .privacy-content [data-custom-class='subtitle'] * {
          color: #9A9590 !important;
          font-family: Arial !important;
          font-size: 14px !important;
        }
        .privacy-content [data-custom-class='heading_1'],
        .privacy-content [data-custom-class='heading_1'] * {
          color: #F0EDE6 !important;
          font-family: Arial !important;
          font-size: 19px !important;
        }
        .privacy-content [data-custom-class='heading_2'],
        .privacy-content [data-custom-class='heading_2'] * {
          color: #F0EDE6 !important;
          font-family: Arial !important;
          font-size: 17px !important;
        }
        .privacy-content [data-custom-class='body_text'],
        .privacy-content [data-custom-class='body_text'] * {
          color: #9A9590 !important;
          font-size: 14px !important;
          font-family: Arial !important;
          line-height: 1.7 !important;
        }
        .privacy-content [data-custom-class='link'],
        .privacy-content [data-custom-class='link'] * {
          color: #0A5C52 !important;
          font-size: 14px !important;
          font-family: Arial !important;
          word-break: break-word !important;
        }
        .privacy-content h1,
        .privacy-content h2,
        .privacy-content h3 {
          color: #F0EDE6 !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.75rem !important;
        }
        .privacy-content table {
          border-collapse: collapse !important;
          width: 100% !important;
          margin: 1rem 0 !important;
        }
        .privacy-content table td,
        .privacy-content table th {
          border: 1px solid #1A1F2E !important;
          padding: 8px 12px !important;
          color: #9A9590 !important;
          font-size: 13px !important;
        }
        .privacy-content table th {
          background: #1A1F2E !important;
          color: #F0EDE6 !important;
        }
        .privacy-content ul {
          list-style-type: square !important;
          padding-left: 1.5rem !important;
        }
        .privacy-content a {
          color: #0A5C52 !important;
        }
        .privacy-content span[style*="display: block"] {
          display: none !important;
        }
      `}</style>
    </main>
  );
}
