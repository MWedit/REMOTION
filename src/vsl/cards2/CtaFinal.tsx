import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, GOLD_GRADIENT, FONT} from '../theme';
import {CursorIcon} from '../Icons';
import {CardLayout} from '../cards/Scaffold';

// Final CTA — "Mira hasta el final" + pulsing "SABER MÁS" with tapping cursor.
export const CtaFinal: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const textO = interpolate(frame, [4, 14], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const btn = spring({fps, frame: frame - 10, config: {damping: 12, stiffness: 120, mass: 0.6}});
	const pulse = 1 + Math.sin(frame * 0.16) * 0.03;

	const tapCycle = 30;
	const tp = (frame - 18) % tapCycle;
	const tap = interpolate(tp, [0, 5, 10], [0, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const cursorY = -tap * 14;
	const press = 1 - tap * 0.06;

	return (
		<CardLayout transparent glow>
			<div
				style={{
					color: COLORS.white,
					fontSize: 70,
					fontWeight: 600,
					opacity: textO,
					transform: `translateY(${(1 - textO) * 16}px)`,
					marginBottom: 22,
					fontFamily: FONT,
				}}
			>
				Mira hasta el final
			</div>

			<div style={{position: 'relative', transform: `scale(${btn * pulse * press})`, opacity: btn}}>
				<div
					style={{
						padding: '40px 96px',
						borderRadius: 999,
						background: GOLD_GRADIENT,
						color: '#1a1205',
						fontSize: 82,
						fontWeight: 800,
						letterSpacing: 1,
						fontFamily: FONT,
						boxShadow: '0 22px 70px rgba(244,207,106,0.5)',
					}}
				>
					SABER MÁS
				</div>
				<div
					style={{
						position: 'absolute',
						right: 80,
						bottom: -50,
						transform: `translateY(${cursorY}px)`,
					}}
				>
					<CursorIcon size={84} />
				</div>
			</div>
		</CardLayout>
	);
};
