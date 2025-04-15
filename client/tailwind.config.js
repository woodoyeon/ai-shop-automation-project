// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"], // font-sans 사용 가능하도록 지정
      },
    },
  },
  plugins: [],
}
