import {Easing} from 'remotion';
import {SANS} from './fonts';

// Palette — Matte black + minimalist white/silver neon.
export const LUX = {
	bg: '#0A0B0D',
	bgCenter: '#16181C',
	bgEdge: '#060708',
	neon: '#FFFFFF',
	silver: '#D6DCE4',
	muted: 'rgba(214,220,228,0.45)',
	line: 'rgba(255,255,255,0.9)',
	lineDim: 'rgba(255,255,255,0.12)',
	risk: '#9AA6B2', // cool silver for the declining line
};

export const FONT = SANS;

// Refined organic easings.
export const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1); // strong, smooth deceleration
export const EASE_IN = Easing.bezier(0.64, 0, 0.78, 0);
export const EASE_INOUT = Easing.inOut(Easing.cubic);

// ~0.7s transitions at 25fps.
export const T = 17;

// Soft white neon glow for text/lines.
export const glow = (px: number, opacity = 0.55) =>
	`drop-shadow(0 0 ${px}px rgba(255,255,255,${opacity}))`;
