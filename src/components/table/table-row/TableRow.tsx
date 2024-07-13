import React from "react";
import RowCell from "./row-cell/RowCell";
import TableColumn from "../TableColumn";
import editImage from "../../../assets/pencil-edit.png";
import ImageButton from "../../base/image-button/ImageButton";
import "./table-row.css";


interface TableRowProps {
    rowContent: any;
    columns: TableColumn[];
    isEditable: boolean;
    handleEdit?: (data: { [value: string]: string }) => void;
    withLimit?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({rowContent, columns, isEditable, handleEdit, withLimit}) => {

    const onClick = () => {
        handleEdit ? handleEdit(rowContent) : console.log('')
    }

    return (
        <div className="table-row">
            {columns.map((column, index) => (
                <RowCell key={index} content={rowContent[column.accessor]} withLimit={withLimit}/>
            ))}

            {isEditable && (
                <RowCell
                    content={
                        <ImageButton imageUrl={editImage}
                                     onClick={onClick}
                                     height={"50px"}
                                     width={"50px"}
                        />
                    }
                />
            )}

        </div>
    );
};

export default TableRow;
