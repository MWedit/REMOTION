import {interpolate, useCurrentFrame} from 'remotion';
import {goldText} from '../theme';
import {PhoneIcon, CrossIcon} from '../Icons';
import {CardLayout, Kicker, useHeroPop} from '../cards/Scaffold';

// "Sin tocar tu celular" — phone with a no-touch cross badge.
export const NoPhone: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = useHeroPop(8);
	const iconO = interpolate(frame, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const crossPop = interpolate(frame, [10, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: (t) => 1 - Math.pow(1 - t, 3),
	});
	return (
		<CardLayout transparent>
			<div
				style={{
					position: 'relative',
					opacity: iconO,
					transform: `translateY(${(1 - iconO) * 18}px)`,
				}}
			>
				<PhoneIcon size={130} />
				<div
					style={{
						position: 'absolute',
						right: -22,
						bottom: -16,
						transform: `scale(${crossPop})`,
					}}
				>
					<CrossIcon size={64} />
				</div>
			</div>
			<Kicker>100% automático</Kicker>
			<div
				style={{
					...goldText,
					fontSize: 116,
					fontWeight: 800,
					letterSpacing: -2,
					lineHeight: 1.02,
					transform: `scale(${hero.scale})`,
					opacity: hero.opacity,
					filter: `drop-shadow(0 0 ${hero.glow}px rgba(244,207,106,0.6))`,
				}}
			>
				SIN TOCAR
				<br />
				TU CELULAR
			</div>
		</CardLayout>
	);
};
