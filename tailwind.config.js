/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                primary: 'hsl(var(--primary))',
                accent: 'hsl(var(--accent))',
            },
        },
    },
    daisyui: {
        themes: ["light"],
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("tailwindcss-animate")
    ],
}
