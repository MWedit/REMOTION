import {AbsoluteFill, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {ConnectedOverlay} from './ConnectedOverlay';
import {WeeklyEarnings} from './cards2/WeeklyEarnings';
import {NoPhone} from './cards2/NoPhone';
import {NotThis} from './cards2/NotThis';
import {Proven} from './cards2/Proven';
import {FreeAccess} from './cards2/FreeAccess';
import {CtaFinal} from './cards2/CtaFinal';

const VIDEO = 'presenter2.mp4';

// Overlays "connected" to the main video: the presenter blurs into a frosted
// panel behind each graphic, then sharpens back. Timecodes from transcription
// (25 fps). Trigger words noted alongside.
const OVERLAYS: {from: number; duration: number; Card: React.FC}[] = [
	{from: 100, duration: 90, Card: WeeklyEarnings}, // 4.0s "entre 50 y 250 dólares ... semanas"
	{from: 198, duration: 52, Card: NoPhone}, //        7.9s "sin tocar tu celular"
	{from: 268, duration: 80, Card: NotThis}, //       10.7s "ni pirámide, venta de cursos"
	{from: 372, duration: 60, Card: Proven}, //        14.9s "es algo comprobado"
	{from: 638, duration: 66, Card: FreeAccess}, //    25.5s "100% gratuita"
	{from: 808, duration: 93, Card: CtaFinal}, //      32.3s CTA "clic en saber más"
];

export const VslConnected: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			{/* Presenter (audio continuous) */}
			<OffthreadVideo src={staticFile(VIDEO)} />

			{OVERLAYS.map(({from, duration, Card}, i) => (
				<Sequence key={i} from={from} durationInFrames={duration} name={Card.name}>
					<ConnectedOverlay durationInFrames={duration} from={from} videoSrc={VIDEO}>
						<Card />
					</ConnectedOverlay>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
