import {interpolate, useCurrentFrame} from 'remotion';
import {glow, LUX} from '../lux';
import {Kicker, LuxLayout} from '../LuxScaffold';
import {Particles, useCountUp, usePop, useSheen} from '../motion';

const Row: React.FC<{label: string; value: string; start: number; bright?: boolean}> = ({
	label,
	value,
	start,
	bright,
}) => {
	const pop = usePop(start, {damping: 12, stiffness: 170});
	return (
		<div
			style={{
				width: 640,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'baseline',
				opacity: pop.opacity,
				transform: `translateX(${(1 - pop.s) * (bright ? -40 : 40)}px)`,
			}}
		>
			<span style={{color: bright ? LUX.silver : LUX.muted, fontSize: 44, fontWeight: 300, letterSpacing: 1}}>
				{label}
			</span>
			<span
				style={{
					color: bright ? LUX.neon : LUX.silver,
					fontSize: 56,
					fontWeight: bright ? 600 : 300,
					filter: bright ? glow(12, 0.5) : undefined,
				}}
			>
				{value}
			</span>
		</div>
	);
};

export const Breakdown: React.FC = () => {
	const frame = useCurrentFrame();
	const hero = usePop(4, {damping: 9, stiffness: 160});
	const c100 = useCountUp(100, 4, 22);

	const bar = interpolate(frame, [26, 46], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: (t) => 1 - Math.pow(1 - t, 3),
	});
	const sheen = useSheen(48, 50);

	return (
		<LuxLayout decor={<Particles count={22} seed="bd" />}>
			<Kicker start={2}>Si ganas</Kicker>
			<div
				style={{
					color: LUX.neon,
					fontSize: 200,
					fontWeight: 200,
					letterSpacing: -4,
					lineHeight: 1,
					opacity: hero.opacity,
					transform: `scale(${hero.scale})`,
					filter: glow(22, 0.5),
				}}
			>
				${Math.round(c100)}
			</div>

			{/* 90 / 10 split bar with a sweeping sheen */}
			<div style={{position: 'relative', display: 'flex', gap: 6, width: 640, height: 14, marginTop: 14, overflow: 'hidden'}}>
				<div style={{width: `${90 * bar}%`, height: '100%', borderRadius: 7, background: LUX.silver, opacity: 0.7}} />
				<div style={{width: `${10 * bar}%`, height: '100%', borderRadius: 7, background: LUX.neon, filter: glow(10, 0.7)}} />
				{sheen >= 0 ? (
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: `${sheen * 100}%`,
							width: 100,
							height: '100%',
							marginLeft: -50,
							background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
						}}
					/>
				) : null}
			</div>

			<div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30}}>
				<Row label="Tú recibes" value="$90" start={48} bright />
				<Row label="Mi parte · 10%" value="$10" start={56} />
			</div>
		</LuxLayout>
	);
};
