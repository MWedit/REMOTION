import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={300}
				width={1920}
				height={1080}
				fps={30}
				defaultProps={{
					title: 'Remotion',
					subtitle: 'Videos, built in React',
				}}
			/>
		</>
	);
};
