import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, goldText} from '../theme';
import {CardLayout, Kicker, useHeroPop} from './Scaffold';

// Card 3 — "10%" with a donut sweeping to a 10% gold slice.
export const TenPercent: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = useHeroPop(8);

	const R = 40;
	const C = 2 * Math.PI * R;
	const sweep = interpolate(frame, [12, 34], [0, 0.1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const ringO = interpolate(frame, [6, 16], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<CardLayout>
			<div style={{opacity: ringO}}>
				<svg width={150} height={150} viewBox="0 0 100 100">
					<circle cx="50" cy="50" r={R} fill="none" stroke={COLORS.line} strokeWidth="9" />
					<circle
						cx="50"
						cy="50"
						r={R}
						fill="none"
						stroke={COLORS.gold}
						strokeWidth="9"
						strokeLinecap="round"
						strokeDasharray={`${C * sweep} ${C}`}
						transform="rotate(-90 50 50)"
					/>
				</svg>
			</div>
			<Kicker>Tú solo pagas</Kicker>
			<div
				style={{
					...goldText,
					fontSize: 300,
					fontWeight: 800,
					letterSpacing: -8,
					lineHeight: 1,
					transform: `scale(${hero.scale})`,
					opacity: hero.opacity,
					filter: `drop-shadow(0 0 ${hero.glow}px rgba(244,207,106,0.6))`,
				}}
			>
				10%
			</div>
			<div style={{color: COLORS.white, fontSize: 64, fontWeight: 500, opacity: hero.opacity}}>
				de las ganancias
			</div>
		</CardLayout>
	);
};
