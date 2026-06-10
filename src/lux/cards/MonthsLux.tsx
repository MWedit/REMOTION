import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {glow, LUX} from '../lux';
import {Kicker, LuxLayout} from '../LuxScaffold';
import {AnimatedLetters, Particles} from '../motion';

// "3 MESES" — letters pop in, three glowing month blocks fill staggered.
export const MonthsLux: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<LuxLayout decor={<Particles count={20} seed="mo" />}>
			<Kicker start={2}>Plazo</Kicker>
			<AnimatedLetters
				text="3 MESES"
				start={4}
				stagger={2.2}
				fontSize={150}
				fontWeight={300}
				letterSpacing={6}
				glowPx={18}
			/>
			<div style={{display: 'flex', gap: 24, marginTop: 22}}>
				{[0, 1, 2].map((i) => {
					const s = spring({
						fps,
						frame: frame - 14 - i * 6,
						config: {damping: 11, stiffness: 170, mass: 0.6},
					});
					return (
						<div
							key={i}
							style={{
								width: 140,
								height: 16,
								borderRadius: 8,
								border: `1.5px solid rgba(255,255,255,0.25)`,
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									width: `${s * 100}%`,
									height: '100%',
									background: LUX.neon,
									filter: glow(8, 0.6),
								}}
							/>
						</div>
					);
				})}
			</div>
		</LuxLayout>
	);
};
