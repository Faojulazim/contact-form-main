tailwind.config = {
  content: ["*"],
  theme: {
    extend: {
      colors: {
        Green200Lighter: "hsl(148, 38%, 91%)",
        Green600Medium: "hsl(169, 82%, 27%)",
        Red: "hsl(0, 66%, 54%)",
        White: "hsl(0, 0%, 100%)",
        Grey500Medium: "hsl(186, 15%, 59%)",
        Grey900Darker: "hsl(187, 24%, 22%)",
      },
      fontFamily: {
        Karla: ["Karla", "sans-serif"],
      },
      screens: {
        eesm: "375px",
        esm: "425px",
        fiveHundred: "500px",
      },
    },
  },
  plugins: [],
};
