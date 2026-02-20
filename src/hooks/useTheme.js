import { useState, useEffect, createContext, useContext } from 'react';
import { createElement } from 'react';

const ThemeContext = createContext({ dark: false, toggle: () => { } });

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    const toggle = () => setDark(d => !d);

    return createElement(ThemeContext.Provider, { value: { dark, toggle } }, children);
}

export const useTheme = () => useContext(ThemeContext);
