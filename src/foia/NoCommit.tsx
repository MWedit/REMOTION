import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {FilmLook, KineticLine, Stamp, useShake} from './parts';
import {C, IMPACT, TYPE} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const DeskBg: React.FC = () => (
	<AbsoluteFill
		style={{background: 'radial-gradient(circle at 50% 30%, #2B2620 0%, #141210 45%, #0B0B0C 80%)'}}
	/>
);

const TextZone: React.FC<{children: React.ReactNode}> = ({children}) => (
	<div style={{position: 'absolute', left: 70, right: 70, top: 1320}}>{children}</div>
);

const Paper: React.FC<{width?: number; children: React.ReactNode}> = ({width = 820, children}) => (
	<div
		style={{
			width,
			padding: '44px 52px',
			background: `linear-gradient(170deg, ${C.paper} 0%, ${C.paperShade} 100%)`,
			boxShadow: '0 40px 90px rgba(0,0,0,0.6), inset 0 0 60px rgba(120,100,60,0.18)',
			borderRadius: 4,
			fontFamily: TYPE,
			color: C.ink,
		}}
	>
		{children}
	</div>
);

const Field: React.FC<{label: string}> = ({label}) => (
	<div style={{display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: 34, fontSize: 30}}>
		<span style={{color: C.inkSoft, whiteSpace: 'nowrap'}}>{label}</span>
		<span style={{flex: 1, borderBottom: `2px solid ${C.inkSoft}`, height: 34}} />
	</div>
);

const money = (n: number) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

// 1 — "You don't file anything today." A claim form gets crossed out.
const SceneNoFile: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const enter = spring({fps, frame, config: {damping: 15, stiffness: 140, mass: 0.8}});
	const stroke1 = interpolate(frame, [12, 18], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	const stroke2 = interpolate(frame, [18, 24], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	const shake = useShake(24, 22, 10);

	return (
		<AbsoluteFill style={{transform: `translate(${shake.x}px, ${shake.y}px) rotate(${shake.r}deg)`}}>
			<DeskBg />
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 250}}>
				<div style={{position: 'relative', transform: `translateY(${(1 - enter) * 1000}px) rotate(${-3 + (1 - enter) * 8}deg)`}}>
					<Paper>
						<div style={{display: 'flex', justifyContent: 'space-between', fontSize: 28, color: C.red, letterSpacing: 3}}>
							<span>CLAIM FORM</span>
							<span>REQUIRED</span>
						</div>
						<div style={{fontSize: 46, marginTop: 24}}>UNCLAIMED FUNDS</div>
						<Field label="FULL NAME" />
						<Field label="ADDRESS" />
						<Field label="ID NUMBER" />
						<Field label="SIGNATURE" />
						<div style={{display: 'flex', gap: 30, marginTop: 40, fontSize: 28, color: C.inkSoft}}>
							<span>☐ MAIL-IN</span>
							<span>☐ NOTARIZED</span>
							<span>☐ 6–8 WEEKS</span>
						</div>
					</Paper>
					<svg
						width={860}
						height={620}
						viewBox="0 0 860 620"
						style={{position: 'absolute', left: -20, top: -20, overflow: 'visible'}}
					>
						<line x1="50" y1="50" x2="810" y2="570" stroke={C.red} strokeWidth="26" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - stroke1} />
						<line x1="810" y1="50" x2="50" y2="570" stroke={C.red} strokeWidth="26" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - stroke2} />
					</svg>
				</div>
			</AbsoluteFill>
			<TextZone>
				<KineticLine
					start={2}
					stagger={3}
					size={92}
					words={[{t: 'You'}, {t: "don't", mark: 'red'}, {t: 'file'}, {t: 'anything'}, {t: 'today.'}]}
				/>
			</TextZone>
		</AbsoluteFill>
	);
};

// 2 — "You don't commit to anything." An agreement with an empty signature line.
const SceneNoCommit: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const enter = spring({fps, frame, config: {damping: 15, stiffness: 140, mass: 0.8}});
	const shake = useShake(18, 22, 10);
	const penBob = Math.sin(frame * 0.35) * 10;
	const penAway = interpolate(frame, [16, 26], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});

	return (
		<AbsoluteFill style={{transform: `translate(${shake.x}px, ${shake.y}px)`}}>
			<DeskBg />
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 260}}>
				<div style={{position: 'relative', transform: `scale(${interpolate(enter, [0, 1], [0.8, 1])}) rotate(2deg)`, opacity: enter}}>
					<Paper>
						<div style={{fontSize: 46, letterSpacing: 2}}>AGREEMENT</div>
						<div style={{display: 'flex', flexDirection: 'column', gap: 22, marginTop: 34}}>
							{[0.95, 0.88, 0.97, 0.7, 0.9, 0.6].map((w, i) => (
								<div key={i} style={{width: `${w * 100}%`, height: 16, borderRadius: 2, background: C.inkSoft}} />
							))}
						</div>
						<div style={{display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: 60, fontSize: 32}}>
							<span style={{color: C.red}}>✕</span>
							<span style={{color: C.inkSoft}}>SIGN HERE</span>
							<span style={{flex: 1, borderBottom: `3px solid ${C.ink}`, height: 40}} />
						</div>
					</Paper>
					{/* pen hovers over the line, then leaves without signing */}
					<svg
						width={260}
						height={260}
						viewBox="0 0 100 100"
						style={{
							position: 'absolute',
							right: 40,
							bottom: 30,
							transform: `translate(${penAway * 500}px, ${-penAway * 300 + penBob}px) rotate(${-35 + penAway * 30}deg)`,
						}}
					>
						<rect x="44" y="4" width="12" height="70" rx="3" fill="#2A2724" />
						<rect x="44" y="4" width="12" height="16" rx="3" fill={C.red} />
						<path d="M44 74 L50 92 L56 74 Z" fill="#B8B1A4" />
					</svg>
					<div style={{position: 'absolute', left: 360, top: 110}}>
						<Stamp at={18} text="NOTHING" sub="TO SIGN" rotate={-10} />
					</div>
				</div>
			</AbsoluteFill>
			<TextZone>
				<KineticLine
					start={2}
					stagger={3}
					size={92}
					words={[{t: 'You'}, {t: "don't", mark: 'red'}, {t: 'commit'}, {t: 'to'}, {t: 'anything.'}]}
				/>
			</TextZone>
		</AbsoluteFill>
	);
};

