# Email Not Working on Vercel - Complete Fix Guide

## Problem
Emails are not being sent when the website is deployed on Vercel, even though they work locally.

## Root Causes

1. **FormSubmit Email Activation Required**: FormSubmit requires you to verify your email address for each new domain
2. **CORS Restrictions**: Direct client-side calls to FormSubmit may be blocked
3. **Missing Environment Variables**: Email configuration not properly set up in Vercel

## Solutions Implemented

### ✅ Solution 1: Vercel Serverless Function (Recommended)

I've created a backend API route that handles email sending server-side, which is more reliable than client-side FormSubmit.

**Files Created:**
- `/api/send-email.ts` - Serverless function for sending emails
- `/vercel.json` - Vercel configuration for API routes

**How it works:**
1. Contact form submits to `/api/send-email`
2. Server-side function sends email using Resend API (if configured) or FormSubmit (fallback)
3. More reliable and secure than client-side email sending

### 📋 Deployment Steps

#### Step 1: Deploy to Vercel

```bash
# If you haven't already, install Vercel CLI
npm install -g vercel

# Deploy your project
vercel
```

Or use the Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy

#### Step 2: Activate FormSubmit (Required for Fallback)

After deploying to Vercel:

1. **Visit your deployed website** (e.g., `https://your-site.vercel.app`)
2. **Submit a test form** through the contact section
3. **Check your email inbox** (the email from your Google Sheets - "Official Email")
4. **Look for an email from FormSubmit** with subject like "Activate Form"
5. **Click the activation link** in that email
6. **Submit the form again** - it should now work!

#### Step 3: (Optional) Set Up Resend for Better Reliability

For production use, I recommend using [Resend](https://resend.com) instead of FormSubmit:

1. **Sign up at [resend.com](https://resend.com)** (free tier: 3,000 emails/month)
2. **Get your API key** from the dashboard
3. **Add to Vercel Environment Variables**:
   - Go to your Vercel project → Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `your_api_key_here`
4. **Redeploy your site** (Vercel will automatically redeploy when you add env vars)

**Benefits of Resend:**
- ✅ More reliable delivery
- ✅ Better email formatting
- ✅ Delivery tracking
- ✅ No activation required per domain
- ✅ Professional sender address

#### Step 4: Verify Email Address in Google Sheets

Make sure your Google Sheets has the correct email:

1. Open your "Contact Me" sheet: `https://docs.google.com/spreadsheets/d/1fk22ajEN3Gus4AAjNBv-LgFgY2M3CDOcZOCk4vHqvr8`
2. Verify the "mail" column has your correct email address
3. Or check "Basic Information" sheet for "Official Email"

## Testing

### Local Testing
```bash
npm run dev
```
Visit `http://localhost:5173` and test the contact form.

### Production Testing
1. Visit your Vercel deployment URL
2. Fill out the contact form
3. Submit
4. Check your email inbox

## Troubleshooting

### Issue: "Failed to send email" error

**Solution:**
1. Check browser console for detailed error messages
2. Verify email address is loaded from Google Sheets (check Network tab)
3. Make sure FormSubmit is activated for your domain
4. Try setting up Resend API key

### Issue: Form submits but no email received

**Solution:**
1. **Check spam folder** - FormSubmit emails often go to spam initially
2. **Verify FormSubmit activation** - You must click the activation link
3. **Check email address** - Make sure it's correct in Google Sheets
4. **Wait a few minutes** - Sometimes there's a delay

### Issue: CORS errors in console

**Solution:**
- The new serverless function handles CORS automatically
- Make sure you've deployed the latest code with `/api/send-email.ts`

### Issue: API route not found (404)

**Solution:**
1. Make sure `vercel.json` exists in your project root
2. Redeploy your project
3. Check that `/api/send-email.ts` exists in your repository

## Code Changes Summary

### Modified Files:
1. **`src/components/Contact.tsx`**
   - Now uses `/api/send-email` endpoint first
   - Falls back to direct FormSubmit if API fails
   - Better error handling

### New Files:
1. **`api/send-email.ts`**
   - Serverless function for email sending
   - Supports both Resend and FormSubmit
   - Handles CORS automatically

2. **`vercel.json`**
   - Configures Vercel to recognize API routes

## Alternative: Keep Using FormSubmit Only

If you prefer to keep using only FormSubmit (without the API route):

1. **Revert Contact.tsx** to use direct FormSubmit
2. **Activate FormSubmit** for your Vercel domain (see Step 2 above)
3. **Add your Vercel domain to FormSubmit whitelist**:
   - In your form submission, add: `_next: "https://your-site.vercel.app/thank-you"`

## Recommended Setup (Production)

For the most reliable email delivery:

1. ✅ Use Resend API (set `RESEND_API_KEY` in Vercel)
2. ✅ Keep FormSubmit as fallback
3. ✅ Verify email address in Google Sheets
4. ✅ Test after each deployment

## Support

If you continue having issues:

1. Check Vercel deployment logs: `vercel logs`
2. Check browser console for errors
3. Verify all environment variables are set
4. Make sure Google Sheets are publicly accessible

---

**Current Status:** ✅ Email system updated with serverless function and fallback mechanism
**Next Step:** Deploy to Vercel and activate FormSubmit for your domain
