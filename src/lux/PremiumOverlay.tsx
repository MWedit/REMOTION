import {CameraMotionBlur} from '@remotion/motion-blur';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {EASE_IN, LUX} from './lux';

// Matte-black backdrop with a faint center vignette.
const LuxBg: React.FC = () => (
	<AbsoluteFill
		style={{
			background: `radial-gradient(circle at 50% 44%, ${LUX.bgCenter} 0%, ${LUX.bg} 55%, ${LUX.bgEdge} 100%)`,
		}}
	/>
);

// Faster, punchier transition: a quick spring pop-in (with overshoot) + snap
// fade, real motion blur, and a brisk exit. More energetic, less minimalist.
export const PremiumOverlay: React.FC<{
	durationInFrames: number;
	children: React.ReactNode;
	transition?: number;
}> = ({durationInFrames, children, transition = 9}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Springy entrance with overshoot.
	const enter = spring({
		fps,
		frame,
		config: {damping: 13, stiffness: 200, mass: 0.6},
	});
	const opacityIn = interpolate(frame, [0, transition * 0.6], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const exit = interpolate(
		frame,
		[durationInFrames - transition, durationInFrames],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_IN},
	);
	const present = opacityIn * (1 - exit);

	const scale =
		interpolate(enter, [0, 1], [1.16, 1]) * interpolate(exit, [0, 1], [1, 0.94]);
	const y = (1 - enter) * 40 + exit * -30;

	return (
		<AbsoluteFill style={{opacity: present}}>
			<LuxBg />
			<CameraMotionBlur shutterAngle={200} samples={14}>
				<AbsoluteFill style={{transform: `translateY(${y}px) scale(${scale})`}}>
					{children}
				</AbsoluteFill>
			</CameraMotionBlur>
		</AbsoluteFill>
	);
};
