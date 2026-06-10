import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {glow, LUX} from '../lux';
import {Kicker, LuxLayout} from '../LuxScaffold';
import {AnimatedLetters, Particles, usePop} from '../motion';

// "Equipo dedicado" — row of avatar dots popping in around the title.
export const TeamLux: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const sub = usePop(26, {damping: 12});

	return (
		<LuxLayout decor={<Particles count={22} seed="team" />}>
			<Kicker start={2}>Detrás de ti</Kicker>

			{/* avatar dots */}
			<div style={{display: 'flex', gap: 22, marginBottom: 8}}>
				{[0, 1, 2, 3, 4].map((i) => {
					const s = spring({
						fps,
						frame: frame - 6 - i * 4,
						config: {damping: 10, stiffness: 180, mass: 0.6},
					});
					const breath = 1 + Math.sin(frame * 0.14 + i) * 0.05;
					return (
						<div
							key={i}
							style={{
								width: 86,
								height: 86,
								borderRadius: '50%',
								border: `1.5px solid rgba(255,255,255,0.5)`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								background: 'rgba(255,255,255,0.04)',
								transform: `scale(${s * breath})`,
								boxShadow: '0 0 24px rgba(255,255,255,0.12)',
							}}
						>
							<svg width={44} height={44} viewBox="0 0 24 24" fill={LUX.silver} opacity={0.9}>
								<circle cx="12" cy="8" r="4" />
								<path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
							</svg>
						</div>
					);
				})}
			</div>

			<AnimatedLetters
				text="EQUIPO DEDICADO"
				start={14}
				stagger={1.8}
				fontSize={92}
				fontWeight={400}
				letterSpacing={4}
				glowPx={14}
			/>
			<div style={{color: LUX.silver, fontSize: 44, fontWeight: 300, letterSpacing: 2, opacity: sub.opacity, transform: `translateY(${sub.y}px)`, filter: glow(6, 0.25)}}>
				para hacer que esto suceda
			</div>
		</LuxLayout>
	);
};
