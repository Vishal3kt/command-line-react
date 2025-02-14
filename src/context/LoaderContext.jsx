import { useState } from "react";
import { createContext } from "react";

export const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {

    const [loaderState, setLoaderState] = useState(false);

    function showLoader() {
        setLoaderState(true);
    }

    function hideLoader() {
        setLoaderState(false);
    }

    const value = {
        isLoaderEnabled: loaderState,
        showLoader,
        hideLoader
    }

    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    )

}