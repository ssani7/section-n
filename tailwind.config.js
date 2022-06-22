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
          primary: "#C0C0C0",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#F1F5F8",
          'accent-content': '#ffffff'
        },
      },
      "black"
    ],
  },
  plugins: [require("daisyui")],
}
