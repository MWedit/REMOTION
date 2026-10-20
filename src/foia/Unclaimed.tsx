import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	random,
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
	<div style={{position: 'absolute', left: 80, right: 80, top: 1330}}>{children}</div>
);

const money = (n: number) =>
	`$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

// A typed payment slip whose amount counts up.
const Check: React.FC<{amount: number}> = ({amount}) => (
	<div
		style={{
			width: 860,
			padding: '40px 48px',
			background: `linear-gradient(170deg, ${C.paper} 0%, ${C.paperShade} 100%)`,
			boxShadow: '0 40px 90px rgba(0,0,0,0.6), inset 0 0 60px rgba(120,100,60,0.18)',
			borderRadius: 6,
			fontFamily: TYPE,
			color: C.ink,
			border: '2px dashed rgba(28,26,23,0.25)',
		}}
	>
		<div style={{display: 'flex', justifyContent: 'space-between', fontSize: 28, color: C.inkSoft, letterSpacing: 2}}>
			<span>PAYMENT ORDER</span>
			<span>No. 004417</span>
		</div>
		<div style={{display: 'flex', alignItems: 'flex-end', gap: 18, marginTop: 40, fontSize: 30}}>
			<span style={{color: C.inkSoft}}>PAY TO</span>
			<span style={{flex: 1, borderBottom: `2px solid ${C.inkSoft}`, fontSize: 44, paddingBottom: 4}}>YOU</span>
			<span
				style={{
					border: `3px solid ${C.ink}`,
					padding: '8px 18px',
					fontSize: 52,
					minWidth: 300,
					textAlign: 'right',
				}}
			>
				{money(amount)}
			</span>
		</div>
		<div style={{marginTop: 40, display: 'flex', justifyContent: 'space-between', fontSize: 26, color: C.inkSoft}}>
			<span>STATUS: NOT COLLECTED</span>
			<span>⑆ 0417 ⑆ ██████ ⑈</span>
		</div>
	</div>
);

// Frontal vault door. `spin` rotates the wheel, `lock` (0..1) drives the bolts
// home and turns the indicator lights red.
const Vault: React.FC<{size?: number; spin: number; lock: number}> = ({size = 720, spin, lock}) => {
	const bolts = 12;
	return (
		<div style={{position: 'relative', width: size, height: size}}>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					borderRadius: '50%',
					background: 'radial-gradient(circle at 35% 30%, #5A5650 0%, #2C2A27 55%, #161514 100%)',
					boxShadow: '0 50px 110px rgba(0,0,0,0.8), inset 0 0 0 26px #1C1B19, inset 0 0 0 30px #4A463F',
				}}
			/>
			{new Array(bolts).fill(true).map((_, i) => {
				const a = (i / bolts) * Math.PI * 2;
				const r = size / 2 - 58 + (1 - lock) * 26;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: size / 2 + Math.cos(a) * r - 16,
							top: size / 2 + Math.sin(a) * r - 16,
							width: 32,
							height: 32,
							borderRadius: '50%',
							background: lock > 0.95 ? C.red : '#8A857C',
							boxShadow: lock > 0.95 ? `0 0 18px ${C.red}` : 'inset 0 -4px 6px rgba(0,0,0,0.5)',
						}}
					/>
				);
			})}
			<svg
				width={size}
				height={size}
				viewBox="0 0 200 200"
				style={{position: 'absolute', inset: 0, transform: `rotate(${spin}deg)`}}
			>
				<circle cx="100" cy="100" r="46" fill="none" stroke="#9C968C" strokeWidth="5" />
				{[0, 60, 120].map((d) => (
					<line
						key={d}
						x1="100"
						y1="54"
						x2="100"
						y2="146"
						stroke="#9C968C"
						strokeWidth="6"
						strokeLinecap="round"
						transform={`rotate(${d} 100 100)`}
					/>
				))}
				<circle cx="100" cy="100" r="13" fill="#B8B1A4" />
			</svg>
		</div>
	);
};

// Bills sucked into the vault centre.
const Bills: React.FC<{start: number; cx: number; cy: number; count?: number}> = ({
	start,
	cx,
	cy,
	count = 14,
}) => {
	const frame = useCurrentFrame();
	return (
		<>
			{new Array(count).fill(true).map((_, i) => {
				const t0 = start + i * 3;
				const p = interpolate(frame, [t0, t0 + 26], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
				if (p <= 0 || p >= 1) return null;
				const sx = random(`bx-${i}`) * 1080;
				const sy = -120 - random(`by-${i}`) * 200;
				const x = interpolate(p, [0, 1], [sx, cx]);
				const y = interpolate(p, [0, 1], [sy, cy]);
				const rot = (random(`br-${i}`) - 0.5) * 720 * p;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x - 80,
							top: y - 38,
							width: 160,
							height: 76,
							borderRadius: 6,
							background: C.paperShade,
							border: `3px solid ${C.ink}`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontFamily: IMPACT,
							fontSize: 44,
							color: C.ink,
							transform: `rotate(${rot}deg) scale(${1 - p * 0.85})`,
							opacity: 1 - p * 0.6,
						}}
					>
						$
					</div>
				);
			})}
		</>
	);
};

// 1 — "Any unclaimed amount"
const SceneUnclaimed: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const enter = spring({fps, frame, config: {damping: 15, stiffness: 120, mass: 0.9}});
	const amount = interpolate(frame, [8, 42], [0, 4827.16], {...clamp, easing: Easing.out(Easing.cubic)});
	const shake = useShake(48, 22, 12);

	return (
		<AbsoluteFill style={{transform: `translate(${shake.x}px, ${shake.y}px) rotate(${shake.r}deg)`}}>
			<DeskBg />
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 420}}>
				<div style={{position: 'relative', transform: `translateX(${(1 - enter) * 1200}px) rotate(${-3 + (1 - enter) * 8}deg)`}}>
					<Check amount={amount} />
					<div style={{position: 'absolute', left: 230, top: 40}}>
						<Stamp at={48} text="UNCLAIMED" rotate={-9} />
					</div>
				</div>
			</AbsoluteFill>
			<TextZone>
				<KineticLine
					start={8}
					stagger={5}
					size={96}
					words={[{t: 'Any'}, {t: 'unclaimed', mark: 'yellow'}, {t: 'amount'}]}
				/>
			</TextZone>
		</AbsoluteFill>
	);
};

const VAULT_TOP = 330;
const VAULT_SIZE = 720;

const VaultPlate: React.FC<{opacity: number}> = ({opacity}) => (
	<div
		style={{
			position: 'absolute',
			top: VAULT_TOP - 120,
			left: 0,
			right: 0,
			display: 'flex',
			justifyContent: 'center',
			opacity,
		}}
	>
		<div
			style={{
				fontFamily: TYPE,
				fontSize: 34,
				letterSpacing: 4,
				color: C.paper,
				border: `2px solid rgba(236,229,211,0.4)`,
				padding: '10px 26px',
				background: 'rgba(0,0,0,0.35)',
			}}
		>
			RESERVE ACCOUNT · ████-0417
		</div>
	</div>
);

// 2 — "goes to a federal reserve account"
const SceneVault: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const rise = spring({fps, frame, config: {damping: 16, stiffness: 110, mass: 0.9}});
	const spin = frame * 1.4;

	return (
		<AbsoluteFill>
			<DeskBg />
			<VaultPlate opacity={interpolate(frame, [10, 22], [0, 1], clamp)} />
			<AbsoluteFill style={{alignItems: 'center', paddingTop: VAULT_TOP}}>
				<div style={{transform: `scale(${interpolate(rise, [0, 1], [0.6, 1])})`, opacity: rise}}>
					<Vault size={VAULT_SIZE} spin={spin} lock={0} />
				</div>
			</AbsoluteFill>
			<Bills start={16} cx={540} cy={VAULT_TOP + VAULT_SIZE / 2} />
			<TextZone>
				<KineticLine
					start={6}
					stagger={4}
					size={86}
					words={[
						{t: 'goes'},
						{t: 'to'},
						{t: 'a'},
						{t: 'federal', mark: 'red'},
						{t: 'reserve', mark: 'red'},
						{t: 'account'},
					]}
				/>
			</TextZone>
		</AbsoluteFill>
	);
};

// 3 — "— inaccessible to you permanently."
const SceneLocked: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	// wheel whips around then stops dead; bolts slam home
	const spinP = interpolate(frame, [0, 22], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	const spin = 147 + spinP * 540;
	const lock = interpolate(frame, [20, 26], [0, 1], clamp);
	const shake = useShake(26, 36, 16);
	const shake2 = useShake(70, 40, 18);
	const flash = interpolate(frame, [26, 28, 38], [0, 0.6, 0], clamp) + interpolate(frame, [70, 72, 84], [0, 0.85, 0], clamp);
	const back = interpolate(frame, [64, 86], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	const textIn = (at: number) =>
		spring({fps, frame: frame - at, config: {damping: 10, stiffness: 220, mass: 0.6}});
	const t1 = textIn(70);
	const t2 = textIn(78);
	const t3 = textIn(88);
	const glitch = frame >= 88 && frame < 102 ? (random(`ug-${frame}`) - 0.5) * 26 : 0;
	const sx = shake.x + shake2.x;
	const sy = shake.y + shake2.y;

	return (
		<AbsoluteFill style={{transform: `translate(${sx}px, ${sy}px)`}}>
			<DeskBg />
			<VaultPlate opacity={1 - back} />
			<AbsoluteFill
				style={{
					alignItems: 'center',
					paddingTop: VAULT_TOP,
					filter: `blur(${back * 10}px) brightness(${1 - back * 0.6})`,
					transform: `scale(${1 + back * 0.2})`,
				}}
			>
				<div style={{position: 'relative'}}>
					<Vault size={VAULT_SIZE} spin={spin} lock={lock} />
					<div style={{position: 'absolute', left: 120, top: 270}}>
						<Stamp at={32} text="LOCKED" sub="NO ACCESS" rotate={-11} />
					</div>
				</div>
			</AbsoluteFill>

			<TextZone>
				<div style={{opacity: 1 - back}}>
					<KineticLine
						start={4}
						stagger={4}
						size={86}
						words={[{t: '—'}, {t: 'inaccessible'}, {t: 'to'}, {t: 'you'}]}
					/>
				</div>
			</TextZone>

			{frame >= 70 ? (
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: IMPACT, textAlign: 'center'}}>
					<div style={{color: C.white, fontSize: 190, lineHeight: 0.95, transform: `scale(${interpolate(t1, [0, 1], [2.6, 1])})`, opacity: interpolate(t1, [0, 0.3], [0, 1], clamp), textShadow: '0 10px 60px rgba(0,0,0,0.85)'}}>
						INACCESSIBLE
					</div>
					<div style={{color: C.white, fontSize: 110, lineHeight: 1.05, marginTop: 6, transform: `scale(${interpolate(t2, [0, 1], [2.2, 1])})`, opacity: interpolate(t2, [0, 0.3], [0, 1], clamp)}}>
						TO YOU
					</div>
					<div style={{position: 'relative', marginTop: 26, transform: `scale(${interpolate(t3, [0, 1], [2.6, 1])})`, opacity: interpolate(t3, [0, 0.3], [0, 1], clamp)}}>
						<div style={{position: 'absolute', inset: '-6px -28px', background: C.red, transform: 'skewX(-6deg)'}} />
						{[
							{c: 'rgba(0,229,255,0.75)', dx: -glitch},
							{c: 'rgba(255,230,0,0.6)', dx: glitch},
						].map((l, i) => (
							<div key={i} style={{position: 'absolute', inset: 0, color: l.c, fontSize: 170, lineHeight: 1, transform: `translateX(${l.dx}px)`, mixBlendMode: 'screen'}}>
								PERMANENTLY.
							</div>
						))}
						<div style={{position: 'relative', color: C.white, fontSize: 170, lineHeight: 1}}>PERMANENTLY.</div>
					</div>
				</AbsoluteFill>
			) : null}

			<AbsoluteFill style={{backgroundColor: C.white, opacity: flash, pointerEvents: 'none'}} />
		</AbsoluteFill>
	);
};

export const UNCLAIMED_DURATION = 105 + 105 + 150 - 12;

export const UnclaimedStory: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: '#0B0B0C'}}>
		<TransitionSeries>
			<TransitionSeries.Sequence durationInFrames={105}>
				<SceneUnclaimed />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				timing={linearTiming({durationInFrames: 12})}
				presentation={slide({direction: 'from-bottom'})}
			/>
			<TransitionSeries.Sequence durationInFrames={105}>
				<SceneVault />
			</TransitionSeries.Sequence>
			{/* same vault framing, so a hard cut reads as one continuous shot */}
			<TransitionSeries.Sequence durationInFrames={150}>
				<SceneLocked />
			</TransitionSeries.Sequence>
		</TransitionSeries>
		<FilmLook />
	</AbsoluteFill>
);
