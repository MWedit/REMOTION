import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {StarField} from '../components/StarField';

export const OutroScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const enter = spring({
		fps,
		frame,
		config: {damping: 14, stiffness: 90, mass: 0.9},
	});

	const scale = interpolate(enter, [0, 1], [0.7, 1]);

	// The pill button gets a subtle continuous pulse.
	const pulse = 1 + Math.sin(frame * 0.12) * 0.03;

	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at 50% 60%, #211a4d 0%, #0b1021 70%)',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<StarField count={50} seed="outro" />

			<h2
				style={{
					fontFamily: 'system-ui, -apple-system, sans-serif',
					fontSize: 100,
					fontWeight: 800,
					color: 'white',
					margin: 0,
					textAlign: 'center',
					opacity: enter,
					transform: `scale(${scale})`,
					zIndex: 1,
				}}
			>
				Start building
			</h2>

			<div
				style={{
					marginTop: 50,
					padding: '28px 64px',
					borderRadius: 999,
					background: 'linear-gradient(90deg, #4f7cff, #9b5cff)',
					fontFamily: 'monospace',
					fontSize: 42,
					fontWeight: 600,
					color: 'white',
					opacity: interpolate(frame, [20, 45], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}),
					transform: `scale(${pulse})`,
					boxShadow: '0 20px 60px rgba(79,124,255,0.5)',
					zIndex: 1,
				}}
			>
				npm i remotion
			</div>
		</AbsoluteFill>
	);
};
