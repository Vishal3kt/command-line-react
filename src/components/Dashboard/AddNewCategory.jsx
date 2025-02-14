import { useContext, useRef } from "react";
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { LoaderContext } from "../../context/LoaderContext";

const AddNewCategory = ({
    data,
    setData,
    setEnableAddNewTab
}) => {

    const tabNameRef = useRef();
    const iconInputRef = useRef();

    const oldData = [...data];

    const { showLoader, hideLoader } = useContext(LoaderContext);

    function handleFormSubmission(e) {
        e.preventDefault();
        showLoader()
        const tabName = tabNameRef.current.value;
        const iconTag = iconInputRef.current.value;
        const iconName = iconTag.split('"')[1];
        const id = uuid();

        const payload = {
            'title': tabName,
            'icon': iconName,
            'id': id,
        };

        oldData.push(payload);

        fetch('https://commandline-45ca5-default-rtdb.firebaseio.com/commandline.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(oldData)
        }).then(res => {
            hideLoader();
            setData(oldData);
            toast.success('Tab added successfully.');
            setEnableAddNewTab(false);
            tabNameRef.current.value = '';
            iconInputRef.current.value = '';
        })
    }

    return (
        <div className="add-new-tab-wrapper">
            <h3>Add new tab</h3>
            <form onSubmit={handleFormSubmission}>
                <input type="text" ref={tabNameRef} placeholder="Tab Name" />
                <input type="text" ref={iconInputRef} placeholder="Font Awsome Icon" />
                <a href="https://fontawesome.com/v5/search" target="_blank"><i className="far fa-hand-pointer"></i> Visit FA search section</a>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddNewCategory
