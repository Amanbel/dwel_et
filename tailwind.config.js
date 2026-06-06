/** @type {import('tailwindcss').Config} */
const color = (varName) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in srgb, var(${varName}) ${opacityValue * 100}%, transparent)`;
    }
    return `var(${varName})`;
  };
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary": color("--on-tertiary"),
        "surface-container-low": color("--surface-container-low"),
        "on-surface-variant": color("--on-surface-variant"),
        "primary": color("--primary"),
        "error-container": color("--error-container"),
        "primary-fixed": "#dbe1ff",
        "tertiary-fixed-dim": "#d2bbff",
        "surface": color("--surface"),
        "inverse-primary": color("--inverse-primary"),
        "on-primary-container": color("--on-primary-container"),
        "on-error": color("--on-error"),
        "inverse-surface": color("--inverse-surface"),
        "secondary": color("--secondary"),
        "surface-tint": color("--primary"),
        "on-primary-fixed": "#00174b",
        "background": color("--surface"),
        "on-tertiary-fixed-variant": "#5a00c6",
        "outline-variant": color("--outline-variant"),
        "error": color("--error"),
        "surface-container": color("--surface-container"),
        "outline": color("--outline"),
        "surface-container-lowest": color("--surface-container-lowest"),
        "primary-fixed-dim": "#b4c5ff",
        "surface-container-high": color("--surface-container-high"),
        "on-tertiary-container": color("--on-tertiary-container"),
        "tertiary-fixed": "#eaddff",
        "on-surface": color("--on-surface"),
        "on-primary-fixed-variant": "#003ea8",
        "surface-bright": color("--surface-bright"),
        "on-secondary": color("--on-secondary"),
        "on-primary": color("--on-primary"),
        "surface-dim": color("--surface-dim"),
        "on-secondary-fixed": "#00201d",
        "on-error-container": color("--on-error-container"),
        "primary-container": color("--primary-container"),
        "secondary-fixed": "#89f5e7",
        "surface-variant": color("--surface-container-highest"),
        "on-secondary-fixed-variant": "#005049",
        "surface-container-highest": color("--surface-container-highest"),
        "on-secondary-container": color("--on-secondary-container"),
        "on-tertiary-fixed": "#25005a",
        "tertiary": color("--tertiary"),
        "secondary-container": color("--secondary-container"),
        "inverse-on-surface": color("--inverse-on-surface"),
        "tertiary-container": color("--tertiary-container"),
        "secondary-fixed-dim": "#6bd8cb",
        "on-background": color("--on-surface")
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "xl": "32px",
        "margin-desktop": "40px",
        "xs": "4px",
        "3xl": "64px",
        "gutter": "24px",
        "2xl": "48px",
        "md": "16px",
        "base": "4px",
        "margin-mobile": "16px",
        "sm": "8px",
        "lg": "24px"
      },
      fontFamily: {
        "label-md": ["Geist", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "display-lg": ["Geist", "sans-serif"],
        "display-lg-mobile": ["Geist", "sans-serif"],
        "label-sm": ["Geist", "sans-serif"],
        "headline-md": ["Geist", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"]
      },
      fontSize: {
        "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }],
        "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "500" }],
        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }]
      }
    },
  },
  plugins: [],
}
