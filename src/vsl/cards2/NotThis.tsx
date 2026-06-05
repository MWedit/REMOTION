import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, goldText} from '../theme';
import {CrossIcon} from '../Icons';
import {CardLayout, useHeroPop} from '../cards/Scaffold';

const NOPES = ['Pirámide', 'Venta de cursos'];

// "Esto NO es..." — crossing out pyramid / courses.
export const NotThis: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const hero = useHeroPop(4);

	return (
		<CardLayout transparent glow>
			<div
				style={{
					...goldText,
					fontSize: 96,
					fontWeight: 800,
					letterSpacing: -1,
					lineHeight: 1,
					transform: `scale(${hero.scale})`,
					opacity: hero.opacity,
					marginBottom: 30,
					filter: `drop-shadow(0 0 ${hero.glow}px rgba(244,207,106,0.5))`,
				}}
			>
				ESTO NO ES
			</div>

			{NOPES.map((label, i) => {
				const s = spring({fps, frame: frame - 14 - i * 10, config: {damping: 13, stiffness: 130, mass: 0.6}});
				return (
					<div
						key={label}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 28,
							opacity: s,
							transform: `translateY(${(1 - s) * 26}px)`,
							marginTop: 14,
						}}
					>
						<CrossIcon size={70} />
						<span
							style={{
								color: COLORS.white,
								fontSize: 74,
								fontWeight: 600,
								textDecoration: 'line-through',
								textDecorationColor: '#E0584F',
								textDecorationThickness: 6,
							}}
						>
							{label}
						</span>
					</div>
				);
			})}
		</CardLayout>
	);
};
