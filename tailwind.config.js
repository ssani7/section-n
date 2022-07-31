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
      "black"
    ],
  },
  plugins: [require("daisyui")],
}
