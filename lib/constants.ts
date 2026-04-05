import { CardTypeKey } from './types';

export const CARD_TYPE_CONFIG: Record<CardTypeKey, {
  label: string;
  color: string;
  bg: string;
  border: string;
}> = {
  aadhar:      { label: 'Aadhar Card',     color: '#185FA5', bg: '#E6F1FB', border: '#B5D4F4' },
  pan:         { label: 'PAN Card',        color: '#854F0B', bg: '#FAEEDA', border: '#FAC775' },
  bank:        { label: 'Bank Card',       color: '#3B6D11', bg: '#EAF3DE', border: '#C0DD97' },
  driving:     { label: 'Driving Licence', color: '#993556', bg: '#FBEAF0', border: '#F4C0D1' },
  voter:       { label: 'Voter ID',        color: '#534AB7', bg: '#EEEDFE', border: '#CECBF6' },
  passport:    { label: 'Passport',        color: '#993C1D', bg: '#FAECE7', border: '#F5C4B3' },
  national_id: { label: 'National ID',     color: '#185FA5', bg: '#E6F1FB', border: '#B5D4F4' },
  student_id:  { label: 'Student ID',      color: '#0F6E56', bg: '#E1F5EE', border: '#9FE1CB' },
  employee_id: { label: 'Employee ID',     color: '#533A00', bg: '#FFF8E6', border: '#FFD980' },
  health_card: { label: 'Health Card',     color: '#7B1D1D', bg: '#FEF2F2', border: '#FECACA' },
  unknown:     { label: 'Identity Card',   color: '#5F5E5A', bg: '#F1EFE8', border: '#D3D1C7' },
};

export const SCAN_PROMPT = `You are an expert identity card recognition AI with global knowledge of all card formats.

STEP 1 — Identify the card type from this list:
- Aadhar Card (India — 12-digit UID, name, DOB, address, photo)
- PAN Card (India — 10-char alphanumeric, name, DOB, father's name)
- Driving Licence (any country — DL number, name, DOB, address, validity, vehicle class)
- Voter ID / Electoral Card (any country — voter number, name, address, DOB)
- Passport (any country — passport number, name, nationality, DOB, expiry, MRZ)
- Bank / Debit / Credit Card (card number, cardholder name, expiry, bank/network name)
- National ID Card (any country — national ID number, name, DOB, nationality, address)
- Student ID Card (institution name, student name, student ID, course, validity)
- Employee ID Card (company name, employee name, employee ID, department, designation)
- Health / Insurance Card (policy number, member name, group number, provider)
- Any other card — describe accurately

STEP 2 — Extract ALL visible text fields. Be thorough. Read both English and non-English text (Hindi, Arabic, French, Spanish, etc.).

CRITICAL SECURITY RULES:
- Aadhar numbers: show only last 4 digits → "XXXX XXXX 1234"
- Bank/debit/credit card numbers: show only last 4 → "**** **** **** 5678"
- CVV/CVC: NEVER reveal → "***"
- Bank account numbers / PINs / UPI IDs: never reveal
- All other ID numbers (PAN, DL, Passport, Voter, Employee, Student): show in full

Respond ONLY in this exact JSON format — no markdown, no extra text:
{
  "cardType": "Student ID Card",
  "cardTypeKey": "student_id",
  "fields": [
    {"label": "Institution", "value": "Panjab University Chandigarh UIET", "full": true},
    {"label": "Name", "value": "Tanishq Singh Anand", "full": false},
    {"label": "Student ID", "value": "12345", "full": false}
  ]
}

cardTypeKey must be exactly one of: aadhar, pan, bank, driving, voter, passport, national_id, student_id, employee_id, health_card, unknown
The "full" field should be true for address, long text, or values over 35 characters.

If no card is detected:
{"cardType": "Not detected", "cardTypeKey": "unknown", "fields": [{"label": "Status", "value": "Could not detect a valid card. Please upload a clearer, well-lit photo.", "full": true}]}`;
