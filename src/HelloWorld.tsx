import {
	linearTiming,
	springTiming,
	TransitionSeries,
} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {AbsoluteFill} from 'remotion';
import {IntroScene} from './scenes/IntroScene';
import {FeatureScene} from './scenes/FeatureScene';
import {OutroScene} from './scenes/OutroScene';

export type HelloWorldProps = {
	title: string;
	subtitle: string;
};

export const HelloWorld: React.FC<HelloWorldProps> = ({title, subtitle}) => {
	return (
		<AbsoluteFill style={{backgroundColor: '#0b1021'}}>
			<TransitionSeries>
				<TransitionSeries.Sequence durationInFrames={110}>
					<IntroScene title={title} subtitle={subtitle} />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					timing={springTiming({config: {damping: 200}})}
					presentation={slide({direction: 'from-right'})}
				/>

				<TransitionSeries.Sequence durationInFrames={120}>
					<FeatureScene />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					timing={linearTiming({durationInFrames: 25})}
					presentation={wipe({direction: 'from-bottom-right'})}
				/>

				<TransitionSeries.Sequence durationInFrames={90}>
					<OutroScene />
				</TransitionSeries.Sequence>

				<TransitionSeries.Transition
					timing={linearTiming({durationInFrames: 20})}
					presentation={fade()}
				/>

				<TransitionSeries.Sequence durationInFrames={20}>
					<AbsoluteFill style={{backgroundColor: '#0b1021'}} />
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</AbsoluteFill>
	);
};
