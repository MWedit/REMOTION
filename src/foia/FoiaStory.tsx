import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {AbsoluteFill} from 'remotion';
import {FilmLook} from './parts';
import {SceneAugust, SceneBuried, SceneFoia, SceneReveal} from './scenes';

// "This came out through a FOIA request filed by a consumer advocacy group in
// August. The documents were supposed to stay buried. They weren't."
// Investigative-documentary motion piece, 9:16 @ 30fps.
export const FOIA_DURATION = 110 + 100 + 100 + 130 - 12 - 10;

export const FoiaStory: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#0B0B0C'}}>
			<TransitionSeries>
				<TransitionSeries.Sequence durationInFrames={110}>
					<SceneFoia />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					timing={linearTiming({durationInFrames: 12})}
					presentation={slide({direction: 'from-bottom'})}
				/>
				<TransitionSeries.Sequence durationInFrames={100}>
					<SceneAugust />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					timing={linearTiming({durationInFrames: 10})}
					presentation={fade()}
				/>
				<TransitionSeries.Sequence durationInFrames={100}>
					<SceneBuried />
				</TransitionSeries.Sequence>
				{/* hard cut to black before the reveal */}
				<TransitionSeries.Sequence durationInFrames={130}>
					<SceneReveal />
				</TransitionSeries.Sequence>
			</TransitionSeries>
			<FilmLook />
		</AbsoluteFill>
	);
};
