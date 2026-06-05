import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, GOLD_GRADIENT, goldText} from '../theme';
import {CalendarIcon} from '../Icons';
import {CardLayout, Kicker, useHeroPop} from './Scaffold';

// Card 2 — "3 MESES" with three month blocks filling in.
export const Term: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const hero = useHeroPop(8);
	const iconO = interpolate(frame, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<CardLayout>
			<div style={{opacity: iconO, transform: `translateY(${(1 - iconO) * 20}px)`}}>
				<CalendarIcon size={96} />
			</div>
			<Kicker>Plazo</Kicker>
			<div
				style={{
					...goldText,
					fontSize: 210,
					fontWeight: 800,
					letterSpacing: -4,
					lineHeight: 1,
					transform: `scale(${hero.scale})`,
					opacity: hero.opacity,
					filter: `drop-shadow(0 0 ${hero.glow}px rgba(244,207,106,0.55))`,
				}}
			>
				3 MESES
			</div>

			{/* three month blocks filling staggered */}
			<div style={{display: 'flex', gap: 26, marginTop: 24}}>
				{[0, 1, 2].map((i) => {
					const f = spring({
						fps,
						frame: frame - 16 - i * 8,
						config: {damping: 200},
					});
					return (
						<div
							key={i}
							style={{
								width: 150,
								height: 22,
								borderRadius: 11,
								border: `2px solid ${COLORS.line}`,
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									width: `${f * 100}%`,
									height: '100%',
									background: GOLD_GRADIENT,
								}}
							/>
						</div>
					);
				})}
			</div>
		</CardLayout>
	);
};
