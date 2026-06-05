import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const FEATURES = [
	{icon: '⚛️', label: 'Write in React'},
	{icon: '🎬', label: 'Render to MP4'},
	{icon: '⚡', label: 'Animate with code'},
];

const FeatureCard: React.FC<{
	icon: string;
	label: string;
	index: number;
}> = ({icon, label, index}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Each card enters in a staggered cascade.
	const enter = spring({
		fps,
		frame: frame - index * 12,
		config: {damping: 14, stiffness: 110, mass: 0.7},
	});

	const y = interpolate(enter, [0, 1], [120, 0]);
	const float = Math.sin((frame - index * 12) * 0.06) * 8;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: 380,
				height: 380,
				borderRadius: 36,
				background: 'rgba(255,255,255,0.05)',
				border: '1px solid rgba(255,255,255,0.12)',
				boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
				backdropFilter: 'blur(10px)',
				opacity: enter,
				transform: `translateY(${y + float}px) scale(${interpolate(
					enter,
					[0, 1],
					[0.8, 1],
				)})`,
			}}
		>
			<div style={{fontSize: 130, lineHeight: 1}}>{icon}</div>
			<div
				style={{
					marginTop: 28,
					fontFamily: 'system-ui, -apple-system, sans-serif',
					fontSize: 40,
					fontWeight: 600,
					color: 'white',
				}}
			>
				{label}
			</div>
		</div>
	);
};

export const FeatureScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const headingEnter = spring({fps, frame, config: {damping: 200}});

	return (
		<AbsoluteFill
			style={{
				background:
					'linear-gradient(160deg, #141b3c 0%, #0b1021 100%)',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<h2
				style={{
					fontFamily: 'system-ui, -apple-system, sans-serif',
					fontSize: 72,
					fontWeight: 700,
					color: 'white',
					margin: 0,
					marginBottom: 70,
					opacity: headingEnter,
					transform: `translateY(${interpolate(
						headingEnter,
						[0, 1],
						[-30, 0],
					)}px)`,
				}}
			>
				Why Remotion?
			</h2>

			<div style={{display: 'flex', gap: 50}}>
				{FEATURES.map((f, i) => (
					<FeatureCard key={f.label} index={i} {...f} />
				))}
			</div>
		</AbsoluteFill>
	);
};
