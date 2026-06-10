import {AbsoluteFill, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {PremiumOverlay} from './PremiumOverlay';
import {WeeklyLux} from './cards/WeeklyLux';
import {MonthsLux} from './cards/MonthsLux';
import {TenPercentLux} from './cards/TenPercentLux';
import {TeamLux} from './cards/TeamLux';
import {MembersLux} from './cards/MembersLux';
import {CtaLux} from './cards/CtaLux';

const VIDEO = 'presenter4.mp4';

// Fourth VSL — same dynamic/dopaminergic lux style (fast springy transitions,
// per-letter text, count-ups, particles). Timecodes from transcription (25fps).
const OVERLAYS: {from: number; duration: number; card: React.ReactNode; name: string}[] = [
	{from: 48, duration: 85, card: <WeeklyLux />, name: 'WeeklyLux'}, //          1.9s "300 y 750 dólares por semana"
	{from: 136, duration: 48, card: <MonthsLux />, name: 'MonthsLux'}, //         5.4s "al final de 3 meses"
	{from: 186, duration: 70, card: <TenPercentLux />, name: 'TenPercentLux'}, // 7.4s "el 10% de esas ganancias"
	{from: 320, duration: 78, card: <TeamLux />, name: 'TeamLux'}, //            12.8s "equipo completamente dedicado"
	{from: 420, duration: 100, card: <MembersLux />, name: 'MembersLux'}, //     16.8s "más de 30.000 personas"
	{
		from: 560,
		duration: 74,
		card: <CtaLux topLine="Para participar es muy sencillo" />,
		name: 'CtaLux',
	}, // 22.4s CTA "haz clic en saber más"
];

export const VslLux2: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			<OffthreadVideo src={staticFile(VIDEO)} />

			{OVERLAYS.map(({from, duration, card, name}, i) => (
				<Sequence key={i} from={from} durationInFrames={duration} name={name}>
					<PremiumOverlay durationInFrames={duration}>{card}</PremiumOverlay>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
