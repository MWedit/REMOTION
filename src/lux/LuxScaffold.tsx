import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {EASE_OUT, FONT, LUX} from './lux';

// Centred column, transparent (PremiumOverlay paints the matte background).
export const LuxLayout: React.FC<{children: React.ReactNode}> = ({children}) => (
	<AbsoluteFill
		style={{
			justifyContent: 'center',
			alignItems: 'center',
			fontFamily: FONT,
			padding: '0 110px',
			textAlign: 'center',
		}}
	>
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 26,
			}}
		>
			{children}
		</div>
	</AbsoluteFill>
);

// Slow reveal: fade + soft upward drift on a refined ease-out.
export const useReveal = (start: number, duration = 22) => {
	const frame = useCurrentFrame();
	const p = interpolate(frame, [start, start + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});
	return {opacity: p, y: (1 - p) * 30, p};
};

// Thin, wide-tracked uppercase label.
export const Kicker: React.FC<{children: React.ReactNode; start?: number}> = ({
	children,
	start = 2,
}) => {
	const {opacity, y} = useReveal(start, 24);
	return (
		<div
			style={{
				color: LUX.muted,
				fontSize: 34,
				fontWeight: 300,
				letterSpacing: 12,
				textTransform: 'uppercase',
				opacity,
				transform: `translateY(${y}px)`,
			}}
		>
			{children}
		</div>
	);
};
