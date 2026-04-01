export type CardTypeKey =
  | 'aadhar'
  | 'pan'
  | 'bank'
  | 'driving'
  | 'voter'
  | 'passport'
  | 'unknown';

export interface CardField {
  label: string;
  value: string;
  full?: boolean;
}

export interface ScanResult {
  cardType: string;
  cardTypeKey: CardTypeKey;
  fields: CardField[];
}

export interface ScanResponse {
  success: boolean;
  data?: ScanResult;
  error?: string;
}
