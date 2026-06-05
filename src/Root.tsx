import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {PersonasReel} from './personas/PersonasReel';
import {PersonasGlobe} from './personas/PersonasGlobe';
import {VslEdit} from './vsl/VslEdit';
import {VslConnected} from './vsl/VslConnected';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="VslConnected"
				component={VslConnected}
				durationInFrames={901}
				width={1080}
				height={1920}
				fps={25}
				defaultProps={{}}
			/>
			<Composition
				id="VslEdit"
				component={VslEdit}
				durationInFrames={837}
				width={1080}
				height={1920}
				fps={25}
				defaultProps={{}}
			/>
			<Composition
				id="PersonasGlobe"
				component={PersonasGlobe}
				durationInFrames={180}
				width={1080}
				height={1920}
				fps={30}
				defaultProps={{
					title: '+10 mil',
					subtitle: 'personas',
				}}
			/>
			<Composition
				id="PersonasReel"
				component={PersonasReel}
				durationInFrames={84}
				width={1080}
				height={1920}
				fps={30}
				defaultProps={{
					title: '+10 mil',
					subtitle: 'Brasileiros',
				}}
			/>
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
