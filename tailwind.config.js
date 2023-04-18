/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        100: "500px",
      },
      bottom: {
        minus: "20px",
      },
      colors: {
        "custom-putih": "#F9FAFC",
        "custom-gray": "#D9D9D9",
        "custom-abu-tua": "#676767",
        "custom-hijau-muda": "#82CD47",
        "custom-hijau-tua": "#379237",
        "custom-merah-muda": "#FF7D7D",
        "custom-merah-tua": "#FF6464",
      },
    },
  },
  plugins: [],
};
