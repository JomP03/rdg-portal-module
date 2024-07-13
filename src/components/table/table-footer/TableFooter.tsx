import React from 'react';
import './table-footer.css';
import previousArrow from "../../../assets/previous-arrow.png";
import nextArrow from "../../../assets/next-arrow.png";
import ImageButton from "../../base/image-button/ImageButton";
import RefreshButton from "./refresh-button/RefreshButton";
import Span from "../../base/span/Span";


interface TableFooterProps {
    currentPage: number;
    totalPages: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
    refreshData: () => void;
    isFilterOn: number;
    refreshButton?: boolean;
}

const TableFooter: React.FC<TableFooterProps> =
    ({
         currentPage,
         totalPages,
         onPreviousPage,
         onNextPage,
         refreshData,
         isFilterOn,
         refreshButton = true
     }) => {
        return (
            <div className="table-footer">

                {refreshButton && <RefreshButton refreshData={refreshData} isFilterOn={isFilterOn}/>}

                <div className="footer-pagination">
                    <ImageButton imageUrl={previousArrow}
                                 onClick={onPreviousPage}
                                 height={"0"}
                                 width={"50px"}
                                 disabled={currentPage === 0 || currentPage === 1}
                                 tooltipText={"Previous Page"}
                    />
                    <div className="footer-text">
                        <Span text={`Page ${currentPage} of ${totalPages}`}/>
                    </div>
                    <ImageButton imageUrl={nextArrow}
                                 onClick={onNextPage}
                                 height={"0"}
                                 width={"50px"}
                                 disabled={currentPage === totalPages}
                                 tooltipText={"Next Page"}
                    />
                </div>
            </div>
        );
    };

export default TableFooter;
