import { useState } from "react";
import Login from './Login';
import DashboardMainBody from './DashboardMainBody';
import './Dashboard.scss';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { LoaderContextProvider } from "../../context/LoaderContext";

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div>
            {
                isAdmin ? (
                    <LoaderContextProvider>
                        <DashboardMainBody />
                    </LoaderContextProvider>
                ) : (
                    <Login setIsAdmin={setIsAdmin} />
                )
            }
            <ToastContainer />
        </div>
    )
}

export default Dashboard
