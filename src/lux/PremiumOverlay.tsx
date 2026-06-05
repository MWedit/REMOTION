import {CameraMotionBlur} from '@remotion/motion-blur';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {EASE_IN, EASE_OUT, LUX, T} from './lux';

// Matte-black backdrop with a faint center vignette.
const LuxBg: React.FC = () => (
	<AbsoluteFill
		style={{
			background: `radial-gradient(circle at 50% 44%, ${LUX.bgCenter} 0%, ${LUX.bg} 55%, ${LUX.bgEdge} 100%)`,
		}}
	/>
);

// Slow, elegant cross-dissolve from the presenter to a fullscreen luxury card
// and back. A gentle scale push + real motion blur keep it cinematic.
export const PremiumOverlay: React.FC<{
	durationInFrames: number;
	children: React.ReactNode;
	transition?: number;
}> = ({durationInFrames, children, transition = T}) => {
	const frame = useCurrentFrame();

	const enter = interpolate(frame, [0, transition], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});
	const exit = interpolate(
		frame,
		[durationInFrames - transition, durationInFrames],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_IN},
	);
	const present = enter * (1 - exit);

	// Slow push-in that settles, then a subtle drift out.
	const scale =
		interpolate(enter, [0, 1], [1.05, 1]) * interpolate(exit, [0, 1], [1, 0.975]);

	return (
		<AbsoluteFill style={{opacity: present}}>
			<LuxBg />
			<CameraMotionBlur shutterAngle={180} samples={12}>
				<AbsoluteFill style={{transform: `scale(${scale})`}}>{children}</AbsoluteFill>
			</CameraMotionBlur>
		</AbsoluteFill>
	);
};
