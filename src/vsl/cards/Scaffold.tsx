import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../theme';
import {GoldGlow} from '../WhipOverlay';

// Centred vertical column used by every card.
export const CardLayout: React.FC<{children: React.ReactNode; glow?: boolean}> = ({
	children,
	glow = true,
}) => (
	<AbsoluteFill
		style={{
			backgroundColor: COLORS.bg,
			justifyContent: 'center',
			alignItems: 'center',
			fontFamily: FONT,
		}}
	>
		{glow ? <GoldGlow opacity={0.5} /> : null}
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 18,
				padding: '0 90px',
				textAlign: 'center',
				zIndex: 1,
			}}
		>
			{children}
		</div>
	</AbsoluteFill>
);

// Small uppercase gold label (kicker).
export const Kicker: React.FC<{children: React.ReactNode; delay?: number}> = ({
	children,
	delay = 4,
}) => {
	const frame = useCurrentFrame();
	const o = interpolate(frame, [delay, delay + 8], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{
				color: COLORS.gold,
				fontSize: 42,
				fontWeight: 700,
				letterSpacing: 8,
				textTransform: 'uppercase',
				opacity: o,
				transform: `translateY(${(1 - o) * 14}px)`,
			}}
		>
			{children}
		</div>
	);
};

// Spring-based scale-up + glow used for hero numbers.
export const useHeroPop = (delay = 6) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({
		fps,
		frame: frame - delay,
		config: {damping: 13, stiffness: 120, mass: 0.7},
	});
	const scale = interpolate(s, [0, 1], [0.6, 1]);
	const opacity = interpolate(s, [0, 1], [0, 1]);
	// subtle continuous glow pulse
	const glow = 18 + Math.sin(frame * 0.18) * 10;
	return {scale, opacity, glow};
};
