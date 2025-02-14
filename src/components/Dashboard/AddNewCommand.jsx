import { useContext, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { LoaderContext } from "../../context/LoaderContext";


const AddNewCommand = ({
    data,
    setData,
    selectedTab,
    setIsAddNewCommandEnabled,
    selectedCommand,
    setSelectedCommand,
    setIsEditMode
}) => {

    const titleRef = useRef();
    const shortDescRef = useRef();
    const descriptionRef = useRef();
    const oldData = [...data];
    const { showLoader, hideLoader } = useContext(LoaderContext);

    function handleFormSubmission(e) {
        e.preventDefault();
        const title = titleRef.current.value;
        const shortDesc = shortDescRef.current.value;
        const description = descriptionRef.current.value;

        if (title.trim() && shortDesc.trim() && description.trim()) {
            let newPayload;
            showLoader();
            if (!selectedCommand) {
                newPayload = oldData.map((tab) => {
                    const newItem = {
                        title: title,
                        short_desc: shortDesc,
                        description: description,
                        id: uuid()
                    };

                    if (tab.id === selectedTab.id) {
                        return {
                            ...tab,
                            'list_items': tab.list_items ? [...tab.list_items, newItem] : [newItem]
                        }
                    }
                    return tab;
                });
            } else {
                const newPayload2 = oldData.map((tab) => {
                    if (tab.id === selectedTab.id) {
                        return {
                            ...tab,
                            'list_items': tab.list_items.map((commandEle) => {
                                if (commandEle.id === selectedCommand.id) {
                                    return {
                                        ...commandEle,
                                        title: title,
                                        short_desc: shortDesc,
                                        description: description,
                                    }
                                }
                                return commandEle
                            })
                        }
                    }
                    return tab;
                });
                newPayload = newPayload2;
            }


            fetch('https://commandline-45ca5-default-rtdb.firebaseio.com/commandline.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPayload)
            }).then(res => {
                hideLoader();
                const message = selectedCommand ? 'Updated successfully.' : 'New tab added successfully.'
                toast.success(message);
                setIsAddNewCommandEnabled(false);
                setData(newPayload);
                setIsEditMode(false);
                setSelectedCommand('');
            })
        }
    }

    useEffect(() => {
        console.log(selectedCommand);

        if (selectedCommand) {
            titleRef.current.value = selectedCommand.title;
            shortDescRef.current.value = selectedCommand.short_desc;
            descriptionRef.current.value = selectedCommand.description;
        }
    }, [selectedCommand]);

    return (
        <div className="new-command-line-wrapper">
            <form onSubmit={handleFormSubmission}>
                <input type="text" ref={titleRef} placeholder="title" />
                <input type="text" ref={shortDescRef} placeholder="short description" />
                <textarea rows="6" ref={descriptionRef} type="text" placeholder="description" />
                <button>{selectedCommand ? 'Update' : 'Add'}</button>
            </form>
        </div>
    )
}

export default AddNewCommand
