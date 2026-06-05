import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, goldText} from '../theme';
import {ShieldCheckIcon} from '../Icons';
import {CardLayout, Kicker, useHeroPop} from '../cards/Scaffold';

// "Es algo comprobado" — verified shield badge.
export const Proven: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = useHeroPop(8);
	const iconO = interpolate(frame, [0, 12], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: (t) => 1 - Math.pow(1 - t, 3),
	});
	return (
		<CardLayout transparent>
			<div
				style={{
					opacity: iconO,
					transform: `scale(${0.7 + iconO * 0.3})`,
				}}
			>
				<ShieldCheckIcon size={140} />
			</div>
			<Kicker>De verdad</Kicker>
			<div
				style={{
					...goldText,
					fontSize: 150,
					fontWeight: 800,
					letterSpacing: -3,
					lineHeight: 1,
					transform: `scale(${hero.scale})`,
					opacity: hero.opacity,
					filter: `drop-shadow(0 0 ${hero.glow}px rgba(244,207,106,0.65))`,
				}}
			>
				COMPROBADO
			</div>
			<div style={{color: COLORS.white, fontSize: 64, fontWeight: 500, opacity: hero.opacity}}>
				y 100% real
			</div>
		</CardLayout>
	);
};
