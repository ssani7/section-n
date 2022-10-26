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
          "text-base": "#ffffff"
        },
      },
      {
        darkTheme: {
          primary: "#45B8DE",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#202020",
          "base-200": "#181818",
          'accent-content': '#ffffff',
          "text-base": "#ffffff"
        }
      }
    ],
  },
  plugins: [require("daisyui")],
}
