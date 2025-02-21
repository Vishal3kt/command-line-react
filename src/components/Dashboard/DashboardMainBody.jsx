import { useContext, useEffect, useRef, useState } from "react";
import AddNewCategory from './AddNewCategory';
import DashboardTabLists from "./DashboardTabLists";
import { LoaderContext } from "../../context/LoaderContext";
import Loader from "./Loader";

const DashboardMainBody = () => {

    const [data, setData] = useState([]);
    const [selectedTab, setSelectedTab] = useState('');
    const [enableAddNewTab, setEnableAddNewTab] = useState(false);
    const selectRef = useRef();

    const { isLoaderEnabled, showLoader, hideLoader } = useContext(LoaderContext);

    useEffect(() => {
        showLoader();
        fetch('https://command-line-22204-default-rtdb.firebaseio.com/commandline.json').then(res => res.json()).then(data => {
            setData(data || []);
            hideLoader();
        })
    }, [])


    useEffect(() => {
        if (selectedTab) {
            setSelectedTab(data.find(ele => ele.id === selectedTab.id));
        }
    }, [data])

    function handleTabSelection(e) {
        setEnableAddNewTab(false);
        setSelectedTab(data.find(ele => ele.id === e.target.value));
    }

    function handleNewTabEntryToggle() {
        setSelectedTab(null);
        setEnableAddNewTab(prev => !prev);
        if (selectRef.current) selectRef.current.value = ''
    }

    return (
        <div id="dashboard-main-body-container">
            <div className="top-section">
                {!enableAddNewTab && (
                    <>

                        <select onChange={handleTabSelection} ref={selectRef}>
                            <option value="">Select Tab</option>
                            {
                                data.map((ele) => (
                                    <option key={ele.id} value={ele.id}>{ele.title}</option>
                                ))
                            }
                        </select>
                        <button onClick={handleNewTabEntryToggle}><i className="fas fa-plus"></i>Add New Tab</button>
                    </>
                )}
                {enableAddNewTab && <button onClick={handleNewTabEntryToggle}><i className="fas fa-less-than"></i>Back</button>}

            </div>
            {
                enableAddNewTab && !selectedTab && <AddNewCategory data={data} setData={setData} setEnableAddNewTab={setEnableAddNewTab} />
            }
            {
                selectedTab && !enableAddNewTab && <DashboardTabLists data={data} setData={setData} selectedTab={selectedTab} />
            }
            {
                !selectedTab && !enableAddNewTab && <p className="no-tab-selected-msg">No tab selected</p>
            }
            {isLoaderEnabled && <Loader />}
        </div>
    )
}

export default DashboardMainBody
