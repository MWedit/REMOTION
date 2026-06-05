import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';

// A deterministic field of twinkling, drifting stars.
// Uses random() with a static seed so every render is identical.
export const StarField: React.FC<{count?: number; seed?: string}> = ({
	count = 60,
	seed = 'stars',
}) => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill>
			{new Array(count).fill(true).map((_, i) => {
				const x = random(`${seed}-x-${i}`) * 100;
				const y = random(`${seed}-y-${i}`) * 100;
				const size = 1 + random(`${seed}-s-${i}`) * 3;
				const speed = 0.5 + random(`${seed}-v-${i}`) * 1.5;
				const phase = random(`${seed}-p-${i}`) * Math.PI * 2;

				// Twinkle by oscillating opacity over time.
				const opacity = interpolate(
					Math.sin(frame * 0.08 * speed + phase),
					[-1, 1],
					[0.15, 0.9],
				);

				// Gentle upward drift.
				const drift = (frame * speed * 0.05) % 100;

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${x}%`,
							top: `${(y - drift + 100) % 100}%`,
							width: size,
							height: size,
							borderRadius: '50%',
							backgroundColor: '#ffffff',
							opacity,
							boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.8)`,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
