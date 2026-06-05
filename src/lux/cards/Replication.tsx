import {interpolate, useCurrentFrame} from 'remotion';
import {EASE_OUT, glow, LUX} from '../lux';
import {LuxLayout} from '../LuxScaffold';
import {AnimatedLetters, Particles, usePop} from '../motion';

const AccountCard: React.FC<{label: string; sub: string; pop: ReturnType<typeof usePop>}> = ({
	label,
	sub,
	pop,
}) => {
	const frame = useCurrentFrame();
	const breath = 1 + Math.sin(frame * 0.12) * 0.015;
	return (
		<div
			style={{
				width: 300,
				height: 190,
				borderRadius: 18,
				border: `1.5px solid rgba(255,255,255,0.4)`,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 12,
				background: 'rgba(255,255,255,0.03)',
				boxShadow: `0 0 ${30 + Math.sin(frame * 0.12) * 18}px rgba(255,255,255,0.1)`,
				opacity: pop.opacity,
				transform: `scale(${pop.scale * breath})`,
			}}
		>
			<div style={{color: LUX.neon, fontSize: 44, fontWeight: 400, letterSpacing: 2}}>{label}</div>
			<div style={{color: LUX.muted, fontSize: 26, fontWeight: 300, letterSpacing: 3}}>{sub}</div>
		</div>
	);
};

export const Replication: React.FC = () => {
	const frame = useCurrentFrame();
	const left = usePop(8, {damping: 12});
	const right = usePop(16, {damping: 12});

	const lineGrow = interpolate(frame, [22, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});

	// three pulses chasing along the connector
	const pulses = [0, 15, 30].map((off) => {
		const t = ((frame - 40 - off) % 30) / 30;
		return {x: interpolate(t, [0, 1], [0, 150]), on: frame > 40 + off && lineGrow > 0.85, op: interpolate(t, [0, 0.1, 0.9, 1], [0, 1, 1, 0])};
	});

	return (
		<LuxLayout decor={<Particles count={20} seed="rep" />}>
			<div style={{transform: `translateY(${(1 - left.s) * 20}px)`, opacity: left.opacity}}>
				<div style={{color: LUX.silver, fontSize: 58, fontWeight: 300, letterSpacing: 1}}>
					Se replica en <span style={{fontWeight: 600, color: LUX.neon}}>tu cuenta</span>
				</div>
			</div>

			<div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
				<AccountCard label="MI CUENTA" sub="OPERO" pop={left} />

				<div style={{position: 'relative', width: 150, height: 4}}>
					<div
						style={{
							position: 'absolute',
							top: 1,
							height: 2,
							width: '100%',
							background: LUX.line,
							transform: `scaleX(${lineGrow})`,
							transformOrigin: 'left',
							filter: glow(6, 0.5),
						}}
					/>
					{pulses.map((p, i) =>
						p.on ? (
							<div
								key={i}
								style={{
									position: 'absolute',
									top: -4,
									left: p.x,
									width: 12,
									height: 12,
									borderRadius: '50%',
									background: LUX.neon,
									opacity: p.op,
									filter: glow(14, 1),
								}}
							/>
						) : null,
					)}
				</div>

				<AccountCard label="TU CUENTA" sub="GANAS" pop={right} />
			</div>

			<div style={{marginTop: 28}}>
				<AnimatedLetters
					text="100% AUTOMÁTICO · GRATUITO"
					start={44}
					stagger={1.2}
					fontSize={40}
					fontWeight={300}
					letterSpacing={6}
					color={LUX.muted}
					glowPx={6}
				/>
			</div>
		</LuxLayout>
	);
};
