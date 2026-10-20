import {
	AbsoluteFill,
	Easing,
	interpolate,
	random,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {KineticLine, Memo, Stamp, useShake} from './parts';
import {C, IMPACT, TYPE} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Dark desk with a warm overhead lamp.
const DeskBg: React.FC<{dim?: number}> = ({dim = 0}) => (
	<AbsoluteFill
		style={{
			background: 'radial-gradient(circle at 50% 30%, #2B2620 0%, #141210 45%, #0B0B0C 80%)',
			filter: `brightness(${1 - dim})`,
		}}
	/>
);

const TextZone: React.FC<{children: React.ReactNode}> = ({children}) => (
	<div style={{position: 'absolute', left: 80, right: 80, top: 1330}}>{children}</div>
);

// 1 — "This came out through a FOIA request"
export const SceneFoia: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const rise = spring({fps, frame, config: {damping: 16, stiffness: 120, mass: 0.9}});
	const shake = useShake(40, 22, 12);
	const drift = interpolate(frame, [0, 110], [1, 1.05], clamp);

	return (
		<AbsoluteFill style={{transform: `translate(${shake.x}px, ${shake.y}px) rotate(${shake.r}deg)`}}>
			<DeskBg />
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 170}}>
				<div
					style={{
						position: 'relative',
						transform: `translateY(${(1 - rise) * 1100}px) rotate(${-4 + (1 - rise) * 10}deg) scale(${drift})`,
					}}
				>
					<Memo width={780} redact={1} />
					<div style={{position: 'absolute', left: 150, top: 420}}>
						<Stamp at={40} text="RELEASED" sub="UNDER FOIA" />
					</div>
				</div>
			</AbsoluteFill>
			<TextZone>
				<KineticLine
					start={10}
					stagger={4}
					size={88}
					words={[
						{t: 'This'},
						{t: 'came'},
						{t: 'out'},
						{t: 'through'},
						{t: 'a'},
						{t: 'FOIA', mark: 'red'},
						{t: 'request'},
					]}
				/>
			</TextZone>
		</AbsoluteFill>
	);
};

// 2 — "filed by a consumer advocacy group in August."
export const SceneAugust: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const flip = spring({fps, frame: frame - 4, config: {damping: 13, stiffness: 140, mass: 0.8}});
	const circle = interpolate(frame, [30, 52], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	const shake = useShake(14, 10, 10);
	const typed = 'REQUEST FILED BY: CONSUMER ADVOCACY GROUP';
	const chars = Math.floor(interpolate(frame, [20, 62], [0, typed.length], clamp));

	const days = Array.from({length: 31}, (_, i) => i + 1);
	const circled = 14;

	return (
		<AbsoluteFill style={{transform: `translate(${shake.x}px, ${shake.y}px)`}}>
			<DeskBg />
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 190, perspective: 1600}}>
				<div
					style={{
						width: 720,
						background: C.paper,
						borderRadius: 14,
						overflow: 'hidden',
						boxShadow: '0 40px 90px rgba(0,0,0,0.6)',
						transform: `rotateX(${(1 - flip) * -95}deg) rotate(3deg)`,
						transformOrigin: 'top center',
					}}
				>
					<div style={{background: C.red, color: C.white, fontFamily: IMPACT, fontSize: 120, textAlign: 'center', padding: '18px 0', letterSpacing: 10}}>
						AUGUST
					</div>
					<div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, padding: 36, fontFamily: TYPE, color: C.ink, fontSize: 36, textAlign: 'center'}}>
						{days.map((d) => (
							<div key={d} style={{position: 'relative', padding: '10px 0'}}>
								{d}
								{d === circled ? (
									<svg width={92} height={92} viewBox="0 0 100 100" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', overflow: 'visible'}}>
										<ellipse cx="50" cy="50" rx="44" ry="38" fill="none" stroke={C.red} strokeWidth="6" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - circle} transform="rotate(-20 50 50)" />
									</svg>
								) : null}
							</div>
						))}
					</div>
				</div>
				<div style={{marginTop: 44, fontFamily: TYPE, color: C.muted, fontSize: 34, letterSpacing: 2, minHeight: 44}}>
					{typed.slice(0, chars)}
					<span style={{opacity: frame % 16 < 8 ? 1 : 0}}>▌</span>
				</div>
			</AbsoluteFill>
			<TextZone>
				<KineticLine
					start={6}
					stagger={3.5}
					size={82}
					words={[
						{t: 'filed'},
						{t: 'by'},
						{t: 'a'},
						{t: 'consumer'},
						{t: 'advocacy'},
						{t: 'group'},
						{t: 'in'},
						{t: 'August.', mark: 'yellow'},
					]}
				/>
			</TextZone>
		</AbsoluteFill>
	);
};

