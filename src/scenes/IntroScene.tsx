import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {StarField} from '../components/StarField';

export const IntroScene: React.FC<{title: string; subtitle: string}> = ({
	title,
	subtitle,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Title pops in with a spring.
	const titleScale = spring({
		fps,
		frame,
		config: {damping: 12, stiffness: 120, mass: 0.8},
	});

	// Subtitle fades + slides up, delayed.
	const subtitleProgress = spring({
		fps,
		frame: frame - 18,
		config: {damping: 200},
	});
	const subtitleY = interpolate(subtitleProgress, [0, 1], [40, 0]);

	// Slowly rotating glow behind the title.
	const glowRotation = interpolate(frame, [0, 110], [0, 60]);

	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at 50% 40%, #1b2350 0%, #0b1021 70%)',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<StarField count={70} seed="intro" />

			<div
				style={{
					position: 'absolute',
					width: 900,
					height: 900,
					borderRadius: '50%',
					background:
						'conic-gradient(from 0deg, #4f7cff, #9b5cff, #4f7cff)',
					filter: 'blur(140px)',
					opacity: 0.35,
					transform: `rotate(${glowRotation}deg)`,
				}}
			/>

			<div style={{textAlign: 'center', zIndex: 1}}>
				<h1
					style={{
						margin: 0,
						fontFamily: 'system-ui, -apple-system, sans-serif',
						fontSize: 180,
						fontWeight: 800,
						letterSpacing: -4,
						color: 'white',
						transform: `scale(${titleScale})`,
						textShadow: '0 10px 60px rgba(79,124,255,0.6)',
					}}
				>
					{title}
				</h1>
				<p
					style={{
						margin: 0,
						marginTop: 10,
						fontFamily: 'system-ui, -apple-system, sans-serif',
						fontSize: 52,
						fontWeight: 400,
						color: '#aeb8e0',
						opacity: subtitleProgress,
						transform: `translateY(${subtitleY}px)`,
					}}
				>
					{subtitle}
				</p>
			</div>
		</AbsoluteFill>
	);
};
