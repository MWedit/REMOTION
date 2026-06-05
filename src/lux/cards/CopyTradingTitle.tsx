import {interpolate, useCurrentFrame} from 'remotion';
import {EASE_OUT, glow, LUX} from '../lux';
import {Kicker, LuxLayout} from '../LuxScaffold';
import {AnimatedLetters, Particles, useSheen} from '../motion';

// Energetic title — "COPY TRADING" pops in letter-by-letter with a sweeping
// sheen on the underline.
export const CopyTradingTitle: React.FC = () => {
	const frame = useCurrentFrame();

	const underline = interpolate(frame, [16, 36], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: EASE_OUT,
	});
	const sheen = useSheen(38, 45);

	return (
		<LuxLayout decor={<Particles count={22} seed="ct" />}>
			<Kicker start={2}>La alternativa</Kicker>

			<AnimatedLetters
				text="COPY TRADING"
				start={6}
				stagger={2.4}
				fontSize={96}
				fontWeight={400}
				letterSpacing={4}
				glowPx={18}
			/>

			<div
				style={{
					position: 'relative',
					width: 540,
					height: 3,
					overflow: 'hidden',
					borderRadius: 2,
				}}
			>
				<div
					style={{
						width: '100%',
						height: '100%',
						background: LUX.line,
						transform: `scaleX(${underline})`,
						filter: glow(8, 0.5),
					}}
				/>
				{sheen >= 0 ? (
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: `${sheen * 100}%`,
							width: 120,
							height: '100%',
							marginLeft: -60,
							background:
								'linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)',
							filter: glow(10, 0.9),
						}}
					/>
				) : null}
			</div>
		</LuxLayout>
	);
};
