'use client'
import React from 'react';
import styles from "@/components/Header/Header.module.css";
import {Moon, Sun} from "react-feather";
import VisuallyHidden from "@/components/VisuallyHidden";
import serverToggleTheme from "@/app/actions";

function ColorThemeToggle({initialTheme}) {
    const [theme, setTheme] = React.useState(initialTheme);

    function toggleTheme() {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        serverToggleTheme(newTheme);
        setTheme(newTheme);
    }
    return (
        <button className={styles.action} onClick={toggleTheme}>
            {theme === 'light' ? <Sun size="1.5rem"/> : <Moon size="1.5rem"/>}
            <VisuallyHidden>
                Toggle dark / light mode
            </VisuallyHidden>
        </button>);
}

export default ColorThemeToggle;
