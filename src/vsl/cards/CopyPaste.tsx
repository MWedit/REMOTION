import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, GOLD_GRADIENT, goldText} from '../theme';
import {CardLayout, useHeroPop} from './Scaffold';

// A small "operación" chip.
const Chip: React.FC<{style?: React.CSSProperties}> = ({style}) => (
	<div
		style={{
			width: 184,
			height: 46,
			borderRadius: 10,
			background: GOLD_GRADIENT,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: '#1a1205',
			fontWeight: 800,
			fontSize: 21,
			letterSpacing: 0.5,
			whiteSpace: 'nowrap',
			...style,
		}}
	>
		OPERACIÓN
	</div>
);

const ClipboardBox: React.FC<{label: string; children?: React.ReactNode}> = ({
	label,
	children,
}) => (
	<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
		<div
			style={{
				width: 240,
				height: 300,
				borderRadius: 22,
				border: `3px solid ${COLORS.line}`,
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'rgba(244,207,106,0.04)',
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: -16,
					width: 90,
					height: 30,
					borderRadius: 8,
					border: `3px solid ${COLORS.line}`,
					background: COLORS.bg,
				}}
			/>
			{children}
		</div>
		<div style={{color: COLORS.mute, fontSize: 30, fontWeight: 600, letterSpacing: 2}}>
			{label}
		</div>
	</div>
);

// Card 4 — "COPIAR Y PEGAR" with a chip flying from one board to the other.
export const CopyPaste: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = useHeroPop(6);

	// chip travels left board -> right board, repeating.
	const cycle = 28;
	const t = (frame - 14) % cycle;
	const p = interpolate(t, [0, cycle * 0.7], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const moving = frame > 14;
	const x = interpolate(p, [0, 1], [0, 470]);
	const pop = interpolate(p, [0.85, 1], [1, 1.12], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<CardLayout>
			<div
				style={{
					...goldText,
					fontSize: 110,
					fontWeight: 800,
					letterSpacing: -2,
					lineHeight: 1,
					transform: `scale(${hero.scale})`,
					opacity: hero.opacity,
					filter: `drop-shadow(0 0 ${hero.glow}px rgba(244,207,106,0.5))`,
				}}
			>
				COPIAR Y PEGAR
			</div>
			<div style={{color: COLORS.white, fontSize: 56, fontWeight: 500, opacity: hero.opacity, marginBottom: 30}}>
				mis operaciones
			</div>

			<div style={{display: 'flex', gap: 70, alignItems: 'center', position: 'relative'}}>
				<ClipboardBox label="MI CANAL">
					<Chip />
				</ClipboardBox>
				<div style={{fontSize: 60, color: COLORS.gold, fontWeight: 800}}>→</div>
				<ClipboardBox label="TÚ">
					<div style={{transform: `scale(${pop})`}}>
						<Chip style={{opacity: p > 0.85 ? 1 : 0}} />
					</div>
				</ClipboardBox>

				{/* the flying duplicate */}
				{moving ? (
					<Chip
						style={{
							position: 'absolute',
							left: 45,
							transform: `translateX(${x}px)`,
							boxShadow: '0 12px 40px rgba(244,207,106,0.35)',
							opacity: p < 0.9 ? 1 : 0,
						}}
					/>
				) : null}
			</div>
		</CardLayout>
	);
};
