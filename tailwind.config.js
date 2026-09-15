import typography from '@tailwindcss/typography';

/**
 * Every colour below is emitted as `rgb(var(--token, <fallback>) / <alpha-value>)`
 * so that themes can repaint the whole UI by swapping a handful of CSS
 * variables, while Tailwind opacity modifiers (`bg-gray-700/10`) keep working.
 *
 * Token values are space separated RGB channels, e.g. `23 23 23`.
 * See `src/lib/styles/themes.css` for the per-theme overrides.
 */
const GRAY_FALLBACKS = {
	50: '249 249 249',
	100: '236 236 236',
	200: '227 227 227',
	300: '205 205 205',
	400: '180 180 180',
	500: '155 155 155',
	600: '103 103 103',
	700: '78 78 78',
	800: '51 51 51',
	850: '38 38 38',
	900: '23 23 23',
	950: '13 13 13'
};

const themable = (token, fallback) => `rgb(var(--${token}, ${fallback}) / <alpha-value>)`;

const gray = Object.fromEntries(
	Object.entries(GRAY_FALLBACKS).map(([step, fallback]) => [
		step,
		themable(`color-gray-${step}`, fallback)
	])
);

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				gray,
				white: themable('color-white', '255 255 255'),
				black: themable('color-black', '0 0 0'),
				accent: {
					DEFAULT: themable('color-accent', '23 23 23'),
					soft: themable('color-accent-soft', '78 78 78'),
					alt: themable('color-accent-alt', '51 51 51'),
					ink: themable('color-accent-ink', '255 255 255')
				}
			},
			borderRadius: {
				// `none` and `full` are intentionally left alone.
				sm: 'var(--radius-sm, 0.125rem)',
				DEFAULT: 'var(--radius-base, 0.25rem)',
				md: 'var(--radius-md, 0.375rem)',
				lg: 'var(--radius-lg, 0.5rem)',
				xl: 'var(--radius-xl, 0.75rem)',
				'2xl': 'var(--radius-2xl, 1rem)',
				'3xl': 'var(--radius-3xl, 1.5rem)'
			},
			fontFamily: {
				sans: 'var(--font-sans, ui-sans-serif, system-ui, sans-serif)',
				serif: 'var(--font-serif, ui-serif, Georgia, serif)',
				mono: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)'
			},
			boxShadow: {
				theme: 'var(--shadow-md, 0 1px 3px rgb(0 0 0 / 0.1))',
				'theme-lg': 'var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
				glow: 'var(--glow, none)'
			},
			typography: {
				DEFAULT: {
					css: {
						pre: false,
						code: false,
						'pre code': false,
						'code::before': false,
						'code::after': false
					}
				}
			},
			padding: {
				'safe-bottom': 'env(safe-area-inset-bottom)'
			}
		}
	},
	plugins: [typography]
};
