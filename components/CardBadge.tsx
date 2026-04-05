import { CardTypeKey } from '@/lib/types';
import { CARD_TYPE_CONFIG } from '@/lib/constants';

interface CardBadgeProps {
  typeKey: CardTypeKey;
  large?: boolean;
}

export default function CardBadge({ typeKey, large }: CardBadgeProps) {
  const config = CARD_TYPE_CONFIG[typeKey] ?? CARD_TYPE_CONFIG.unknown;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      fontSize: large ? '13px' : '11px',
      fontWeight: 500,
      padding: large ? '5px 12px' : '3px 10px',
      borderRadius: '20px',
      background: config.bg,
      color: config.color,
      border: `0.5px solid ${config.border}`,
      letterSpacing: '0.2px',
      fontFamily: 'var(--font-body)',
    }}>
      {config.label}
    </span>
  );
}
