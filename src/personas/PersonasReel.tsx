import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {PeopleCluster} from './PeopleCluster';
import {RevealText} from './RevealText';

export type PersonasReelProps = {
	title: string;
	subtitle: string;
};

// Recreation of the reference reel: same green identity, rhythm and
// letter-by-letter text reveal — but the central Brazil map is replaced by
// a crowd of profiles that graphically represents "+10 mil personas".
export const PersonasReel: React.FC<PersonasReelProps> = ({title, subtitle}) => {
	const frame = useCurrentFrame();

	// Subtle overall brighten toward the end, like the reference.
	const brighten = interpolate(frame, [55, 84], [0, 0.12], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const textColor = `rgb(${189 + brighten * 420}, ${204 + brighten * 360}, ${
		180 + brighten * 480
	})`;

	return (
		<AbsoluteFill
			style={{
				// Radial green glow centred on the cluster, dark forest-green
				// edges — colours sampled from the reference video.
				background:
					'radial-gradient(ellipse 72% 46% at 50% 56%, #4a8420 0%, #2c6606 46%, #245203 100%)',
			}}
		>
			{/* Main animation: the crowd of profiles */}
			<PeopleCluster />

			{/* Text block, top-aligned exactly like the reference */}
			<AbsoluteFill
				style={{
					alignItems: 'center',
					justifyContent: 'flex-start',
					paddingTop: '17%',
				}}
			>
				<RevealText
					text={title}
					startFrame={22}
					perChar={2.2}
					style={{
						fontFamily: 'system-ui, -apple-system, sans-serif',
						fontSize: 150,
						fontWeight: 800,
						letterSpacing: -2,
						color: textColor,
						lineHeight: 1,
						textShadow: '0 6px 30px rgba(0,0,0,0.35)',
					}}
				/>
				<RevealText
					text={subtitle}
					startFrame={40}
					perChar={3.4}
					style={{
						fontFamily: 'system-ui, -apple-system, sans-serif',
						fontSize: 96,
						fontWeight: 600,
						letterSpacing: 0,
						color: textColor,
						marginTop: 4,
						textShadow: '0 6px 30px rgba(0,0,0,0.35)',
					}}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
