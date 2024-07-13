import React from "react";
import {PRIMARY_COLOR, BACKGROUND_COLOR, PRIMARY_COLOR_VARIANT, PRIMARY_COLOR_DARK} from "../../../../utils/colors";
import Button from "../../../base/button/Button";

interface RefreshButtonProps {
    refreshData: () => void;
    isFilterOn: number;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({refreshData, isFilterOn}) => {

    const refreshButtonStyle = {
        height: "2.2rem",
        padding: "10px 20px",
    }

    return (
        <div className="refresh-button">
            <Button label={isFilterOn == -1 ? "Refresh" : "Clear Filters"}
                    backgroundColor={PRIMARY_COLOR}
                    hoverColor={PRIMARY_COLOR_VARIANT}
                    activeColor={PRIMARY_COLOR_DARK}
                    textColor={BACKGROUND_COLOR}
                    onClick={refreshData}
                    styles={refreshButtonStyle}
                    tooltipText={"A refresh will reset the table to the first page, with no filters applied"}
            />
        </div>
    )
}

export default RefreshButton;