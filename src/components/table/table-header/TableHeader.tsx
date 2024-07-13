import React, {ReactNode} from "react";
import TableColumn from "../TableColumn";
import ImageButton from "../../base/image-button/ImageButton";
import filterImage from "../../../assets/filter.png";
import FilterBox from "../../filter-box/FilterBox";
import './table-header.css';
import {useFilterBox} from "../../../hooks/useFilterBox";

interface TableHeaderProps {
    columns: TableColumn[];
    isEditable?: boolean;
    isFilterable?: boolean;
    entityFilters: ReactNode;
    tableEntity: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
                                                     columns, isEditable, isFilterable,
                                                     entityFilters, tableEntity
                                                 }) => {
    // State for filter box anchor
    const {filterBoxAnchor, openFilterBox, handleFilterBoxClick, handleFilterBoxClose}
        = useFilterBox();

    return (
        <div className="table-header">
            {columns.map((column, index) => (
                <div key={index} className="table-column">
                    {column.Header}
                </div>
            ))}
            {isEditable && (
                <div className={"table-column"}>
                    Action
                </div>
            )}

            {isFilterable && (
                <div className={'button-container'}>
                    <ImageButton
                        imageUrl={filterImage}
                        onClick={handleFilterBoxClick}
                        width={"50px"}
                        height={"50px"}
                        tooltipText={'Filter Menu'}/>
                </div>
            )}

            <FilterBox isOpen={openFilterBox}
                       onClose={handleFilterBoxClose}
                       anchorElement={filterBoxAnchor}
                       filters={entityFilters}
                       filterEntity={tableEntity}
            />


            <div>
                &nbsp;&nbsp;
            </div>
        </div>
    )
        ;
};

export default TableHeader;
