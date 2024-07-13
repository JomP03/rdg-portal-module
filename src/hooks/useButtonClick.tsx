import {useState} from "react";


export function useButtonClick() {
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleButtonClick = () => {
        setButtonClicked(true);
    }

    const setButtonClickFalse = () => {
        setButtonClicked(false);
    }

    return {
        buttonClicked,
        handleButtonClick,
        setButtonClickFalse,
    }
}