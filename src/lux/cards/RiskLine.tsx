import {interpolate, useCurrentFrame} from 'remotion';
import {EASE_OUT, glow, LUX} from '../lux';
import {Kicker, LuxLayout} from '../LuxScaffold';
import {Particles, usePop} from '../motion';

const PTS: [number, number][] = [
	[20, 60],
	[110, 84],
	[200, 74],
	[290, 132],
	[380, 150],
	[470, 214],
	[580, 248],
];

const pointAt = (p: number): [number, number] => {
	const segLen = PTS.slice(1).map((pt, i) => Math.hypot(pt[0] - PTS[i][0], pt[1] - PTS[i][1]));
	const total = segLen.reduce((a, b) => a + b, 0);
	let target = p * total;
	for (let i = 0; i < segLen.length; i++) {
		if (target <= segLen[i]) {
			const t = segLen[i] === 0 ? 0 : target / segLen[i];
			return [
				PTS[i][0] + (PTS[i + 1][0] - PTS[i][0]) * t,
				PTS[i][1] + (PTS[i + 1][1] - PTS[i][1]) * t,
			];
		}
		target -= segLen[i];
	}
	return PTS[PTS.length - 1];
};

export const RiskLine: React.FC = () => {
	const frame = useCurrentFrame();
	const sub = usePop(28, {damping: 11});

	const draw = interpolate(frame, [6, 34], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});
	const d = `M ${PTS.map((p) => p.join(' ')).join(' L ')}`;
	const [dotX, dotY] = pointAt(draw);
	const dotPulse = 6 + (Math.sin(frame * 0.3) * 0.5 + 0.5) * 5;

	return (
		<LuxLayout decor={<Particles count={20} seed="risk" />}>
			<Kicker start={2}>Jubilación del gobierno</Kicker>

			<svg width={760} height={330} viewBox="0 0 600 280" style={{overflow: 'visible'}}>
				{[60, 120, 180, 240].map((y, i) => {
					const gi = interpolate(frame, [i * 2, i * 2 + 10], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					return (
						<line
							key={y}
							x1="0"
							y1={y}
							x2={600 * gi}
							y2={y}
							stroke={LUX.lineDim}
							strokeWidth="1"
						/>
					);
				})}
				<path
					d={d}
					fill="none"
					stroke={LUX.risk}
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
					pathLength={1}
					strokeDasharray={1}
					strokeDashoffset={1 - draw}
					style={{filter: glow(12, 0.5)}}
				/>
				<circle cx={dotX} cy={dotY} r={dotPulse} fill={LUX.neon} style={{filter: glow(16, 1)}} />
			</svg>

			<div style={{transform: `translateY(${sub.y}px) scale(${sub.scale})`, opacity: sub.opacity}}>
				<div style={{color: LUX.silver, fontSize: 76, fontWeight: 300, letterSpacing: 1, filter: glow(8, 0.3)}}>
					un plan <span style={{fontWeight: 600, color: LUX.neon}}>arriesgado</span>
				</div>
			</div>
		</LuxLayout>
	);
};
