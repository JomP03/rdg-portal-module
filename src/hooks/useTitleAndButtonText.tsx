import React, {useEffect} from "react";


export const useTitleAndButtonText = (filtersNames: string[], defaultTitle: string, isFilterOn: number) => {
    const [titleText, setTitleText] = React.useState<string>(defaultTitle);

    useEffect(() => {

        setTitleText(filtersNames[isFilterOn] || defaultTitle);
    }, [isFilterOn]);

    return {titleText};
}