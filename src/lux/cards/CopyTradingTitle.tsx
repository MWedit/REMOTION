import {interpolate, useCurrentFrame} from 'remotion';
import {EASE_OUT, glow, LUX} from '../lux';
import {Kicker, LuxLayout, useReveal} from '../LuxScaffold';

// Elegant title reveal — "COPY TRADING" with a thin drawing underline.
export const CopyTradingTitle: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = useReveal(8, 28);

	// letter-spacing settles in slowly
	const tracking = interpolate(frame, [8, 40], [22, 8], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});
	const underline = interpolate(frame, [20, 52], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});

	return (
		<LuxLayout>
			<Kicker start={4}>La alternativa</Kicker>
			<div
				style={{
					color: LUX.neon,
					fontSize: 118,
					fontWeight: 300,
					letterSpacing: tracking,
					opacity: hero.opacity,
					transform: `translateY(${hero.y}px)`,
					filter: glow(14, 0.4),
				}}
			>
				COPY TRADING
			</div>
			<div
				style={{
					width: 520,
					height: 2,
					background: LUX.line,
					transform: `scaleX(${underline})`,
					filter: glow(8, 0.5),
				}}
			/>
		</LuxLayout>
	);
};
