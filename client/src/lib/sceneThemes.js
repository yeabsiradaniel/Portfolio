/**
 * Scene theme tokens.
 *
 * Every (material × color-mode) combination maps to a set of CSS custom
 * properties applied to <html>. Components already consume these through
 * Tailwind's `accent` / `on-accent` colors and the `.glass-card` utility,
 * so the whole site's palette follows the 3D centerpiece automatically.
 *
 * Accent choices keep WCAG AA contrast (>= 4.5:1) against their on-accent
 * text color; research on glass-over-animated-backgrounds guided the card
 * fills (semi-opaque, not blur alone).
 */

export const MATERIALS = ['obsidian', 'pearl', 'gold', 'glass', 'carbon', 'celadon', 'copper', 'oil-slick', 'smoked-glass'];

// first-time visitors (no stored choice) get the glass preset in both modes
export const defaultMaterialFor = () => 'glass';

const SCENE_THEMES = {
  obsidian: {
    light: {
      accent: '63 63 70', // zinc-700
      accentHover: '39 39 42', // zinc-800
      onAccent: '255 255 255',
      cardBg: 'rgba(255, 255, 255, 0.55)',
      cardBorder: 'rgba(24, 24, 27, 0.08)',
    },
    dark: {
      accent: '113 113 122', // zinc-500
      accentHover: '161 161 170', // zinc-400
      onAccent: '255 255 255',
      cardBg: 'rgba(24, 24, 27, 0.55)',
      cardBorder: 'rgba(255, 255, 255, 0.10)',
    },
  },
  pearl: {
    light: {
      accent: '87 83 78', // stone-600
      accentHover: '68 64 60', // stone-700
      onAccent: '255 255 255',
      cardBg: 'rgba(255, 253, 248, 0.55)',
      cardBorder: 'rgba(68, 64, 60, 0.10)',
    },
    dark: {
      accent: '120 113 108', // stone-500
      accentHover: '168 162 158', // stone-400
      onAccent: '255 255 255',
      cardBg: 'rgba(41, 37, 36, 0.55)',
      cardBorder: 'rgba(231, 229, 228, 0.10)',
    },
  },
  gold: {
    light: {
      accent: '180 83 9', // amber-700
      accentHover: '146 64 14', // amber-800
      onAccent: '255 255 255',
      cardBg: 'rgba(255, 251, 235, 0.55)',
      cardBorder: 'rgba(180, 83, 9, 0.14)',
    },
    dark: {
      accent: '245 158 11', // amber-500
      accentHover: '251 191 36', // amber-400
      onAccent: '28 20 4', // dark text on bright gold
      cardBg: 'rgba(30, 24, 12, 0.55)',
      cardBorder: 'rgba(245, 158, 11, 0.16)',
    },
  },
  glass: {
    light: {
      accent: '2 132 199', // sky-600
      accentHover: '3 105 161', // sky-700
      onAccent: '255 255 255',
      cardBg: 'rgba(240, 249, 255, 0.50)',
      cardBorder: 'rgba(2, 132, 199, 0.14)',
    },
    dark: {
      accent: '56 189 248', // sky-400
      accentHover: '125 211 252', // sky-300
      onAccent: '8 47 73', // sky-950-ish text on bright glass blue
      cardBg: 'rgba(12, 28, 40, 0.55)',
      cardBorder: 'rgba(56, 189, 248, 0.16)',
    },
  },
  carbon: {
    light: {
      accent: '51 65 85', // slate-700
      accentHover: '30 41 59', // slate-800
      onAccent: '255 255 255',
      cardBg: 'rgba(248, 250, 252, 0.55)',
      cardBorder: 'rgba(15, 23, 42, 0.10)',
    },
    dark: {
      accent: '148 163 184', // slate-400
      accentHover: '203 213 225', // slate-300
      onAccent: '15 23 42', // slate-900 text on bright slate
      cardBg: 'rgba(15, 23, 42, 0.55)',
      cardBorder: 'rgba(148, 163, 184, 0.14)',
    },
  },
  celadon: {
    light: {
      accent: '47 106 78', // deep sage
      accentHover: '35 82 60',
      onAccent: '255 255 255',
      cardBg: 'rgba(240, 248, 243, 0.55)',
      cardBorder: 'rgba(47, 106, 78, 0.14)',
    },
    dark: {
      accent: '143 192 165', // soft sage
      accentHover: '181 216 195',
      onAccent: '17 33 24',
      cardBg: 'rgba(20, 34, 26, 0.55)',
      cardBorder: 'rgba(143, 192, 165, 0.14)',
    },
  },
  copper: {
    light: {
      accent: '154 78 32', // burnt copper
      accentHover: '120 58 22',
      onAccent: '255 255 255',
      cardBg: 'rgba(253, 246, 240, 0.55)',
      cardBorder: 'rgba(154, 78, 32, 0.14)',
    },
    dark: {
      accent: '221 138 90', // bright copper
      accentHover: '233 168 122',
      onAccent: '43 22 8',
      cardBg: 'rgba(42, 26, 16, 0.55)',
      cardBorder: 'rgba(221, 138, 90, 0.16)',
    },
  },
  'oil-slick': {
    light: {
      accent: '82 82 91', // zinc-600 — let the sphere carry the color
      accentHover: '63 63 70',
      onAccent: '255 255 255',
      cardBg: 'rgba(250, 250, 250, 0.55)',
      cardBorder: 'rgba(24, 24, 27, 0.08)',
    },
    dark: {
      accent: '161 161 170', // zinc-400
      accentHover: '212 212 216',
      onAccent: '9 9 11',
      cardBg: 'rgba(24, 24, 27, 0.55)',
      cardBorder: 'rgba(255, 255, 255, 0.10)',
    },
  },
  'smoked-glass': {
    light: {
      accent: '71 85 105', // slate-600
      accentHover: '51 65 85',
      onAccent: '255 255 255',
      cardBg: 'rgba(241, 245, 249, 0.50)',
      cardBorder: 'rgba(71, 85, 105, 0.14)',
    },
    dark: {
      accent: '125 160 190', // steel blue
      accentHover: '148 180 205',
      onAccent: '10 18 26',
      cardBg: 'rgba(16, 24, 32, 0.55)',
      cardBorder: 'rgba(125, 160, 190, 0.14)',
    },
  },
};

/**
 * Token lookup for a (theme, material) pair, with fallback to the mode default.
 */
export const getSceneTokens = (theme, material) =>
  SCENE_THEMES[material]?.[theme] || SCENE_THEMES[defaultMaterialFor(theme)][theme];

/**
 * Push the token set for a (theme, material) pair onto <html> as inline
 * CSS variables. Inline styles beat the :root/.dark fallback definitions
 * in index.css, so no stylesheet reload is needed.
 */
export const applySceneTheme = (theme, material) => {
  const tokens = getSceneTokens(theme, material);
  const root = document.documentElement;
  root.style.setProperty('--color-accent', tokens.accent);
  root.style.setProperty('--color-accent-hover', tokens.accentHover);
  root.style.setProperty('--color-on-accent', tokens.onAccent);
  root.style.setProperty('--card-bg', tokens.cardBg);
  root.style.setProperty('--card-border', tokens.cardBorder);
};
