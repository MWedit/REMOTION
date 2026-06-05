import {interpolate, useCurrentFrame} from 'remotion';
import {EASE_OUT, glow, LUX} from '../lux';
import {Kicker, LuxLayout, useReveal} from '../LuxScaffold';

// Declining, glowing terminal-style line — "Jubilación del gobierno: un plan arriesgado".
const PTS: [number, number][] = [
	[20, 60],
	[110, 84],
	[200, 74],
	[290, 132],
	[380, 150],
	[470, 214],
	[580, 248],
];

// Point along the polyline at fraction p (by cumulative length).
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
	const title = useReveal(6, 26);
	const sub = useReveal(40, 26);

	const draw = interpolate(frame, [16, 64], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});
	const d = `M ${PTS.map((p) => p.join(' ')).join(' L ')}`;
	const [dotX, dotY] = pointAt(draw);

	return (
		<LuxLayout>
			<Kicker start={4}>Jubilación del gobierno</Kicker>

			<svg width={760} height={330} viewBox="0 0 600 280" style={{overflow: 'visible'}}>
				{/* faint terminal grid */}
				{[60, 120, 180, 240].map((y) => (
					<line key={y} x1="0" y1={y} x2="600" y2={y} stroke={LUX.lineDim} strokeWidth="1" />
				))}
				{/* declining line */}
				<path
					d={d}
					fill="none"
					stroke={LUX.risk}
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					pathLength={1}
					strokeDasharray={1}
					strokeDashoffset={1 - draw}
					style={{filter: glow(10, 0.4)}}
				/>
				{/* leading glow dot */}
				<circle cx={dotX} cy={dotY} r={6} fill={LUX.neon} style={{filter: glow(12, 0.9)}} />
			</svg>

			<div
				style={{
					color: LUX.silver,
					fontSize: 76,
					fontWeight: 300,
					letterSpacing: 1,
					opacity: title.opacity,
					transform: `translateY(${title.y}px)`,
					filter: glow(8, 0.25),
				}}
			>
				un plan <span style={{fontWeight: 500}}>arriesgado</span>
			</div>
			<div
				style={{
					color: LUX.muted,
					fontSize: 38,
					fontWeight: 300,
					letterSpacing: 2,
					opacity: sub.opacity,
					transform: `translateY(${sub.y}px)`,
				}}
			>
				hoy en día
			</div>
		</LuxLayout>
	);
};
