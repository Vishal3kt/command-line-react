import { motion } from "framer-motion";

const ThemeSwitcher = ({ isDarkTheme, setIsDarkTheme }) => {

    function handleThemeToggle() {
        setIsDarkTheme(prev => {
            localStorage.setItem('theme', JSON.stringify(!prev));
            return !prev;
        });
    }

    const initial = { scale: 0, rotate: 360 };
    const animate = { scale: 1, rotate: 0 };

    return (
        <motion.button className="theme-switch-btn" onClick={handleThemeToggle}>
            {isDarkTheme ? (
                <motion.span initial={initial} animate={animate}>
                    <i className="fa fa-sun"></i>
                </motion.span>
            ) : (
                <motion.span initial={initial} animate={animate}>
                    <i className="fa  fa-moon" ></i>
                </motion.span>
            )}
        </motion.button>
    )
}

export default ThemeSwitcher