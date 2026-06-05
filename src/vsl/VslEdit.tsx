import {AbsoluteFill, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {WhipOverlay} from './WhipOverlay';
import {DailyEarnings} from './cards/DailyEarnings';
import {Term} from './cards/Term';
import {TenPercent} from './cards/TenPercent';
import {CopyPaste} from './cards/CopyPaste';
import {Members} from './cards/Members';
import {Cta} from './cards/Cta';

// Each overlay: trigger word -> fullscreen graphic -> cut back to presenter.
// Timecodes derived from the transcription (25 fps).
const OVERLAYS: {from: number; duration: number; Card: React.FC}[] = [
	{from: 50, duration: 63, Card: DailyEarnings}, // 2.0s "70 y 150 dólares por día"
	{from: 125, duration: 42, Card: Term}, //          5.0s "al final de tres meses"
	{from: 180, duration: 57, Card: TenPercent}, //    7.2s "el 10% de esas ganancias"
	{from: 370, duration: 55, Card: CopyPaste}, //    14.8s "copiar y pegar"
	{from: 637, duration: 68, Card: Members}, //      25.5s "más de 30.000 personas"
	{from: 730, duration: 107, Card: Cta}, //         29.2s CTA "clic en saber más"
];

export const VslEdit: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			{/* Presenter (audio stays continuous the whole time) */}
			<OffthreadVideo src={staticFile('presenter.mp4')} />

			{/* Motion-graphics overlays */}
			{OVERLAYS.map(({from, duration, Card}, i) => (
				<Sequence key={i} from={from} durationInFrames={duration} name={Card.name}>
					<WhipOverlay durationInFrames={duration}>
						<Card />
					</WhipOverlay>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
