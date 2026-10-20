import {
	AbsoluteFill,
	interpolate,
	random,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {C, IMPACT, SANS, TYPE} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Film grain + vignette + faint flicker, laid over the whole piece.
export const FilmLook: React.FC = () => {
	const frame = useCurrentFrame();
	const flicker = 0.92 + random(`fl-${frame}`) * 0.08;
	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 100%)',
					opacity: flicker,
				}}
			/>
			<svg width="100%" height="100%" style={{position: 'absolute', opacity: 0.13, mixBlendMode: 'overlay'}}>
				<filter id="grain">
					<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={frame % 12} />
					<feColorMatrix type="saturate" values="0" />
				</filter>
				<rect width="100%" height="100%" filter="url(#grain)" />
			</svg>
		</AbsoluteFill>
	);
};

// Decaying camera shake that kicks in at `at`.
export const useShake = (at: number, strength = 26, length = 14) => {
	const frame = useCurrentFrame();
	const t = frame - at;
	if (t < 0 || t > length) return {x: 0, y: 0, r: 0};
	const decay = 1 - t / length;
	return {
		x: (random(`sx-${at}-${t}`) - 0.5) * 2 * strength * decay,
		y: (random(`sy-${at}-${t}`) - 0.5) * 2 * strength * decay,
		r: (random(`sr-${at}-${t}`) - 0.5) * 2 * 1.2 * decay,
	};
};

export type Word = {t: string; mark?: 'red' | 'yellow'};

// Word-by-word kinetic typography; marked words get a marker that wipes in.
export const KineticLine: React.FC<{
	words: Word[];
	start: number;
	stagger?: number;
	size?: number;
	color?: string;
	font?: string;
	weight?: number;
}> = ({words, start, stagger = 4, size = 84, color = C.white, font = SANS, weight = 600}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				columnGap: size * 0.28,
				rowGap: size * 0.12,
				fontFamily: font,
				fontWeight: weight,
				fontSize: size,
				lineHeight: 1.08,
				textAlign: 'center',
			}}
		>
			{words.map((w, i) => {
				const at = start + i * stagger;
				const s = spring({fps, frame: frame - at, config: {damping: 12, stiffness: 190, mass: 0.6}});
				const markIn = interpolate(frame, [at + 4, at + 12], [0, 1], clamp);
				const markColor = w.mark === 'red' ? C.red : C.highlight;
				const textColor = w.mark === 'yellow' && markIn > 0.5 ? C.ink : color;
				return (
					<span
						key={i}
						style={{
							position: 'relative',
							display: 'inline-block',
							padding: w.mark ? `0 ${size * 0.12}px` : 0,
							color: textColor,
							opacity: interpolate(s, [0, 0.5], [0, 1], clamp),
							transform: `translateY(${(1 - s) * 50}px) scale(${interpolate(s, [0, 1], [0.6, 1])})`,
							filter: `blur(${(1 - s) * 8}px)`,
						}}
					>
						{w.mark ? (
							<span
								style={{
									position: 'absolute',
									left: 0,
									right: 0,
									top: '8%',
									bottom: '4%',
									background: markColor,
									transform: `scaleX(${markIn}) skewX(-6deg)`,
									transformOrigin: 'left',
									zIndex: -1,
								}}
							/>
						) : null}
						{w.t}
					</span>
				);
			})}
		</div>
	);
};

// Deterministic "text" line widths for the fake memo body.
const LINES = [0.92, 0.84, 0.97, 0.6, 0.9, 0.78, 0.95, 0.7, 0.88, 0.52, 0.93, 0.81];
export const SECRET_LINES = [1, 2, 4, 6, 7, 10];

// A typed memo page. `redact` (0..1) draws black bars over secret lines;
// `peel` (0..1) rips them back off, revealing highlighted text.
export const Memo: React.FC<{
	width?: number;
	redact?: number;
	peel?: number;
	title?: string;
}> = ({width = 760, redact = 0, peel = 0, title = 'INTERNAL MEMORANDUM'}) => {
	const pad = width * 0.08;
	return (
		<div
			style={{
				width,
				padding: pad,
				background: `linear-gradient(170deg, ${C.paper} 0%, ${C.paperShade} 100%)`,
				boxShadow: '0 40px 90px rgba(0,0,0,0.6), inset 0 0 60px rgba(120,100,60,0.18)',
				borderRadius: 4,
				fontFamily: TYPE,
				color: C.ink,
			}}
		>
			<div style={{display: 'flex', justifyContent: 'space-between', fontSize: width * 0.032, color: C.red, letterSpacing: 3}}>
				<span>CONFIDENTIAL</span>
				<span>PAGE 1 OF 47</span>
			</div>
			<div style={{fontSize: width * 0.058, marginTop: width * 0.04, letterSpacing: 1}}>{title}</div>
			<div style={{fontSize: width * 0.03, marginTop: width * 0.015, color: C.inkSoft}}>
				RE: ██████████ — DO NOT DISTRIBUTE
			</div>
			<div style={{height: 2, background: C.inkSoft, margin: `${width * 0.035}px 0`}} />
			<div style={{display: 'flex', flexDirection: 'column', gap: width * 0.03}}>
				{LINES.map((w, i) => {
					const secretIdx = SECRET_LINES.indexOf(i);
					const isSecret = secretIdx >= 0;
					const n = SECRET_LINES.length;
					const barIn = isSecret ? interpolate(redact * (n + 2) - secretIdx, [0, 1], [0, 1], clamp) : 0;
					const barOut = isSecret ? interpolate(peel * (n + 2) - secretIdx, [0, 1], [0, 1], clamp) : 0;
					const bar = barIn * (1 - barOut);
					return (
						<div key={i} style={{position: 'relative', width: `${w * 100}%`, height: width * 0.022}}>
							<div
								style={{
									position: 'absolute',
									inset: 0,
									borderRadius: 2,
									background: isSecret && barOut > 0 ? C.highlight : C.inkSoft,
									opacity: isSecret && barOut > 0 ? 0.55 + barOut * 0.45 : 1,
								}}
							/>
							{isSecret ? (
								<div
									style={{
										position: 'absolute',
										left: -4,
										right: -4,
										top: -6,
										bottom: -6,
										background: C.redact,
										transform: `scaleX(${bar})`,
										transformOrigin: barOut > 0 ? 'right' : 'left',
									}}
								/>
							) : null}
						</div>
					);
				})}
			</div>
		</div>
	);
};

// Rubber stamp that slams down from above.
export const Stamp: React.FC<{at: number; text: string; sub?: string; rotate?: number}> = ({
	at,
	text,
	sub,
	rotate = -12,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({fps, frame: frame - at, config: {damping: 14, stiffness: 260, mass: 0.7}});
	if (frame < at) return null;
	return (
		<div
			style={{
				transform: `rotate(${rotate}deg) scale(${interpolate(s, [0, 1], [2.6, 1])})`,
				opacity: interpolate(s, [0, 0.3], [0, 0.92], clamp),
				border: `8px solid ${C.red}`,
				borderRadius: 10,
				padding: '14px 34px',
				color: C.red,
				fontFamily: IMPACT,
				textAlign: 'center',
				mixBlendMode: 'multiply',
				lineHeight: 1,
			}}
		>
			<div style={{fontSize: 96, letterSpacing: 4}}>{text}</div>
			{sub ? <div style={{fontSize: 34, letterSpacing: 8, marginTop: 6}}>{sub}</div> : null}
		</div>
	);
};
