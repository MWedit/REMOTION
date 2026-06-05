import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
} from 'remotion';
import {COLORS} from './theme';

// Wraps a fullscreen overlay card and gives it a directional whip / zoom-blur
// on the way in and out, so we cut hard from the presenter into the graphic
// and snap back to him afterwards.
export const WhipOverlay: React.FC<{
	durationInFrames: number;
	children: React.ReactNode;
	transition?: number;
}> = ({durationInFrames, children, transition = 7}) => {
	const frame = useCurrentFrame();

	const enter = interpolate(frame, [0, transition], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const exit = interpolate(
		frame,
		[durationInFrames - transition, durationInFrames],
		[0, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.in(Easing.cubic),
		},
	);

	// Whip horizontally: in from the right, out to the left.
	const translateX = (1 - enter) * 240 + exit * -280;
	// Blur peaks at both ends (the "whip" smear) and the zoom punch.
	const blur = (1 - enter) * 26 + exit * 30;
	const scale = interpolate(enter, [0, 1], [1.14, 1]) * (1 + exit * 0.08);
	const opacity = enter * (1 - exit);

	return (
		<AbsoluteFill
			style={{
				opacity,
				transform: `translateX(${translateX}px) scale(${scale})`,
				filter: `blur(${blur}px)`,
			}}
		>
			<AbsoluteFill style={{backgroundColor: COLORS.bg}}>{children}</AbsoluteFill>
		</AbsoluteFill>
	);
};

// Small helper: a soft gold radial glow behind hero content.
export const GoldGlow: React.FC<{opacity?: number; size?: number}> = ({
	opacity = 0.5,
	size = 1100,
}) => (
	<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
		<div
			style={{
				width: size,
				height: size,
				borderRadius: '50%',
				background:
					'radial-gradient(circle, rgba(244,207,106,0.45) 0%, rgba(244,207,106,0) 65%)',
				opacity,
			}}
		/>
	</AbsoluteFill>
);
