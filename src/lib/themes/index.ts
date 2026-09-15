/**
 * CANChat theme registry.
 *
 * A theme is more than a palette: every entry below also drives typography,
 * shape (border radii), density (root font size) and atmosphere (page
 * backdrops, textures, glows) through the token layer in
 * `src/lib/styles/themes.css`.
 *
 * Adding a theme = add an entry here + a matching `html[data-theme='<id>']`
 * token block in `themes.css`. Nothing else needs to change.
 */

export type ThemeMode = 'dark' | 'light';

export type ThemeDefinition = {
	/** Stable id, persisted in localStorage and used as `html[data-theme]`. */
	id: string;
	/** Human readable name shown in the picker. */
	name: string;
	/** One line of flavour text for the picker. */
	description: string;
	/** Which Tailwind colour mode the theme builds on. */
	mode: ThemeMode;
	/** `<meta name="theme-color">` value (mobile browser chrome). */
	metaColor: string;
	/** Background used by the pre-hydration splash screen. */
	splash: string;
	/** Whether the splash logo needs inverting (dark backdrops). */
	invertSplashLogo: boolean;
	/** Three colours used to render the swatch in the picker. */
	swatch: [string, string, string];
	/** CSS `background` shorthand used for the picker preview tile. */
	preview: string;
	/** Font stack used for the preview label, mirrors `--font-display`. */
	previewFont: string;
};

export const THEMES: ThemeDefinition[] = [
	{
		id: 'aurora',
		name: 'Aurora',
		description: 'Midnight glass with slow northern lights',
		mode: 'dark',
		metaColor: '#0b1221',
		splash: '#070c18',
		invertSplashLogo: true,
		swatch: ['#5eead4', '#818cf8', '#c084fc'],
		preview:
			'radial-gradient(120% 95% at 12% 115%, rgba(94,234,212,0.8) 0%, transparent 58%), radial-gradient(105% 85% at 88% -10%, rgba(129,140,248,0.75) 0%, transparent 62%), linear-gradient(160deg, #0b1221 0%, #101c33 100%)',
		previewFont: "'Archivo', sans-serif"
	},
	{
		id: 'synthwave',
		name: 'Synthwave',
		description: 'Neon grid, chrome edges, 1984 forever',
		mode: 'dark',
		metaColor: '#1a0c33',
		splash: '#0d0620',
		invertSplashLogo: true,
		swatch: ['#ff2e97', '#00e5ff', '#ffe066'],
		preview:
			'linear-gradient(0deg, rgba(255,46,151,0.45) 0%, transparent 45%), radial-gradient(80% 60% at 50% 100%, rgba(0,229,255,0.4) 0%, transparent 70%), linear-gradient(180deg, #1a0c33 0%, #2b1354 100%)',
		previewFont: "'Archivo', sans-serif"
	},
	{
		id: 'phosphor',
		name: 'Phosphor',
		description: 'CRT terminal, scanlines and a green glow',
		mode: 'dark',
		metaColor: '#020804',
		splash: '#000000',
		invertSplashLogo: true,
		swatch: ['#39ff14', '#7dffb0', '#0a2a10'],
		preview:
			'repeating-linear-gradient(0deg, rgba(57,255,20,0.14) 0px, rgba(57,255,20,0.14) 1px, transparent 1px, transparent 4px), radial-gradient(90% 80% at 50% 50%, rgba(57,255,20,0.3) 0%, transparent 70%), #020804',
		previewFont: "ui-monospace, 'SFMono-Regular', Menlo, monospace"
	},
	{
		id: 'nebula',
		name: 'Nebula',
		description: 'Deep space, drifting clouds, quiet stars',
		mode: 'dark',
		metaColor: '#0a081a',
		splash: '#05040f',
		invertSplashLogo: true,
		swatch: ['#a855f7', '#38bdf8', '#f472b6'],
		preview:
			'radial-gradient(70% 60% at 25% 30%, rgba(168,85,247,0.6) 0%, transparent 65%), radial-gradient(60% 55% at 80% 75%, rgba(56,189,248,0.45) 0%, transparent 65%), radial-gradient(40% 40% at 60% 20%, rgba(244,114,182,0.35) 0%, transparent 70%), #0a081a',
		previewFont: "'Mona Sans', sans-serif"
	},
	{
		id: 'ember',
		name: 'Ember',
		description: 'Banked coals, warm ash, molten accents',
		mode: 'dark',
		metaColor: '#1c0d09',
		splash: '#120806',
		invertSplashLogo: true,
		swatch: ['#ff6b35', '#ffb627', '#ff2e63'],
		preview:
			'radial-gradient(115% 95% at 50% 118%, rgba(255,182,39,0.95) 0%, rgba(255,107,53,0.8) 28%, rgba(255,46,99,0.35) 55%, transparent 76%), linear-gradient(180deg, #1c0d09 0%, #2a130d 100%)',
		previewFont: "'Archivo', sans-serif"
	},
	{
		id: 'evergreen',
		name: 'Evergreen',
		description: 'Old growth canopy and dappled light',
		mode: 'dark',
		metaColor: '#0a1712',
		splash: '#060f0c',
		invertSplashLogo: true,
		swatch: ['#7ed957', '#d4a373', '#9ae6b4'],
		preview:
			'radial-gradient(85% 80% at 72% -10%, rgba(126,217,87,0.8) 0%, transparent 62%), radial-gradient(75% 65% at 8% 105%, rgba(212,163,115,0.55) 0%, transparent 66%), linear-gradient(170deg, #0a1712 0%, #102a20 100%)',
		previewFont: "'InstrumentSerif', serif"
	},
	{
		id: 'deco',
		name: 'Deco',
		description: 'Midnight lacquer with gold inlay',
		mode: 'dark',
		metaColor: '#0f1117',
		splash: '#090a0e',
		invertSplashLogo: true,
		swatch: ['#d4af37', '#e8d9a0', '#b08d57'],
		preview:
			'repeating-conic-gradient(from 200deg at 50% 118%, rgba(212,175,55,0.75) 0deg, rgba(212,175,55,0.75) 2deg, transparent 2deg, transparent 9deg), radial-gradient(85% 70% at 50% 0%, rgba(212,175,55,0.35) 0%, transparent 65%), linear-gradient(180deg, #0f1117 0%, #171a22 100%)',
		previewFont: "'InstrumentSerif', serif"
	},
	{
		id: 'paper',
		name: 'Paper',
		description: 'Warm stock, letterpress ink, wide margins',
		mode: 'light',
		metaColor: '#fdfbf5',
		splash: '#faf7f0',
		invertSplashLogo: false,
		swatch: ['#b23a2f', '#3d5a4c', '#8c8272'],
		preview:
			'repeating-linear-gradient(22deg, rgba(120,104,80,0.16) 0px, rgba(120,104,80,0.16) 1px, transparent 1px, transparent 4px), radial-gradient(90% 95% at 0% 0%, rgba(178,58,47,0.4) 0%, transparent 52%), radial-gradient(85% 90% at 105% 110%, rgba(61,90,76,0.38) 0%, transparent 55%), linear-gradient(160deg, #fdfbf5 0%, #ece3d1 100%)',
		previewFont: "'InstrumentSerif', serif"
	},
	{
		id: 'sakura',
		name: 'Sakura',
		description: 'Soft petals, pillowy shapes, spring haze',
		mode: 'light',
		metaColor: '#fffcfd',
		splash: '#fff5f8',
		invertSplashLogo: false,
		swatch: ['#f472b6', '#a78bfa', '#67e8f9'],
		preview:
			'radial-gradient(80% 70% at 20% 20%, rgba(244,114,182,0.5) 0%, transparent 60%), radial-gradient(70% 70% at 85% 80%, rgba(167,139,250,0.45) 0%, transparent 60%), linear-gradient(160deg, #fffcfd 0%, #ffeef4 100%)',
		previewFont: "'Mona Sans', sans-serif"
	},
	{
		id: 'brutalist',
		name: 'Brutalist',
		description: 'Hard edges, hard shadows, zero apology',
		mode: 'light',
		metaColor: '#fafaf8',
		splash: '#fafaf8',
		invertSplashLogo: false,
		swatch: ['#ff3b00', '#0000ff', '#ffe600'],
		preview:
			'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 10px), linear-gradient(135deg, #ff3b00 0%, #ff3b00 33%, #fafaf8 33%, #fafaf8 66%, #0000ff 66%, #0000ff 100%)',
		previewFont: "ui-monospace, 'SFMono-Regular', Menlo, monospace"
	}
];

