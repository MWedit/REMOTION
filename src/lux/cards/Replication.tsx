import {interpolate, useCurrentFrame} from 'remotion';
import {EASE_OUT, glow, LUX} from '../lux';
import {LuxLayout, useReveal} from '../LuxScaffold';

const AccountCard: React.FC<{label: string; sub: string}> = ({label, sub}) => (
	<div
		style={{
			width: 300,
			height: 190,
			borderRadius: 18,
			border: `1.5px solid rgba(255,255,255,0.35)`,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 12,
			background: 'rgba(255,255,255,0.02)',
			boxShadow: '0 0 40px rgba(255,255,255,0.05)',
		}}
	>
		<div style={{color: LUX.neon, fontSize: 44, fontWeight: 400, letterSpacing: 2}}>{label}</div>
		<div style={{color: LUX.muted, fontSize: 26, fontWeight: 300, letterSpacing: 3}}>{sub}</div>
	</div>
);

// "Se replica en tu cuenta — 100% automático y gratuito".
export const Replication: React.FC = () => {
	const frame = useCurrentFrame();
	const title = useReveal(6, 26);
	const left = useReveal(16, 30);
	const right = useReveal(26, 30);
	const sub = useReveal(70, 28);

	const lineGrow = interpolate(frame, [34, 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});
	// pulse travels left -> right, repeating slowly
	const travel = ((frame - 60) % 45) / 45;
	const pulseX = interpolate(travel, [0, 1], [0, 150], {extrapolateLeft: 'clamp'});
	const pulseOn = frame > 60 && lineGrow > 0.9;

	return (
		<LuxLayout>
			<div
				style={{
					color: LUX.silver,
					fontSize: 58,
					fontWeight: 300,
					letterSpacing: 1,
					opacity: title.opacity,
					transform: `translateY(${title.y}px)`,
				}}
			>
				Se replica en <span style={{fontWeight: 500, color: LUX.neon}}>tu cuenta</span>
			</div>

			<div style={{display: 'flex', alignItems: 'center', gap: 0, marginTop: 20}}>
				<div style={{opacity: left.opacity, transform: `translateX(${-left.y}px)`}}>
					<AccountCard label="MI CUENTA" sub="OPERO" />
				</div>

				{/* connector */}
				<div style={{position: 'relative', width: 150, height: 4}}>
					<div
						style={{
							position: 'absolute',
							top: 1,
							left: 0,
							height: 2,
							width: '100%',
							background: LUX.line,
							transform: `scaleX(${lineGrow})`,
							transformOrigin: 'left',
							filter: glow(6, 0.4),
						}}
					/>
					{pulseOn ? (
						<div
							style={{
								position: 'absolute',
								top: -3,
								left: pulseX,
								width: 10,
								height: 10,
								borderRadius: '50%',
								background: LUX.neon,
								filter: glow(12, 0.9),
							}}
						/>
					) : null}
				</div>

				<div style={{opacity: right.opacity, transform: `translateX(${right.y}px)`}}>
					<AccountCard label="TU CUENTA" sub="GANAS" />
				</div>
			</div>

			<div
				style={{
					color: LUX.muted,
					fontSize: 40,
					fontWeight: 300,
					letterSpacing: 6,
					marginTop: 28,
					opacity: sub.opacity,
					transform: `translateY(${sub.y}px)`,
				}}
			>
				100% AUTOMÁTICO · GRATUITO
			</div>
		</LuxLayout>
	);
};
