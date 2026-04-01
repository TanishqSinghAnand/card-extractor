import { CardTypeKey } from './types';

export const CARD_TYPE_CONFIG: Record<CardTypeKey, {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
}> = {
  aadhar: {
    label: 'Aadhar Card',
    color: '#185FA5',
    bg: '#E6F1FB',
    border: '#B5D4F4',
    icon: '🪪',
  },
  pan: {
    label: 'PAN Card',
    color: '#854F0B',
    bg: '#FAEEDA',
    border: '#FAC775',
    icon: '📋',
  },
  bank: {
    label: 'Bank Card',
    color: '#3B6D11',
    bg: '#EAF3DE',
    border: '#C0DD97',
    icon: '💳',
  },
  driving: {
    label: 'Driving Licence',
    color: '#993556',
    bg: '#FBEAF0',
    border: '#F4C0D1',
    icon: '🚗',
  },
  voter: {
    label: 'Voter ID',
    color: '#534AB7',
    bg: '#EEEDFE',
    border: '#CECBF6',
    icon: '🗳️',
  },
  passport: {
    label: 'Passport',
    color: '#993C1D',
    bg: '#FAECE7',
    border: '#F5C4B3',
    icon: '📘',
  },
  unknown: {
    label: 'Unknown Card',
    color: '#5F5E5A',
    bg: '#F1EFE8',
    border: '#D3D1C7',
    icon: '🪪',
  },
};

export const SCAN_PROMPT = `You are a card recognition AI. Analyze this image of an ID or payment card.

FIRST, identify the card type. It could be one of:
- Aadhar Card (Indian national ID with 12-digit number, has name, DOB, address, photo)
- PAN Card (Indian tax ID, has 10-char alphanumeric PAN number, name, DOB, father's name)
- Driving Licence (Indian DL, has DL number, name, DOB, address, validity dates)
- Voter ID Card (EPIC number, name, father's name, address, DOB, part number)
- Passport (Indian passport, has passport number, name, nationality, DOB, expiry, place of birth)
- Bank/Debit/Credit Card (card number, cardholder name, expiry date, bank name)
- Other (describe what it is)

THEN extract ALL visible text fields from the card accurately.

CRITICAL SECURITY RULES — you MUST follow these without exception:
- For Aadhar numbers: mask first 8 digits, show only last 4 as "XXXX XXXX 1234"
- For bank/debit/credit card numbers: mask all but last 4 digits as "**** **** **** 5678"
- For CVV/CVC: NEVER reveal, always show "***"
- For bank account numbers: mask middle digits
- For UPI IDs or PINs: never reveal
- Passport numbers, PAN numbers, DL numbers, Voter ID numbers: show in full (these are standard ID fields)

Respond ONLY in this exact JSON format with no other text, preamble, or markdown:
{
  "cardType": "Aadhar Card",
  "cardTypeKey": "aadhar",
  "fields": [
    {"label": "Name", "value": "Rahul Kumar Sharma", "full": false},
    {"label": "Date of Birth", "value": "15/08/1992", "full": false},
    {"label": "Father's Name", "value": "Suresh Sharma", "full": false},
    {"label": "Gender", "value": "Male", "full": false},
    {"label": "Aadhar Number", "value": "XXXX XXXX 4521", "full": false},
    {"label": "Address", "value": "123 MG Road, Sector 4, New Delhi - 110001", "full": true}
  ]
}

The "full" field should be true for wide fields like address, long names, or any value over 30 chars.
cardTypeKey must be one of: aadhar, pan, bank, driving, voter, passport, unknown

If no card is detected or image is unreadable:
{"cardType": "Not detected", "cardTypeKey": "unknown", "fields": [{"label": "Status", "value": "Could not detect a valid card. Please upload a clearer, well-lit photo.", "full": true}]}`;
