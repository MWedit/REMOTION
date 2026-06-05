import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, goldText} from '../theme';
import {GiftIcon} from '../Icons';
import {CardLayout, Kicker, useHeroPop} from '../cards/Scaffold';

// "100% gratuita"
export const FreeAccess: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = useHeroPop(8);
	const iconO = interpolate(frame, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<CardLayout transparent>
			<div style={{opacity: iconO, transform: `translateY(${(1 - iconO) * 18}px)`}}>
				<GiftIcon size={104} />
			</div>
			<Kicker>Acceso a la herramienta</Kicker>
			<div
				style={{
					...goldText,
					fontSize: 200,
					fontWeight: 800,
					letterSpacing: -6,
					lineHeight: 1,
					transform: `scale(${hero.scale})`,
					opacity: hero.opacity,
					filter: `drop-shadow(0 0 ${hero.glow}px rgba(244,207,106,0.7))`,
				}}
			>
				100% GRATIS
			</div>
			<div style={{color: COLORS.white, fontSize: 64, fontWeight: 500, opacity: hero.opacity}}>
				sin pagar nada
			</div>
		</CardLayout>
	);
};
