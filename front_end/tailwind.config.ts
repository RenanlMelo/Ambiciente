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
    },
  },
  plugins: [],
} satisfies Config;
