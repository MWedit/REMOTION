import {useCurrentFrame} from 'remotion';
import {glow, LUX} from '../lux';
import {LuxLayout} from '../LuxScaffold';
import {AnimatedLetters, Particles, usePop} from '../motion';

// Energetic but premium CTA — bouncing outlined button + strong glow pulse.
export const CtaLux: React.FC<{topLine?: string}> = ({
	topLine = 'Míralo hasta el final',
}) => {
	const frame = useCurrentFrame();
	const top = usePop(4, {damping: 12});
	const btn = usePop(16, {damping: 8, stiffness: 150});

	const bounce = 1 + Math.sin(frame * 0.16) * 0.03;
	const glowPulse = 0.35 + (Math.sin(frame * 0.16) * 0.5 + 0.5) * 0.45;
	const arrowX = Math.sin(frame * 0.18) * 8;

	return (
		<LuxLayout decor={<Particles count={24} seed="cta" />}>
			<div style={{opacity: top.opacity, transform: `translateY(${top.y}px)`}}>
				<div style={{color: LUX.silver, fontSize: 60, fontWeight: 300, letterSpacing: 2}}>
					{topLine}
				</div>
			</div>

			<div
				style={{
					marginTop: 20,
					display: 'flex',
					alignItems: 'center',
					gap: 18,
					padding: '34px 84px',
					borderRadius: 999,
					border: `2px solid rgba(255,255,255,0.75)`,
					opacity: btn.opacity,
					transform: `scale(${btn.scale * bounce})`,
					boxShadow: `0 0 ${50 * glowPulse}px rgba(255,255,255,${glowPulse})`,
					filter: glow(8, 0.35),
				}}
			>
				<AnimatedLetters
					text="SABER MÁS"
					start={18}
					stagger={2}
					fontSize={64}
					fontWeight={400}
					letterSpacing={6}
					glowPx={6}
				/>
				<span style={{color: LUX.neon, fontSize: 56, transform: `translateX(${arrowX}px)`, filter: glow(10, 0.6)}}>
					→
				</span>
			</div>
		</LuxLayout>
	);
};
