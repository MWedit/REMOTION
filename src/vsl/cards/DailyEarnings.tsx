import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, goldText} from '../theme';
import {CashIcon} from '../Icons';
import {CardLayout, Kicker, useHeroPop} from './Scaffold';

// Card 1 — "$70 – $150 por día"
export const DailyEarnings: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = useHeroPop(8);
	const iconO = interpolate(frame, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<CardLayout>
			<div style={{opacity: iconO, transform: `translateY(${(1 - iconO) * 20}px)`}}>
				<CashIcon size={96} />
			</div>
			<Kicker>Ganancia diaria</Kicker>
			<div
				style={{
					...goldText,
					fontSize: 138,
					fontWeight: 800,
					letterSpacing: -3,
					lineHeight: 1,
					whiteSpace: 'nowrap',
					transform: `scale(${hero.scale})`,
					opacity: hero.opacity,
					filter: `drop-shadow(0 0 ${hero.glow}px rgba(244,207,106,0.6))`,
				}}
			>
				$70 – $150
			</div>
			<div style={{color: COLORS.white, fontSize: 70, fontWeight: 500, opacity: hero.opacity}}>
				por día
			</div>
		</CardLayout>
	);
};
