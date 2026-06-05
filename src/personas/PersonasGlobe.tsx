import {CameraMotionBlur} from '@remotion/motion-blur';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Globe} from './Globe';

export type PersonasGlobeProps = {
	title: string;
	subtitle: string;
};

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1); // settle ease for text
const EASE_SMOOTH = Easing.inOut(Easing.cubic); // sustained motion -> richer blur

// Reveal helper: fade + drift up + blur clearing, all on a long slow ease.
const useReveal = (start: number, duration: number) => {
	const frame = useCurrentFrame();
	const p = interpolate(frame, [start, start + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});
	return {
		opacity: p,
		translateY: (1 - p) * 46,
		blur: (1 - p) * 16,
		scale: 0.9 + p * 0.1,
	};
};

export const PersonasGlobe: React.FC<PersonasGlobeProps> = ({
	title,
	subtitle,
}) => {
	const frame = useCurrentFrame();
	const {width, durationInFrames} = useVideoConfig();

	const globeSize = width * 0.62;

	// --- Globe entrance: slow, sustained rise + scale + fade ---
	// A smooth in-out ease keeps velocity up through the middle of the move,
	// so the camera motion blur stays rich and cinematic the whole way up.
	const gIn = interpolate(frame, [10, 100], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_SMOOTH,
	});
	const globeRise = (1 - gIn) * 300;
	const globeScale = 0.76 + gIn * 0.24;
	const globeOpacity = interpolate(frame, [10, 62], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	// Gentle continuous float once it has settled.
	const float = Math.sin(frame * 0.04) * 10 * gIn;

	// Soft shadow grows with the entrance.
	const shadowScale = 0.55 + gIn * 0.45;
	const shadowOpacity = gIn * 0.3;

	// --- Text reveals (clearly staggered after the globe, slow) ---
	const t1 = useReveal(78, 50);
	const t2 = useReveal(106, 50);

	// --- Slow cinematic push-in over the whole shot ---
	const pushIn = interpolate(frame, [0, durationInFrames], [1, 1.05], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				background:
					'radial-gradient(circle at 50% 42%, #bfe0fb 0%, #a6d2f6 55%, #93c6f1 100%)',
			}}
		>
			<CameraMotionBlur shutterAngle={270} samples={20}>
				<AbsoluteFill style={{transform: `scale(${pushIn})`}}>
					{/* Globe + its shadow */}
					<AbsoluteFill
						style={{justifyContent: 'center', alignItems: 'center'}}
					>
						<div
							style={{
								position: 'absolute',
								top: '64%',
								transform: `translateY(${globeRise + float}px)`,
							}}
						>
							{/* drop shadow */}
							<div
								style={{
									position: 'absolute',
									left: '50%',
									top: globeSize * 0.92,
									width: globeSize * 0.82,
									height: globeSize * 0.16,
									transform: `translateX(-50%) scaleX(${shadowScale})`,
									background:
										'radial-gradient(ellipse, rgba(60,100,140,0.5) 0%, rgba(60,100,140,0) 70%)',
									opacity: shadowOpacity,
									filter: 'blur(8px)',
								}}
							/>
							<div
								style={{
									transform: `translateY(-50%) scale(${globeScale})`,
									opacity: globeOpacity,
									filter: 'drop-shadow(0 20px 40px rgba(50,95,140,0.25))',
								}}
							>
								<Globe size={globeSize} />
							</div>
						</div>
					</AbsoluteFill>

					{/* Text block */}
					<AbsoluteFill
						style={{
							alignItems: 'center',
							justifyContent: 'flex-start',
							paddingTop: '18%',
						}}
					>
						<div
							style={{
								fontFamily: 'system-ui, -apple-system, sans-serif',
								fontSize: 150,
								fontWeight: 800,
								letterSpacing: -2,
								color: 'white',
								lineHeight: 1,
								opacity: t1.opacity,
								filter: `blur(${t1.blur}px)`,
								transform: `translateY(${t1.translateY}px) scale(${t1.scale})`,
								textShadow: '0 4px 30px rgba(255,255,255,0.45)',
							}}
						>
							{title}
						</div>
						<div
							style={{
								fontFamily: 'system-ui, -apple-system, sans-serif',
								fontSize: 110,
								fontWeight: 800,
								letterSpacing: -1,
								color: 'white',
								marginTop: 6,
								opacity: t2.opacity,
								filter: `blur(${t2.blur}px)`,
								transform: `translateY(${t2.translateY}px) scale(${t2.scale})`,
								textShadow: '0 4px 30px rgba(255,255,255,0.45)',
							}}
						>
							{subtitle}
						</div>
					</AbsoluteFill>
				</AbsoluteFill>
			</CameraMotionBlur>
		</AbsoluteFill>
	);
};
