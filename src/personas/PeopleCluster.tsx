import {
	AbsoluteFill,
	interpolate,
	random,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

// Palette sampled directly from the reference video.
const PERSON_FILL = '#5a9a2e';
const PERSON_HIGHLIGHT = '#7ec044';

// A single profile/person glyph (head + shoulders), matching the
// light-green "map fill" identity of the reference.
const PersonIcon: React.FC<{size: number; opacity: number}> = ({
	size,
	opacity,
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			style={{opacity, display: 'block'}}
		>
			{/* head */}
			<circle cx="12" cy="7.5" r="4.2" fill={PERSON_FILL} />
			<circle cx="12" cy="7.5" r="4.2" fill={PERSON_HIGHLIGHT} opacity={0.25} />
			{/* shoulders */}
			<path
				d="M3.5 21c0-4.7 3.8-7.8 8.5-7.8s8.5 3.1 8.5 7.8z"
				fill={PERSON_FILL}
			/>
		</svg>
	);
};

// A dense crowd of profiles that graphically represents "+10 mil personas".
// It fills in from the centre outward with a staggered spring cascade —
// echoing the way the Brazil map grew from the centre in the reference.
export const PeopleCluster: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();

	const COLS = 13;
	const ROWS = 17;
	const cellW = width * 0.052;
	const cellH = cellW * 1.02;
	const iconSize = cellW * 0.82;

	const gridW = COLS * cellW;
	const gridH = ROWS * cellH;

	// Soft radial glow halo behind the cluster (like the map's glow).
	const glow = interpolate(frame, [0, 22], [0, 0.5], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const cx = (COLS - 1) / 2;
	const cy = (ROWS - 1) / 2;
	const maxDist = Math.sqrt(cx * cx + cy * cy);

	return (
		<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
			{/* glow halo */}
			<div
				style={{
					position: 'absolute',
					width: gridW * 1.5,
					height: gridH * 1.2,
					borderRadius: '50%',
					background:
						'radial-gradient(circle, rgba(126,192,68,0.55) 0%, rgba(83,142,38,0) 70%)',
					filter: 'blur(60px)',
					opacity: glow,
					top: '54%',
					transform: 'translateY(-50%)',
				}}
			/>

			<div
				style={{
					position: 'absolute',
					top: '54%',
					transform: 'translateY(-50%)',
					width: gridW,
					height: gridH,
				}}
			>
				{new Array(ROWS).fill(true).map((_, row) =>
					new Array(COLS).fill(true).map((__, col) => {
						const i = row * COLS + col;

						// Distance from centre drives the cascade order so the
						// crowd fills outward from the middle.
						const dist = Math.sqrt(
							(col - cx) ** 2 + (row - cy) ** 2,
						);
						const jitter = random(`p-${i}`) * 3;
						const delay = (dist / maxDist) * 16 + jitter;

						const enter = spring({
							fps,
							frame: frame - delay,
							config: {damping: 13, stiffness: 130, mass: 0.6},
						});

						const scale = interpolate(enter, [0, 1], [0.2, 1]);

						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									left: col * cellW,
									top: row * cellH,
									width: cellW,
									height: cellH,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									transform: `scale(${scale})`,
								}}
							>
								<PersonIcon size={iconSize} opacity={enter} />
							</div>
						);
					}),
				)}
			</div>
		</AbsoluteFill>
	);
};
