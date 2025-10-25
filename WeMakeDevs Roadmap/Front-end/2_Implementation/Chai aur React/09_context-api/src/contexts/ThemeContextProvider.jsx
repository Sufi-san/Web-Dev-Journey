import { useState, useEffect } from "react"
import { ThemeContext } from "./ThemeContext";

function getDefaultTheme() {
    let defaultTheme = "";
    if(window && window.matchMedia && window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
        defaultTheme = "dark";
    }
    return defaultTheme;
}

export default function ThemeContextProvider({children}) {
    const defaultTheme = getDefaultTheme();
    // console.log("Default Theme:", defaultTheme);

    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {

        console.log("Theme Changed!");
        const htmlTag = document.querySelector('html');

        htmlTag.classList.remove("light", "dark");
        htmlTag.classList.add(theme);

    }, [theme]);

    return (
        <ThemeContext value={{theme, setTheme}}>
            {children}
        </ThemeContext>
    )
}
