import {AbsoluteFill, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {PremiumOverlay} from './PremiumOverlay';
import {RiskLine} from './cards/RiskLine';
import {CopyTradingTitle} from './cards/CopyTradingTitle';
import {Replication} from './cards/Replication';
import {TenPercentLux} from './cards/TenPercentLux';
import {Breakdown} from './cards/Breakdown';
import {CtaLux} from './cards/CtaLux';

const VIDEO = 'presenter3.mp4';

// Premium / institutional cut: slow cross-dissolves from the presenter into
// fullscreen matte-black graphics, with motion blur. Timecodes from the
// transcription (25 fps).
const OVERLAYS: {from: number; duration: number; Card: React.FC}[] = [
	{from: 50, duration: 108, Card: RiskLine}, //         2.0s "jubilación del gobierno... arriesgado"
	{from: 210, duration: 75, Card: CopyTradingTitle}, // 8.4s "el copy trading"
	{from: 315, duration: 150, Card: Replication}, //    12.6s "se replican... 100% automática y gratuita"
	{from: 475, duration: 90, Card: TenPercentLux}, //   19.0s "el 10% de la ganancia"
	{from: 595, duration: 140, Card: Breakdown}, //      23.8s "100 dólares... 10 dólares... el resto es tuyo"
	{from: 905, duration: 129, Card: CtaLux}, //         36.2s CTA "saber más... hasta el final"
];

export const VslLux: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			<OffthreadVideo src={staticFile(VIDEO)} />

			{OVERLAYS.map(({from, duration, Card}, i) => (
				<Sequence key={i} from={from} durationInFrames={duration} name={Card.name}>
					<PremiumOverlay durationInFrames={duration}>
						<Card />
					</PremiumOverlay>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
