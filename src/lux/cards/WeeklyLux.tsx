import {useCurrentFrame} from 'remotion';
import {glow, LUX} from '../lux';
import {Kicker, LuxLayout} from '../LuxScaffold';
import {Particles, useCountUp, usePop} from '../motion';

// "$300 – $750 por semana" — double count-up hero.
export const WeeklyLux: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = usePop(4, {damping: 9, stiffness: 160});
	const a = useCountUp(300, 4, 20);
	const b = useCountUp(750, 8, 22);
	const glowPulse = 16 + (Math.sin(frame * 0.22) * 0.5 + 0.5) * 14;

	return (
		<LuxLayout decor={<Particles count={24} seed="wk" />}>
			<Kicker start={2}>Ganancia semanal</Kicker>
			<div
				style={{
					color: LUX.neon,
					fontSize: 150,
					fontWeight: 200,
					letterSpacing: -3,
					lineHeight: 1,
					whiteSpace: 'nowrap',
					opacity: hero.opacity,
					transform: `scale(${hero.scale})`,
					filter: glow(glowPulse, 0.5),
				}}
			>
				${Math.round(a)} – ${Math.round(b)}
			</div>
			<div style={{color: LUX.silver, fontSize: 52, fontWeight: 300, letterSpacing: 3, opacity: hero.opacity}}>
				por semana
			</div>
		</LuxLayout>
	);
};
