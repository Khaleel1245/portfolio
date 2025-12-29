import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    try {
        const { name, email, subject, purpose, message, targetEmail } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message || !targetEmail) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Use Resend API (you'll need to set RESEND_API_KEY in Vercel environment variables)
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            // Fallback to FormSubmit if Resend is not configured
            const formsubmitResponse = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    purpose,
                    message,
                    _subject: `Portfolio Contact: ${subject}`,
                    _template: 'table'
                })
            });

            if (!formsubmitResponse.ok) {
                throw new Error('FormSubmit failed');
            }

            return res.status(200).json({ success: true, method: 'formsubmit' });
        }

        // Use Resend API
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Portfolio Contact <onboarding@resend.dev>', // You can customize this
                to: [targetEmail],
                reply_to: email,
                subject: `Portfolio Contact: ${subject}`,
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Purpose:</strong> ${purpose || 'Not specified'}</p>
            </div>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #000;">
              <p style="margin: 0;"><strong>Message:</strong></p>
              <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            
            <p style="color: #666; font-size: 12px;">
              This email was sent from your portfolio contact form.
            </p>
          </div>
        `
            })
        });

        if (!resendResponse.ok) {
            const errorData = await resendResponse.json();
            throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
        }

        return res.status(200).json({ success: true, method: 'resend' });

    } catch (error) {
        console.error('Email sending error:', error);
        return res.status(500).json({
            error: 'Failed to send email',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
