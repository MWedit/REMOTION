import {interpolate, useCurrentFrame} from 'remotion';

// Reveals text character-by-character with a soft fade + blur trailing edge,
// matching the way "+10 mil" and "Brasileiros" type in on the reference.
export const RevealText: React.FC<{
	text: string;
	startFrame: number;
	perChar: number;
	style?: React.CSSProperties;
}> = ({text, startFrame, perChar, style}) => {
	const frame = useCurrentFrame();

	return (
		<div style={{display: 'flex', ...style}}>
			{text.split('').map((char, i) => {
				const charStart = startFrame + i * perChar;
				const opacity = interpolate(
					frame,
					[charStart, charStart + perChar * 1.6],
					[0, 1],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				const blur = interpolate(
					frame,
					[charStart, charStart + perChar * 1.6],
					[8, 0],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);

				return (
					<span
						key={i}
						style={{
							opacity,
							filter: `blur(${blur}px)`,
							whiteSpace: 'pre',
						}}
					>
						{char}
					</span>
				);
			})}
		</div>
	);
};
