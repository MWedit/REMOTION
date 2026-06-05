import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, goldText} from '../theme';
import {CashIcon} from '../Icons';
import {CardLayout, Kicker, useHeroPop} from '../cards/Scaffold';

// "$50 – $250 por semana"
export const WeeklyEarnings: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = useHeroPop(6);
	const iconO = interpolate(frame, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<CardLayout transparent>
			<div style={{opacity: iconO, transform: `translateY(${(1 - iconO) * 18}px)`}}>
				<CashIcon size={92} />
			</div>
			<Kicker>Ganancia semanal</Kicker>
			<div
				style={{
					...goldText,
					fontSize: 142,
					fontWeight: 800,
					letterSpacing: -3,
					lineHeight: 1,
					whiteSpace: 'nowrap',
					transform: `scale(${hero.scale})`,
					opacity: hero.opacity,
					filter: `drop-shadow(0 0 ${hero.glow}px rgba(244,207,106,0.65))`,
				}}
			>
				$50 – $250
			</div>
			<div style={{color: COLORS.white, fontSize: 68, fontWeight: 500, opacity: hero.opacity}}>
				por semana
			</div>
		</CardLayout>
	);
};
