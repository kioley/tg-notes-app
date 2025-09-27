/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-bg": "var(--color-bg)",
        "theme-text": "var(--color-text)",
        "theme-primary": "var(--color-primary)",
        "theme-secondary": "var(--color-secondary)",
      },
    },
  },
  plugins: [],
  safelist: [
    // Blue
    "bg-blue-50",
    "bg-blue-100",
    "bg-blue-400",
    "text-blue-600",

    // Green
    "bg-green-50",
    "bg-green-100",
    "bg-green-400",
    "text-green-600",

    // Red
    "bg-red-50",
    "bg-red-100",
    "bg-red-400",
    "text-red-600",

    // Purple
    "bg-purple-50",
    "bg-purple-100",
    "bg-purple-400",
    "text-purple-600",

    // Yellow
    "bg-yellow-50",
    "bg-yellow-100",
    "bg-yellow-400",
    "text-yellow-600",

    // Indigo
    "bg-indigo-50",
    "bg-indigo-100",
    "bg-indigo-400",
    "text-indigo-600",

    // Pink
    "bg-pink-50",
    "bg-pink-100",
    "bg-pink-400",
    "text-pink-600",

    // Gray
    // "bg-gray-50",
    // "bg-gray-100",
    // "bg-gray-400",
    // "text-gray-600",

    // Slate
    // "bg-slate-50",
    // "bg-slate-100",
    // "bg-slate-400",
    // "text-slate-600",

    // // Zinc
    // "bg-zinc-50",
    // "bg-zinc-100",
    // "bg-zinc-400",
    // "text-zinc-600",

    // // Neutral
    // "bg-neutral-50",
    // "bg-neutral-100",
    // "bg-neutral-400",
    // "text-neutral-600",

    // // Stone
    // "bg-stone-50",
    // "bg-stone-100",
    // "bg-stone-400",
    // "text-stone-600",

    // Amber
    "bg-amber-50",
    "bg-amber-100",
    "bg-amber-400",
    "text-amber-600",

    // Cyan
    "bg-cyan-50",
    "bg-cyan-100",
    "bg-cyan-400",
    "text-cyan-600",

    // Emerald
    "bg-emerald-50",
    "bg-emerald-100",
    "bg-emerald-400",
    "text-emerald-600",

    // Lime
    "bg-lime-50",
    "bg-lime-100",
    "bg-lime-400",
    "text-lime-600",

    // Rose
    "bg-rose-50",
    "bg-rose-100",
    "bg-rose-400",
    "text-rose-600",

    // Sky
    "bg-sky-50",
    "bg-sky-100",
    "bg-sky-400",
    "text-sky-600",

    // Teal
    "bg-teal-50",
    "bg-teal-100",
    "bg-teal-400",
    "text-teal-600",

    // Violet
    "bg-violet-50",
    "bg-violet-100",
    "bg-violet-400",
    "text-violet-600",

    // Fuchsia
    "bg-fuchsia-50",
    "bg-fuchsia-100",
    "bg-fuchsia-400",
    "text-fuchsia-600",

    // Orange
    "bg-orange-50",
    "bg-orange-100",
    "bg-orange-400",
    "text-orange-600",
  ],
};
