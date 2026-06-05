import {interpolate, useCurrentFrame} from 'remotion';
import {EASE_OUT, glow, LUX} from '../lux';
import {Kicker, LuxLayout, useReveal} from '../LuxScaffold';

const Row: React.FC<{label: string; value: string; start: number; bright?: boolean}> = ({
	label,
	value,
	start,
	bright,
}) => {
	const {opacity, y} = useReveal(start, 26);
	return (
		<div
			style={{
				width: 640,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'baseline',
				opacity,
				transform: `translateY(${y}px)`,
			}}
		>
			<span style={{color: bright ? LUX.silver : LUX.muted, fontSize: 44, fontWeight: 300, letterSpacing: 1}}>
				{label}
			</span>
			<span
				style={{
					color: bright ? LUX.neon : LUX.silver,
					fontSize: 56,
					fontWeight: bright ? 500 : 300,
					filter: bright ? glow(10, 0.4) : undefined,
				}}
			>
				{value}
			</span>
		</div>
	);
};

// "$100 → tú $90 / mi parte $10".
export const Breakdown: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = useReveal(8, 28);

	const bar = interpolate(frame, [30, 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});

	return (
		<LuxLayout>
			<Kicker start={4}>Si ganas</Kicker>
			<div
				style={{
					color: LUX.neon,
					fontSize: 200,
					fontWeight: 200,
					letterSpacing: -4,
					lineHeight: 1,
					opacity: hero.opacity,
					transform: `translateY(${hero.y}px)`,
					filter: glow(20, 0.45),
				}}
			>
				$100
			</div>

			{/* 90 / 10 split bar */}
			<div style={{display: 'flex', gap: 6, width: 640, height: 12, marginTop: 14}}>
				<div
					style={{
						width: `${90 * bar}%`,
						height: '100%',
						borderRadius: 6,
						background: LUX.silver,
						opacity: 0.7,
					}}
				/>
				<div
					style={{
						width: `${10 * bar}%`,
						height: '100%',
						borderRadius: 6,
						background: LUX.neon,
						filter: glow(8, 0.6),
					}}
				/>
			</div>

			<div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30}}>
				<Row label="Tú recibes" value="$90" start={56} bright />
				<Row label="Mi parte · 10%" value="$10" start={66} />
			</div>
		</LuxLayout>
	);
};
