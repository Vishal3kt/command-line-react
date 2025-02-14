import { useContext, useEffect, useState } from "react"
import AddNewCommand from "./AddNewCommand";
import CardCommandLine from "./CardCommandLine";
import { toast } from 'react-toastify';
import { LoaderContext } from "../../context/LoaderContext";

const DashboardTabLists = ({
    data,
    setData,
    selectedTab
}) => {

    const [isAddNewCommandEnabled, setIsAddNewCommandEnabled] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState('');

    const { showLoader, hideLoader } = useContext(LoaderContext);

    useEffect(() => {
        if (isEditMode) [
            setIsAddNewCommandEnabled(true)
        ]
    }, [isEditMode]);

    useEffect(() => {
        setIsAddNewCommandEnabled(false);
        setIsEditMode(false);
        setSelectedCommand('')
    }, [selectedTab])

    function handleTabDelete() {
        if (confirm('Are you sure ?')) {
            showLoader();
            const newPayload = data.filter(tab => tab.id !== selectedTab.id);
            fetch('https://commandline-45ca5-default-rtdb.firebaseio.com/commandline.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPayload)
            }).then(res => res.json()).then(data => {
                hideLoader();
                setData(newPayload);
                toast.error('Deleted Successfully');
            })
        }
    }

    return (
        <div id="dashboard-tabs-list">
            <div className="top-section">
                <div className="title-btn-wrapper">
                    <h3><i className={`${selectedTab.icon} hero-icon`}></i> {selectedTab.title} <span>Count : {selectedTab.list_items ? selectedTab.list_items.length : 0}</span> </h3>
                    <button onClick={handleTabDelete}><i className="fas fa-trash"></i></button>
                </div>
                {isAddNewCommandEnabled ? (
                    <button onClick={() => (setIsAddNewCommandEnabled(false), setIsEditMode(false), setSelectedCommand(''))}>Cancel</button>
                ) : (<button onClick={() => setIsAddNewCommandEnabled(true)}><i className="fas fa-plus"></i>Add New Command</button>)
                }
            </div>
            {
                !isAddNewCommandEnabled && (
                    <>
                        {
                            selectedTab.list_items && (
                                <ul className="lists-wrapper-container">
                                    {
                                        selectedTab.list_items.map((command) => (
                                            <CardCommandLine
                                                key={command.id}
                                                data={data}
                                                selectedTab={selectedTab}
                                                setData={setData}
                                                setSelectedCommand={setSelectedCommand}
                                                setIsEditMode={setIsEditMode}
                                                command={command}
                                            />
                                        ))
                                    }
                                </ul>
                            )
                        }
                        {
                            !selectedTab.list_items && <p className="no-tab-selected-msg">No data available</p>
                        }
                    </>
                )
            }
            {
                isAddNewCommandEnabled && (
                    <AddNewCommand
                        data={data}
                        selectedCommand={selectedCommand}
                        setData={setData}
                        selectedTab={selectedTab}
                        setIsAddNewCommandEnabled={setIsAddNewCommandEnabled}
                        setIsEditMode={setIsEditMode}
                        setSelectedCommand={setSelectedCommand}
                    />
                )
            }
        </div>
    )
}

export default DashboardTabLists