// 3 — "— and the system shows you the balance attached to your name."
const SceneBalance: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const enter = spring({fps, frame, config: {damping: 14, stiffness: 160, mass: 0.7}});
	const line1 = 'SEARCHING RECORDS...';
	const line2 = 'NAME: YOUR NAME';
	const c1 = Math.floor(interpolate(frame, [2, 12], [0, line1.length], clamp));
	const c2 = Math.floor(interpolate(frame, [10, 20], [0, line2.length], clamp));
	const bar = interpolate(frame, [14, 30], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const found = 30;
	const shake = useShake(found, 30, 14);
	const flash = interpolate(frame, [found, found + 2, found + 12], [0, 0.7, 0], clamp);
	const pop = spring({fps, frame: frame - found, config: {damping: 10, stiffness: 220, mass: 0.6}});
	const amount = interpolate(frame, [found, found + 18], [0, 4827.16], {...clamp, easing: Easing.out(Easing.cubic)});
	const cursorOn = frame % 14 < 7;

	return (
		<AbsoluteFill style={{transform: `translate(${shake.x}px, ${shake.y}px)`}}>
			<DeskBg />
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 230}}>
				<div
					style={{
						width: 900,
						borderRadius: 18,
						background: '#121212',
						border: '2px solid #2E2C29',
						boxShadow: '0 40px 100px rgba(0,0,0,0.75)',
						overflow: 'hidden',
						transform: `scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
						opacity: enter,
					}}
				>
					<div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '18px 26px', background: '#1C1B19', fontFamily: TYPE, fontSize: 26, color: C.muted, letterSpacing: 3}}>
						<span style={{width: 16, height: 16, borderRadius: 8, background: C.red}} />
						<span style={{width: 16, height: 16, borderRadius: 8, background: '#6B655B'}} />
						<span style={{width: 16, height: 16, borderRadius: 8, background: '#6B655B'}} />
						<span style={{marginLeft: 18}}>RECORD LOOKUP</span>
					</div>
					<div style={{padding: '40px 46px 56px', fontFamily: TYPE, color: C.paper, fontSize: 38, lineHeight: 1.6}}>
						<div>
							&gt; {line1.slice(0, c1)}
							{frame < 12 && cursorOn ? '▌' : ''}
						</div>
						<div>
							&gt; {line2.slice(0, c2)}
							{frame >= 12 && frame < found && cursorOn ? '▌' : ''}
						</div>
						<div style={{marginTop: 26, height: 14, borderRadius: 7, background: '#2A2826', overflow: 'hidden'}}>
							<div style={{width: `${bar * 100}%`, height: '100%', background: frame >= found ? C.highlight : C.paper}} />
						</div>

						{frame >= found ? (
							<div style={{marginTop: 46, textAlign: 'center', transform: `scale(${interpolate(pop, [0, 1], [2.2, 1])})`, opacity: interpolate(pop, [0, 0.3], [0, 1], clamp)}}>
								<div style={{color: C.highlight, fontSize: 40, letterSpacing: 8}}>BALANCE FOUND</div>
								<div style={{position: 'relative', display: 'inline-block', marginTop: 18}}>
									<div style={{position: 'absolute', inset: '0 -22px', background: C.highlight, transform: 'skewX(-6deg)'}} />
									<div style={{position: 'relative', fontFamily: IMPACT, fontSize: 150, lineHeight: 1.05, color: C.ink, padding: '0 6px'}}>
										{money(amount)}
									</div>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</AbsoluteFill>
			<TextZone>
				<KineticLine
					start={2}
					stagger={2.2}
					size={74}
					words={[
						{t: '—'},
						{t: 'and'},
						{t: 'the'},
						{t: 'system'},
						{t: 'shows'},
						{t: 'you'},
						{t: 'the'},
						{t: 'balance', mark: 'yellow'},
						{t: 'attached'},
						{t: 'to'},
						{t: 'your'},
						{t: 'name.', mark: 'red'},
					]}
				/>
			</TextZone>
			<AbsoluteFill style={{backgroundColor: C.white, opacity: flash, pointerEvents: 'none'}} />
		</AbsoluteFill>
	);
};

// 5-second cut (150 frames @ 30fps).
export const NO_COMMIT_DURATION = 44 + 44 + 68 - 6;

export const NoCommitShort: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: '#0B0B0C'}}>
		<TransitionSeries>
			<TransitionSeries.Sequence durationInFrames={44}>
				<SceneNoFile />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				timing={linearTiming({durationInFrames: 6})}
				presentation={slide({direction: 'from-right'})}
			/>
			<TransitionSeries.Sequence durationInFrames={44}>
				<SceneNoCommit />
			</TransitionSeries.Sequence>
			<TransitionSeries.Sequence durationInFrames={68}>
				<SceneBalance />
			</TransitionSeries.Sequence>
		</TransitionSeries>
		<FilmLook />
	</AbsoluteFill>
);
