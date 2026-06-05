import {useCurrentFrame} from 'remotion';
import {glow, LUX} from '../lux';
import {LuxLayout, useReveal} from '../LuxScaffold';

// Restrained premium CTA — thin outlined "SABER MÁS" with a gentle breath.
export const CtaLux: React.FC = () => {
	const frame = useCurrentFrame();
	const top = useReveal(8, 28);
	const btn = useReveal(20, 30);

	const breath = 1 + Math.sin(frame * 0.09) * 0.012;
	const glowPulse = 0.3 + (Math.sin(frame * 0.09) * 0.5 + 0.5) * 0.25;

	return (
		<LuxLayout>
			<div
				style={{
					color: LUX.silver,
					fontSize: 60,
					fontWeight: 300,
					letterSpacing: 2,
					opacity: top.opacity,
					transform: `translateY(${top.y}px)`,
				}}
			>
				Míralo hasta el final
			</div>

			<div
				style={{
					marginTop: 20,
					padding: '34px 92px',
					borderRadius: 999,
					border: `1.5px solid rgba(255,255,255,0.6)`,
					color: LUX.neon,
					fontSize: 64,
					fontWeight: 300,
					letterSpacing: 6,
					opacity: btn.opacity,
					transform: `translateY(${btn.y}px) scale(${breath})`,
					boxShadow: `0 0 ${40 * glowPulse}px rgba(255,255,255,${glowPulse})`,
					filter: glow(6, 0.3),
				}}
			>
				SABER MÁS
			</div>
		</LuxLayout>
	);
};
