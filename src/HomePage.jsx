import Cards from "./components/Cards/Cards";
import Navbar from "./components/NavBar/Navbar";
import { useEffect, useState } from "react";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";

const HomePage = () => {
    const [resData, setResData] = useState([]);
    const [selectedTab, setSelectedTab] = useState(null);

    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            return JSON.parse(theme);
        }
        else false;
    });

    useEffect(() => {
        document.title = `Command line - ${isDarkTheme ? 'Dark Mode' : 'Light Mode'}`
    }, [isDarkTheme])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetch('https://command-line-22204-default-rtdb.firebaseio.com/commandline.json');
                const response = await data.json();
                setResData(response)
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        if (resData && resData.length > 0) {
            const selected_tab = localStorage.getItem('selected_tab');
            if (selected_tab) {
                const prevEle = resData.find((row) => row.id === JSON.parse(selected_tab));
                setSelectedTab(prevEle || resData[0]);
            } else {
                setSelectedTab(resData[0]);
            }
        }
    }, [resData]);

    return (
        <main className={isDarkTheme ? 'dark' : ''}>
            <Navbar resData={resData} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <Cards key={Math.random()} selectedTab={selectedTab} />
            <ThemeSwitcher key={isDarkTheme} isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
        </main>
    )
}

export default HomePage
