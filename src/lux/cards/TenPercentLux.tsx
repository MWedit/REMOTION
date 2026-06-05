import {interpolate, useCurrentFrame} from 'remotion';
import {EASE_OUT, glow, LUX} from '../lux';
import {Kicker, LuxLayout, useReveal} from '../LuxScaffold';

// "El 10% de la ganancia" — thin drawing ring around a luminous 10%.
export const TenPercentLux: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = useReveal(14, 30);

	const R = 150;
	const ring = interpolate(frame, [10, 56], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});

	return (
		<LuxLayout>
			<Kicker start={4}>Mi parte</Kicker>
			<div style={{position: 'relative', width: 360, height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<svg width={360} height={360} viewBox="0 0 360 360" style={{position: 'absolute', overflow: 'visible'}}>
					<circle cx="180" cy="180" r={R} fill="none" stroke={LUX.lineDim} strokeWidth="1.5" />
					<circle
						cx="180"
						cy="180"
						r={R}
						fill="none"
						stroke={LUX.neon}
						strokeWidth="2"
						strokeLinecap="round"
						pathLength={1}
						strokeDasharray={1}
						strokeDashoffset={1 - ring}
						transform="rotate(-90 180 180)"
						style={{filter: glow(10, 0.5)}}
					/>
				</svg>
				<div
					style={{
						color: LUX.neon,
						fontSize: 180,
						fontWeight: 200,
						letterSpacing: -4,
						opacity: hero.opacity,
						transform: `translateY(${hero.y * 0.4}px)`,
						filter: glow(18, 0.45),
					}}
				>
					10%
				</div>
			</div>
			<div style={{color: LUX.silver, fontSize: 42, fontWeight: 300, letterSpacing: 3, opacity: hero.opacity}}>
				de la ganancia
			</div>
		</LuxLayout>
	);
};
