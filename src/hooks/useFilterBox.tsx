import React from "react";

export function useFilterBox() {
    // State for filter box anchor
    const [filterBoxAnchor, setFilterBoxAnchor]
        = React.useState<HTMLButtonElement | null>(null);

    // Handlers for filter box
    const handleFilterBoxClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterBoxAnchor(event.currentTarget);
    };

    // Handlers responsible for closing filter box
    const handleFilterBoxClose = () => {
        setFilterBoxAnchor(null);
    }
    const openFilterBox = Boolean(filterBoxAnchor);

    return {
        filterBoxAnchor,
        openFilterBox,
        handleFilterBoxClick,
        handleFilterBoxClose,
    }

}