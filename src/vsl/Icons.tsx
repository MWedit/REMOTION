import {COLORS} from './theme';

// Minimalist 2D line/vector icons, gold. Each takes a size.
type IconProps = {size?: number; stroke?: number};

const base = (size: number) => ({
	width: size,
	height: size,
	viewBox: '0 0 48 48',
	fill: 'none' as const,
	stroke: COLORS.gold,
	strokeLinecap: 'round' as const,
	strokeLinejoin: 'round' as const,
});

export const CashIcon: React.FC<IconProps> = ({size = 64, stroke = 2.4}) => (
	<svg {...base(size)} strokeWidth={stroke}>
		<rect x="6" y="13" width="36" height="22" rx="3" />
		<circle cx="24" cy="24" r="6" />
		<path d="M12 18.5v11M36 18.5v11" />
	</svg>
);

export const CalendarIcon: React.FC<IconProps> = ({size = 64, stroke = 2.4}) => (
	<svg {...base(size)} strokeWidth={stroke}>
		<rect x="8" y="11" width="32" height="30" rx="4" />
		<path d="M8 19h32M16 7v8M32 7v8" />
		<path d="M15 27h4M22 27h4M29 27h4M15 34h4M22 34h4" />
	</svg>
);

export const HandshakeIcon: React.FC<IconProps> = ({size = 64, stroke = 2.4}) => (
	<svg {...base(size)} strokeWidth={stroke}>
		<path d="M4 18l8-3 8 4 6-2 12 4" />
		<path d="M20 19l5 5c1.5 1.5 0 4-2 3l-3-2" />
		<path d="M44 21l-8 12c-1 1.5-3 1-4 0l-9-8" />
		<path d="M12 15v14M36 18v15" />
	</svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({size = 64, stroke = 2.4}) => (
	<svg {...base(size)} strokeWidth={stroke}>
		<rect x="12" y="9" width="24" height="32" rx="3" />
		<rect x="18" y="6" width="12" height="6" rx="2" />
		<path d="M18 20h12M18 27h12M18 34h7" />
	</svg>
);

export const CommunityIcon: React.FC<IconProps> = ({size = 64, stroke = 2.4}) => (
	<svg {...base(size)} strokeWidth={stroke}>
		<circle cx="24" cy="16" r="6" />
		<circle cx="11" cy="20" r="4.5" />
		<circle cx="37" cy="20" r="4.5" />
		<path d="M14 38c0-6 4.5-10 10-10s10 4 10 10" />
		<path d="M4 38c0-4 2.5-7 7-7M44 38c0-4-2.5-7-7-7" />
	</svg>
);

export const CursorIcon: React.FC<IconProps> = ({size = 64, stroke = 2.4}) => (
	<svg {...base(size)} strokeWidth={stroke}>
		<path d="M14 10l9 28 4-12 12-4z" fill={COLORS.gold} />
	</svg>
);

export const PhoneIcon: React.FC<IconProps> = ({size = 64, stroke = 2.4}) => (
	<svg {...base(size)} strokeWidth={stroke}>
		<rect x="15" y="6" width="18" height="36" rx="4" />
		<path d="M21 10h6M22 38h4" />
	</svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({size = 64, stroke = 2.4}) => (
	<svg {...base(size)} strokeWidth={stroke}>
		<path d="M24 5l15 5v10c0 11-7 18-15 23-8-5-15-12-15-23V10z" />
		<path d="M16 23l6 6 11-12" />
	</svg>
);

export const GiftIcon: React.FC<IconProps> = ({size = 64, stroke = 2.4}) => (
	<svg {...base(size)} strokeWidth={stroke}>
		<rect x="8" y="18" width="32" height="22" rx="3" />
		<path d="M6 18h36v8H6zM24 18v22" />
		<path d="M24 18c-3-9-12-9-12-3 0 3 4 3 12 3zM24 18c3-9 12-9 12-3 0 3-4 3-12 3z" />
	</svg>
);

export const CrossIcon: React.FC<IconProps & {color?: string}> = ({
	size = 48,
	stroke = 3,
	color = '#E0584F',
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 48 48"
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeWidth={stroke}
	>
		<circle cx="24" cy="24" r="19" />
		<path d="M16 16l16 16M32 16L16 32" />
	</svg>
);
