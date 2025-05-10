import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        "clamp-heading": "clamp(1.75rem, 1.75vw, 4rem)", // Tamanho de fonte para corpo com clamp
        "clamp-title": "clamp(2rem, 1.75vw, 3rem)", // Tamanho de fonte para título com clamp
        "clamp-xxxlarge": "clamp(1.5rem, 1.45vw + 1.5rem, 4rem)", // Tamanho de fonte para corpo com clamp
        "clamp-xxlarge": "clamp(1.75rem, 1.5vw + .5rem, 3rem)", // Tamanho de fonte para corpo com clamp
        "clamp-xlarge": "clamp(1.5rem, 1.35vw + .2rem, 2.25rem)", // Tamanho de fonte para corpo com clamp
        "clamp-large": "clamp(1.35rem, 1vw + .2rem, 2rem)", // Tamanho de fonte para corpo com clamp
        "clamp-medium": "clamp(1.2rem, .85vw + .2rem, 1.75rem)", // Tamanho de fonte para corpo com clamp
        "clamp-small": "clamp(0.85rem, .65vw + 0.2rem, 1.5rem)", // Tamanho de fonte para corpo com clamp
        "clamp-xsmall": "clamp(0.65rem, .55vw + 0.2rem, 1.25rem)", // Tamanho de fonte para corpo com clamp
      },
      colors: {
        new: "#0f281e",
        newL: "#163a2b",
        newxL: "#1c4b37",
        newxxL: "#1b5e41",
        newD: "#0a1a13",
        newO: "#0a1a1330", // RGBA (opacidade), pode não funcionar em todos os casos como cor sólida
        background: "rgb(245, 247, 247)",
        darkGrey: "#303030",
        mediumGrey: "#505050",
        lightGrey: "#707070",
        lighterGrey: "#909090",
        lightestGrey: "#aaaaaa",
        bWhite: "#bbb",
        cWhite: "#ccc",
        eWhite: "#eee",
        f5White: "#f5f5f5",
        f6White: "#f6f6f6",
      },
    },
  },
  plugins: [],
} satisfies Config;
