import {continueRender, delayRender, staticFile} from 'remotion';

// Self-hosted Inter (thin/elegant weights) loaded from public/fonts so the
// render browser never has to reach fonts.gstatic.com (blocked by the proxy's
// TLS cert). delayRender keeps the render waiting until the faces are ready.
export const SANS = 'InterLux';

const WEIGHTS: [string, string][] = [
	['200', 'fonts/inter-200.ttf'],
	['300', 'fonts/inter-300.ttf'],
	['400', 'fonts/inter-400.ttf'],
	['500', 'fonts/inter-500.ttf'],
	['600', 'fonts/inter-600.ttf'],
];

const handle = delayRender('load-inter');

Promise.all(
	WEIGHTS.map(([weight, file]) => {
		const face = new FontFace(SANS, `url(${staticFile(file)}) format('truetype')`, {
			weight,
		});
		return face.load().then((loaded) => {
			document.fonts.add(loaded);
		});
	}),
)
	.then(() => continueRender(handle))
	.catch(() => continueRender(handle));
