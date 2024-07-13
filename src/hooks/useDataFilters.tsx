import {useEffect} from "react";
import {useDataGet} from "./useApiRequest";
import {useButtonClick} from "./useButtonClick";
import {toast} from "react-toastify";



export function useDataFilters(path: string, handleDataChange: (data: any[]) => void, requiredFields: any[]) {

    // Handle the button click
    const {buttonClicked, setButtonClickFalse, handleButtonClick} = useButtonClick();

    // Get the data from the API
    const {data: filteredData, error, loading, refreshData}
        = useDataGet<any[]>(path);

    // Handle the button click
    const handleClick = () => {
        // Check if the required fields are filled
        if (requiredFields.every(field => field)) {
            handleButtonClick();
        } else {
            toast.warning('Please fill all the required fields!');
            return;
        }
        handleButtonClick();
    }

    // State responsible for the data fetching, once the button is clicked, it updates the filteredData
    useEffect(() => {
        if (buttonClicked) {
            refreshData();
            setButtonClickFalse();
        }
    }, [buttonClicked]);

    // State responsible for the table data, once the data is fetched, it is updated
    useEffect(() => {
        if (filteredData) {
            handleDataChange(filteredData || []);
        }
    }, [filteredData]);

    // State responsible for the error handling
    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    return {
        loading,
        handleClick,
    }
}