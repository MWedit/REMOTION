import {interpolate, useCurrentFrame} from 'remotion';
import {EASE_OUT, glow, LUX} from '../lux';
import {Kicker, LuxLayout} from '../LuxScaffold';
import {Particles, PulseRing, useCountUp, usePop} from '../motion';

// "El 10% de la ganancia" — count-up + pulsing rings, more energetic.
export const TenPercentLux: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = usePop(8, {damping: 9, stiffness: 160});
	const count = useCountUp(10, 8, 24);

	const R = 150;
	const ring = interpolate(frame, [6, 34], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});
	const glowPulse = 14 + (Math.sin(frame * 0.22) * 0.5 + 0.5) * 16;

	return (
		<LuxLayout decor={<Particles count={22} seed="ten" />}>
			<Kicker start={2}>Mi parte</Kicker>
			<div style={{position: 'relative', width: 380, height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				{/* energetic radiating rings */}
				<PulseRing delay={20} period={36} max={420} />
				<PulseRing delay={38} period={36} max={420} />

				<svg width={380} height={380} viewBox="0 0 380 380" style={{position: 'absolute', overflow: 'visible'}}>
					<circle cx="190" cy="190" r={R} fill="none" stroke={LUX.lineDim} strokeWidth="1.5" />
					<circle
						cx="190"
						cy="190"
						r={R}
						fill="none"
						stroke={LUX.neon}
						strokeWidth="2.5"
						strokeLinecap="round"
						pathLength={1}
						strokeDasharray={1}
						strokeDashoffset={1 - ring}
						transform="rotate(-90 190 190)"
						style={{filter: glow(12, 0.6)}}
					/>
				</svg>
				<div
					style={{
						color: LUX.neon,
						fontSize: 180,
						fontWeight: 200,
						letterSpacing: -4,
						opacity: hero.opacity,
						transform: `scale(${hero.scale})`,
						filter: glow(glowPulse, 0.5),
					}}
				>
					{Math.round(count)}%
				</div>
			</div>
			<div style={{color: LUX.silver, fontSize: 42, fontWeight: 300, letterSpacing: 3, opacity: hero.opacity}}>
				de la ganancia
			</div>
		</LuxLayout>
	);
};
