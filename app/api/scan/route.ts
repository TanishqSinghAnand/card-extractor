import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { SCAN_PROMPT } from '@/lib/constants';
import { ScanResult } from '@/lib/types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
type MsgContent = Parameters<typeof client.messages.create>[0]['messages'][0]['content'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ success: false, error: 'File too large.' }, { status: 400 });

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) return NextResponse.json({ success: false, error: 'Invalid file type.' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const mediaType = file.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif' | 'application/pdf';
    const isPdf = mediaType === 'application/pdf';
    const base64 = buffer.toString('base64');

    const content: MsgContent = isPdf
      ? [
          { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } },
          { type: 'text', text: SCAN_PROMPT },
        ] as MsgContent
      : [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: SCAN_PROMPT },
        ] as MsgContent;

    const msg = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content }],
    });

    const raw = msg.content
      .filter(b => b.type === 'text')
      .map(b => (b as { type: 'text'; text: string }).text)
      .join('');

    const parsed: ScanResult = JSON.parse(raw.replace(/```json|```/g, '').trim());
    return NextResponse.json({ success: true, data: parsed });
  } catch (err) {
    console.error('Scan error:', err);
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : 'Unexpected error' }, { status: 500 });
  }
}
