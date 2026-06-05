import {interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {glow, LUX} from './lux';

// Springy pop with a touch of overshoot — the core "dopaminergic" entrance.
export const usePop = (
	delay = 0,
	cfg: {damping?: number; stiffness?: number; mass?: number} = {},
) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({
		fps,
		frame: frame - delay,
		config: {damping: cfg.damping ?? 10, stiffness: cfg.stiffness ?? 150, mass: cfg.mass ?? 0.7},
	});
	return {
		s,
		scale: interpolate(s, [0, 1], [0.4, 1]),
		opacity: interpolate(s, [0, 0.6], [0, 1], {extrapolateRight: 'clamp'}),
		y: (1 - s) * 60,
	};
};

// Animated count-up with an ease-out so numbers feel alive.
export const useCountUp = (to: number, start: number, dur: number, from = 0) => {
	const frame = useCurrentFrame();
	return interpolate(frame, [start, start + dur], [from, to], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: (t) => 1 - Math.pow(1 - t, 3),
	});
};

// Per-letter springy reveal (slide up + scale + slight rotation).
export const AnimatedLetters: React.FC<{
	text: string;
	start: number;
	stagger?: number;
	color?: string;
	fontSize: number;
	fontWeight?: number;
	letterSpacing?: number;
	glowPx?: number;
}> = ({
	text,
	start,
	stagger = 2.5,
	color = LUX.neon,
	fontSize,
	fontWeight = 300,
	letterSpacing = 0,
	glowPx = 14,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<div style={{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap', whiteSpace: 'nowrap'}}>
			{text.split('').map((ch, i) => {
				const s = spring({
					fps,
					frame: frame - start - i * stagger,
					config: {damping: 11, stiffness: 170, mass: 0.6},
				});
				const yy = (1 - s) * 70;
				const rot = (1 - s) * -8;
				return (
					<span
						key={i}
						style={{
							display: 'inline-block',
							color,
							fontSize,
							fontWeight,
							letterSpacing,
							whiteSpace: 'pre',
							opacity: interpolate(s, [0, 0.5], [0, 1], {extrapolateRight: 'clamp'}),
							transform: `translateY(${yy}px) scale(${interpolate(s, [0, 1], [0.5, 1])}) rotate(${rot}deg)`,
							filter: glow(glowPx, 0.4),
						}}
					>
						{ch}
					</span>
				);
			})}
		</div>
	);
};

// A few deterministic glowing particles drifting upward — adds life/energy.
export const Particles: React.FC<{count?: number; seed?: string}> = ({
	count = 18,
	seed = 'p',
}) => {
	const frame = useCurrentFrame();
	return (
		<>
			{new Array(count).fill(true).map((_, i) => {
				const x = random(`${seed}x${i}`) * 100;
				const baseY = random(`${seed}y${i}`) * 100;
				const sz = 2 + random(`${seed}s${i}`) * 3;
				const spd = 0.4 + random(`${seed}v${i}`) * 1.1;
				const tw = Math.sin(frame * 0.06 * spd + i) * 0.5 + 0.5;
				const drift = (frame * spd * 0.12) % 110;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${x}%`,
							top: `${(baseY - drift + 110) % 110}%`,
							width: sz,
							height: sz,
							borderRadius: '50%',
							background: LUX.neon,
							opacity: 0.12 + tw * 0.4,
							filter: glow(6, 0.7),
						}}
					/>
				);
			})}
		</>
	);
};

// Expanding pulse ring — energetic accent behind hero numbers.
export const PulseRing: React.FC<{delay?: number; period?: number; max?: number; color?: string}> = ({
	delay = 0,
	period = 40,
	max = 360,
	color = LUX.neon,
}) => {
	const frame = useCurrentFrame();
	const t = ((frame - delay) % period) / period;
	if (frame < delay) return null;
	const size = interpolate(t, [0, 1], [120, max]);
	const op = interpolate(t, [0, 0.15, 1], [0, 0.35, 0]);
	return (
		<div
			style={{
				position: 'absolute',
				width: size,
				height: size,
				borderRadius: '50%',
				border: `1.5px solid ${color}`,
				opacity: op,
				filter: glow(6, 0.4),
			}}
		/>
	);
};

// Moving highlight sweep across a bar/underline.
export const useSheen = (start: number, period = 50) => {
	const frame = useCurrentFrame();
	const t = ((frame - start) % period) / period;
	return frame < start ? -1 : t;
};
