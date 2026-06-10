import {random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {glow, LUX} from '../lux';
import {Kicker, LuxLayout} from '../LuxScaffold';
import {Particles, PulseRing, useCountUp, usePop} from '../motion';

const formatES = (n: number) =>
	Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// "+30.000 personas" — fast count-up, pulsing rings, avatar grid popping in.
export const MembersLux: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const hero = usePop(4, {damping: 9, stiffness: 160});
	const count = useCountUp(30000, 4, 30);
	const sub = usePop(20, {damping: 12});
	const glowPulse = 16 + (Math.sin(frame * 0.22) * 0.5 + 0.5) * 14;

	const COLS = 9;
	const ROWS = 3;

	return (
		<LuxLayout decor={<Particles count={24} seed="mem" />}>
			<Kicker start={2}>Ya forman parte</Kicker>
			<div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<PulseRing delay={22} period={36} max={760} />
				<div
					style={{
						color: LUX.neon,
						fontSize: 190,
						fontWeight: 200,
						letterSpacing: -5,
						lineHeight: 1,
						opacity: hero.opacity,
						transform: `scale(${hero.scale})`,
						filter: glow(glowPulse, 0.55),
					}}
				>
					+{formatES(count)}
				</div>
			</div>
			<div style={{color: LUX.silver, fontSize: 56, fontWeight: 300, letterSpacing: 4, opacity: sub.opacity, transform: `translateY(${sub.y}px)`}}>
				personas
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${COLS}, 1fr)`,
					gap: 20,
					marginTop: 30,
				}}
			>
				{new Array(COLS * ROWS).fill(true).map((_, i) => {
					const s = spring({
						fps,
						frame: frame - 12 - random(`ml-${i}`) * 14,
						config: {damping: 10, stiffness: 190, mass: 0.5},
					});
					return (
						<div
							key={i}
							style={{
								width: 56,
								height: 56,
								borderRadius: '50%',
								border: `1px solid rgba(255,255,255,0.3)`,
								background: 'rgba(255,255,255,0.04)',
								transform: `scale(${s})`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<svg width={26} height={26} viewBox="0 0 24 24" fill={LUX.silver} opacity={0.8}>
								<circle cx="12" cy="8" r="4" />
								<path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
							</svg>
						</div>
					);
				})}
			</div>
		</LuxLayout>
	);
};
