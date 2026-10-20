import {continueRender, delayRender, staticFile} from 'remotion';

// Investigative / declassified-file palette.
export const C = {
	bg: '#0B0B0C',
	paper: '#ECE5D3',
	paperShade: '#D9D0BA',
	ink: '#1C1A17',
	inkSoft: 'rgba(28,26,23,0.35)',
	redact: '#0E0E0E',
	red: '#E2382B',
	highlight: '#F2D33B',
	white: '#F5F2EA',
	muted: 'rgba(245,242,234,0.55)',
};

export const TYPE = 'FoiaType'; // typewriter
export const IMPACT = 'FoiaImpact'; // condensed headline
export const SANS = 'FoiaSans';

const FACES: [string, string, string][] = [
	[TYPE, 'fonts/special-elite.ttf', '400'],
	[IMPACT, 'fonts/anton.ttf', '400'],
	[SANS, 'fonts/inter-400.ttf', '400'],
	[SANS, 'fonts/inter-600.ttf', '600'],
];

const handle = delayRender('load-foia-fonts');

Promise.all(
	FACES.map(([family, file, weight]) => {
		const face = new FontFace(family, `url(${staticFile(file)}) format('truetype')`, {weight});
		return face.load().then((loaded) => {
			document.fonts.add(loaded);
		});
	}),
)
	.then(() => continueRender(handle))
	.catch(() => continueRender(handle));
