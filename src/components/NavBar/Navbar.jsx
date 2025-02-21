import { motion } from "framer-motion";

const Navbar = ({ selectedTab, setSelectedTab, resData }) => {

    function handleNavbarSelection(ele) {
        setSelectedTab(ele);
        localStorage.setItem('selected_tab', JSON.stringify(ele.id));
    }

    return (
        <div className="custom-navbar-wrapper">
            <ul key={Math.random()}>
                {
                    (resData || []).map((ele) => (
                        <li key={Math.random()} onClick={() => handleNavbarSelection(ele)} className={ele?.title === selectedTab?.title ? 'active' : ''}>
                            <div className="content-wrapper">
                                <i className={ele.icon}></i>
                                <h3>{ele?.title} <span>({ele.list_items?.length})</span></h3>
                            </div>
                            {ele?.title === selectedTab?.title && <motion.div layoutId="tab-indicator" className="tab-indicator" accessKey={ele?.title}></motion.div>}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Navbar
