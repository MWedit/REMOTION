// Shared look & feel for the VSL overlays — minimalist 2D vector, black + gold.
export const COLORS = {
	bg: '#000000',
	gold: '#F4CF6A',
	goldDeep: '#D8A53A',
	goldSoft: '#FBE4A0',
	white: '#FFFFFF',
	mute: 'rgba(255,255,255,0.55)',
	line: 'rgba(244,207,106,0.25)',
};

export const GOLD_GRADIENT = 'linear-gradient(180deg, #FBE4A0 0%, #F4CF6A 45%, #D8A53A 100%)';

export const FONT = '"Helvetica Neue", system-ui, -apple-system, sans-serif';

// Text filled with the gold gradient.
export const goldText: React.CSSProperties = {
	background: GOLD_GRADIENT,
	WebkitBackgroundClip: 'text',
	backgroundClip: 'text',
	color: 'transparent',
	WebkitTextFillColor: 'transparent',
};
