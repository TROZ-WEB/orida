module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Lato", "Arial", "sans-serif"],
            },
            colors: {
                backdrop: "#00000066",
                "background-hover": "#efefef",
                background: "#f5f5f5",
                border: "#e8eaed",
                default: "#ffffff",
                error: "#ff5959",
                info: "#27beb6",
                "primary-dark": "#20124d",
                "primary-hover": "#6560af",
                primary: "#38337c",
                "primary-transparent": "#38337c40",
                "secondary-dark": "#e18f22",
                "secondary-hover": "#fbc173",
                grey: "#686868",
                secondary: "#fea733",
                success: "#00cf6c",
                "text-secondary": "#686868",
                transparent: "transparent",
                warning: "#ffa755",
            },
            maxWidth: {
                lg: "1024px",
            },
            borderRadius: {
                "50%": "50%",
            },
            boxShadow: {
                card: "0px 0px 10px rgba(0, 0, 0, 0.05)",
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
