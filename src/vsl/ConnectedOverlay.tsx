import {
	AbsoluteFill,
	Easing,
	interpolate,
	OffthreadVideo,
	staticFile,
	useCurrentFrame,
} from 'remotion';

// A "connected" overlay: instead of cutting to an isolated black card, the
// graphic emerges FROM the main video. The presenter footage (in sync) blurs
// into a frosted-glass panel behind the gold graphics, then sharpens back to
// the live presenter on exit. Smooth zoom + cross-dissolve = fluid takes.
export const ConnectedOverlay: React.FC<{
	durationInFrames: number;
	from: number; // absolute start frame, used to keep the backdrop in sync
	videoSrc: string;
	children: React.ReactNode;
	transition?: number;
}> = ({durationInFrames, from, videoSrc, children, transition = 14}) => {
	const frame = useCurrentFrame();

	const enter = interpolate(frame, [0, transition], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});
	const exit = interpolate(
		frame,
		[durationInFrames - transition, durationInFrames],
		[0, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.inOut(Easing.cubic),
		},
	);
	const present = enter * (1 - exit); // 0 -> 1 -> 0

	// Backdrop: the live presenter, blurring + dimming as the graphic takes over.
	const backdropBlur = present * 24;
	const scrim = present * 0.78; // dark veil so the gold text stays legible
	// Subtle push-in keeps motion alive and ties the cut to the footage.
	const zoom = 1.06 + present * 0.04;
	// Graphics fade/scale in slightly after the backdrop starts blurring.
	const contentIn = interpolate(frame, [transition * 0.4, transition], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const contentOut = interpolate(
		frame,
		[durationInFrames - transition, durationInFrames - transition * 0.4],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const contentOpacity = contentIn * contentOut;
	const contentScale = 0.96 + contentIn * 0.04;

	return (
		<AbsoluteFill>
			{/* synced, blurring presenter backdrop */}
			<AbsoluteFill
				style={{
					transform: `scale(${zoom})`,
					filter: `blur(${backdropBlur}px)`,
				}}
			>
				<OffthreadVideo
					src={staticFile(videoSrc)}
					startFrom={from}
					muted
					style={{width: '100%', height: '100%', objectFit: 'cover'}}
				/>
			</AbsoluteFill>

			{/* dark gold-tinted scrim */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(circle at 50% 50%, rgba(20,14,2,0.55) 0%, rgba(0,0,0,0.92) 100%)',
					opacity: scrim,
				}}
			/>

			{/* graphics */}
			<AbsoluteFill
				style={{
					opacity: contentOpacity,
					transform: `scale(${contentScale})`,
				}}
			>
				{children}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