// 3 — "The documents were supposed to stay buried."
export const SceneBuried: React.FC = () => {
	const frame = useCurrentFrame();
	const redact = interpolate(frame, [4, 44], [0, 1], clamp);
	const sink = interpolate(frame, [52, 96], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
	const dark = interpolate(frame, [52, 96], [0, 0.85], clamp);

	return (
		<AbsoluteFill>
			<DeskBg dim={dark * 0.6} />
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 210}}>
				<div style={{position: 'relative', transform: `translateY(${sink * 900}px) scale(${1 - sink * 0.15})`}}>
					<div style={{position: 'absolute', transform: 'rotate(7deg) translate(40px, 30px)', opacity: 0.85}}>
						<Memo width={740} redact={1} title="EXHIBIT B" />
					</div>
					<div style={{position: 'absolute', transform: 'rotate(-6deg) translate(-36px, 18px)', opacity: 0.92}}>
						<Memo width={740} redact={1} title="EXHIBIT C" />
					</div>
					<div style={{position: 'relative', transform: 'rotate(-1deg)'}}>
						<Memo width={740} redact={redact} />
					</div>
				</div>
			</AbsoluteFill>
			{/* earth rising over the stack */}
			<AbsoluteFill
				style={{
					background: 'linear-gradient(0deg, #050505 0%, rgba(5,5,5,0.95) 40%, rgba(5,5,5,0) 100%)',
					transform: `translateY(${(1 - sink) * 100}%)`,
				}}
			/>
			{new Array(26).fill(true).map((_, i) => {
				const x = random(`d-x-${i}`) * 1080;
				const v = 6 + random(`d-v-${i}`) * 10;
				const y = 1920 - (frame - 50) * v - random(`d-y-${i}`) * 300;
				if (frame < 50) return null;
				return (
					<div key={i} style={{position: 'absolute', left: x, top: y, width: 5, height: 5, borderRadius: 3, background: C.paperShade, opacity: 0.35}} />
				);
			})}
			<TextZone>
				<KineticLine
					start={6}
					stagger={4}
					size={86}
					words={[
						{t: 'The'},
						{t: 'documents'},
						{t: 'were'},
						{t: 'supposed'},
						{t: 'to'},
						{t: 'stay'},
						{t: 'buried.', mark: 'red'},
					]}
				/>
			</TextZone>
		</AbsoluteFill>
	);
};

// 4 — "They weren't."
export const SceneReveal: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const burst = spring({fps, frame: frame - 6, config: {damping: 11, stiffness: 160, mass: 0.7}});
	const shake = useShake(12, 34, 16);
	const shake2 = useShake(62, 40, 18);
	const peel = interpolate(frame, [30, 58], [0, 1], clamp);
	const flash = interpolate(frame, [30, 33, 44], [0, 0.85, 0], clamp) + interpolate(frame, [62, 64, 76], [0, 0.9, 0], clamp);
	const back = interpolate(frame, [60, 80], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});

	const title = spring({fps, frame: frame - 62, config: {damping: 10, stiffness: 220, mass: 0.6}});
	const glitch = frame >= 62 && frame < 78 ? (random(`g-${frame}`) - 0.5) * 30 : 0;
	const sx = shake.x + shake2.x;
	const sy = shake.y + shake2.y;

	return (
		<AbsoluteFill style={{backgroundColor: '#050505', transform: `translate(${sx}px, ${sy}px)`}}>
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 230}}>
				<div
					style={{
						transform: `translateY(${(1 - burst) * 1300}px) rotate(${(1 - burst) * 12 + 2}deg) scale(${1 + back * 0.25})`,
						filter: `blur(${back * 9}px) brightness(${1 - back * 0.55})`,
					}}
				>
					<Memo width={800} redact={1} peel={peel} />
				</div>
			</AbsoluteFill>

			{frame >= 62 ? (
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div style={{position: 'relative', transform: `scale(${interpolate(title, [0, 1], [3, 1])})`, opacity: interpolate(title, [0, 0.3], [0, 1], clamp)}}>
						{[
							{c: 'rgba(0,229,255,0.7)', dx: -glitch},
							{c: 'rgba(255,0,60,0.7)', dx: glitch},
						].map((l, i) => (
							<div key={i} style={{position: 'absolute', inset: 0, color: l.c, fontFamily: IMPACT, fontSize: 250, lineHeight: 0.95, letterSpacing: 2, transform: `translateX(${l.dx}px)`, mixBlendMode: 'screen', textAlign: 'center'}}>
								THEY
								<br />
								WEREN'T.
							</div>
						))}
						<div style={{position: 'relative', color: C.white, fontFamily: IMPACT, fontSize: 250, lineHeight: 0.95, letterSpacing: 2, textAlign: 'center', textShadow: '0 10px 60px rgba(0,0,0,0.8)'}}>
							THEY
							<br />
							WEREN'T.
						</div>
						<div style={{height: 16, background: C.red, marginTop: 10, transform: `scaleX(${interpolate(frame, [70, 84], [0, 1], clamp)})`, transformOrigin: 'left'}} />
					</div>
				</AbsoluteFill>
			) : null}

			<AbsoluteFill style={{backgroundColor: C.white, opacity: flash}} />
		</AbsoluteFill>
	);
};
