# Card Scanner — AI-Powered ID & Card Extractor

A Next.js app that identifies and extracts details from any ID or payment card using Claude's vision AI.

## Supported Cards

- **Aadhar Card** — Name, DOB, Father's name, Gender, Address (number masked)
- **PAN Card** — Name, DOB, Father's name, PAN number
- **Driving Licence** — Name, DOB, DL number, validity, address
- **Voter ID** — Name, Father's name, EPIC number, address
- **Passport** — Name, Passport number, DOB, expiry, nationality
- **Bank / Debit / Credit Card** — Cardholder name, masked card number, expiry (CVV never shown)

## Security

- Images are processed via Anthropic's API and **never stored**
- Aadhar numbers are masked to show only last 4 digits
- Bank card numbers show only last 4 digits
- CVV is always suppressed
- All processing happens server-side with your own API key

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Get a FREE Gemini API key

1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy the key

**Free tier:** 15 requests/min · 1,500 requests/day · No credit card needed

### 3. Add your API key

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
GEMINI_API_KEY=your_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
card-scanner/
├── app/
│   ├── api/
│   │   └── scan/
│   │       └── route.ts        # Server-side API route (calls Anthropic)
│   ├── globals.css             # Global styles + animations
│   ├── layout.tsx              # Root layout with fonts
│   └── page.tsx                # Main page (client component)
├── components/
│   ├── CardBadge.tsx           # Colored badge per card type
│   ├── ResultCard.tsx          # Extracted fields display
│   ├── ScannerSkeleton.tsx     # Loading skeleton
│   └── UploadZone.tsx          # Drag-and-drop upload area
├── lib/
│   ├── constants.ts            # Card configs + AI prompt
│   └── types.ts                # TypeScript types
├── .env.local.example
└── README.md
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Anthropic SDK** (claude-sonnet-4)
- **react-dropzone** for file upload
- **Framer Motion** (available for enhancements)

## Adding Email Feature (Next Step)

To email extracted details, add a `/api/send-email` route using [Resend](https://resend.com) or [Nodemailer](https://nodemailer.com):

```bash
npm install resend
```

```ts
// app/api/send-email/route.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email, fields } = await req.json();
  await resend.emails.send({
    from: 'scanner@yourdomain.com',
    to: email,
    subject: 'Your card details',
    html: fields.map(f => `<b>${f.label}:</b> ${f.value}`).join('<br/>'),
  });
}
```