export const THEME_IDS = THEMES.map((t) => t.id);

/** Built-in (non-custom) selections that predate the theme registry. */
export const BASE_THEMES = ['system', 'dark', 'light'];

export const getTheme = (id: string): ThemeDefinition | undefined =>
	THEMES.find((theme) => theme.id === id);

const prefersDark = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

/** Resolve any stored selection (including `system`) to `dark` | `light`. */
export const resolveThemeMode = (id: string): ThemeMode => {
	const theme = getTheme(id);
	if (theme) {
		return theme.mode;
	}

	if (id === 'dark' || id.includes('dark')) {
		return 'dark';
	}

	if (id === 'light') {
		return 'light';
	}

	return prefersDark() ? 'dark' : 'light';
};

/**
 * Apply a theme to the document.
 *
 * Also mirrors the resolved values into localStorage so the inline script in
 * `app.html` can restore them before hydration without duplicating this table.
 */
export const applyTheme = (id: string) => {
	if (typeof document === 'undefined') {
		return;
	}

	const root = document.documentElement;
	const theme = getTheme(id);
	const mode = resolveThemeMode(id);

	if (theme) {
		root.setAttribute('data-theme', theme.id);
	} else {
		root.removeAttribute('data-theme');
	}

	root.classList.remove('dark', 'light');
	root.classList.add(mode);

	// Legacy hook: `her` and friends used to be applied as bare classes.
	THEME_IDS.forEach((themeId) => root.classList.remove(themeId));
	if (theme) {
		root.classList.add(theme.id);
	}

	const metaColor = theme?.metaColor ?? (mode === 'dark' ? '#171717' : '#ffffff');
	const splash = theme?.splash ?? (mode === 'dark' ? '#000000' : '#ffffff');

	const metaThemeColor = document.querySelector('meta[name="theme-color"]');
	metaThemeColor?.setAttribute('content', metaColor);

	root.style.setProperty('--splash-bg', splash);
	root.style.setProperty(
		'--splash-logo-filter',
		(theme?.invertSplashLogo ?? mode === 'dark') ? 'invert(1)' : 'none'
	);

	try {
		localStorage.setItem('theme', id);
		localStorage.setItem('themeMode', mode);
		localStorage.setItem('themeMeta', metaColor);
		localStorage.setItem('themeSplash', splash);
		localStorage.setItem(
			'themeSplashInvert',
			(theme?.invertSplashLogo ?? mode === 'dark') ? '1' : '0'
		);
	} catch {
		// Private mode / storage disabled — the theme still applies for this session.
	}
};
