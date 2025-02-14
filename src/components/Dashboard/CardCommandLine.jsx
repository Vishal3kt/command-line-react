import { useContext } from 'react';
import { toast } from 'react-toastify';
import { LoaderContext } from "../../context/LoaderContext";

const CardCommandLine = ({
    command,
    setIsEditMode,
    setSelectedCommand,
    data,
    setData,
}) => {

    const { showLoader, hideLoader } = useContext(LoaderContext);

    function handleEditBtn() {
        setIsEditMode(true);
        setSelectedCommand(command);
    }

    function handleDelete() {
        if (confirm('Are you sure ?')) {
            showLoader();
            const newPayload = data.map((tab) => {
                if (tab.list_items) {
                    return {
                        ...tab,
                        list_items: tab.list_items.filter((ele) => {
                            return ele.id !== command.id
                        })
                    }
                }
                return tab;
            });

            fetch('https://commandline-45ca5-default-rtdb.firebaseio.com/commandline.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPayload)
            }).then(res => res.json()).then(data => {
                hideLoader();
                setData(newPayload);
                toast.error('Deleted Successfully.')
            })
        }
    }

    return (
        <li key={command.id} className="command-line-card-wrapper">
            <p>{command.title}</p>
            <p>{command.short_desc}</p>
            <p className='desc'>{command.description}</p>
            <div className="btns-wrapper">
                <button className="edit-btn" onClick={handleEditBtn}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="delete-btn" onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
            </div>
        </li>
    )
}

export default CardCommandLine
