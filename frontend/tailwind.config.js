module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                backdrop: "#00000066",
                border: "#E8EAED66",
                default: "#ffffff",
                error: "#ff5959",
                info: "#27beb6",
                "primary-dark": "#20124D",
                "primary-hover": "#6560af",
                primary: "#38337c",
                "secondary-hover": "#fbc173",
                secondary: "#fea733",
                success: "#00cf6c",
                transparent: "transparent",
                warning: "#ffa755",
            },
            maxWidth: {
                'lg': '1024px',
            }
        },
    },
    plugins: [],
};
