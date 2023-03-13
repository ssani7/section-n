module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#45B8DE",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#F1F5F8",
          'accent-content': '#ffffff',
          "text-base": "#ffffff",
        },
      },
      {
        darkTheme: {
          primary: "#296e85",
          secondary: "#f6d860",
          accent: "#0A2647",
          neutral: "#3d4451",
          "base-100": "#202020",
          // "base-300": "#6c7882",
          'accent-content': '#ffffff',
          "text-base": "#ffffff",
          "primary-content": "#ffffff"
        }
      }
    ],
  },
  plugins: [require("daisyui")],
}
