import {interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, goldText} from '../theme';
import {CardLayout, Kicker, useHeroPop} from './Scaffold';

const formatES = (n: number) =>
	Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Card 6 — "+30.000 personas" counting up over a grid of avatars.
export const Members: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const hero = useHeroPop(8);

	const count = interpolate(frame, [10, 42], [0, 30000], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: (t) => 1 - Math.pow(1 - t, 3),
	});

	const COLS = 9;
	const ROWS = 4;

	return (
		<CardLayout glow>
			<Kicker>Ya forman parte</Kicker>
			<div
				style={{
					...goldText,
					fontSize: 230,
					fontWeight: 800,
					letterSpacing: -6,
					lineHeight: 1,
					transform: `scale(${hero.scale})`,
					opacity: hero.opacity,
					filter: `drop-shadow(0 0 ${hero.glow}px rgba(244,207,106,0.6))`,
				}}
			>
				+{formatES(count)}
			</div>
			<div style={{color: COLORS.white, fontSize: 72, fontWeight: 600, opacity: hero.opacity}}>
				personas
			</div>

			{/* avatar grid popping in */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${COLS}, 1fr)`,
					gap: 22,
					marginTop: 40,
				}}
			>
				{new Array(COLS * ROWS).fill(true).map((_, i) => {
					const s = spring({
						fps,
						frame: frame - 14 - random(`m-${i}`) * 16,
						config: {damping: 12, stiffness: 140, mass: 0.5},
					});
					return (
						<div
							key={i}
							style={{
								width: 58,
								height: 58,
								borderRadius: '50%',
								border: `2px solid ${COLORS.line}`,
								background: 'rgba(244,207,106,0.10)',
								transform: `scale(${s})`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<svg width={30} height={30} viewBox="0 0 24 24" fill={COLORS.gold} opacity={0.85}>
								<circle cx="12" cy="8" r="4" />
								<path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
							</svg>
						</div>
					);
				})}
			</div>
		</CardLayout>
	);
};
