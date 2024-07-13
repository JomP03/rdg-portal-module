import React, {ReactNode, useEffect, useState} from 'react';
import TableRow from './table-row/TableRow';
import TableColumn from './TableColumn';
import TableHeader from './table-header/TableHeader';
import TableFooter from "./table-footer/TableFooter";
import './table.css';
import Span from "../base/span/Span";
import {SECONDARY_COLOR_DARK} from "../../utils/colors";


interface TableProps {
  columns: TableColumn[];
  data: any[];
  isFilterable?: boolean;
  handleEdit?: (data: { [value: string]: string }) => void;
  entityFilters: ReactNode;
  tableEntity: string;
  refreshData: () => void;
  footer?: boolean;
  span?: boolean;
  withLimit?: boolean;
  isFilterOn?: number;
  refreshButton?: boolean;
  text?: string;
  isEditable?: boolean;
}

const pageSize = 5;

const Table: React.FC<TableProps> = ({
                                       columns,
                                       data,
                                       isFilterable = true,
                                       handleEdit,
                                       entityFilters,
                                       tableEntity,
                                       text,
                                       refreshData,
                                       footer = true,
                                       span = true,
                                       withLimit = true,
                                       refreshButton = true,
                                       isFilterOn = -1,
                                       isEditable = true
                                     }) => {
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the data for the current page
  const currentPageData = data.slice(startIndex, endIndex);


  // Get the total number of pages
  const totalPages = Math.ceil(data.length / pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages]);


  // If there is no data, show a message
  if (!data || data.length === 0) {
    return (
      <>
        {span &&
          <Span text={text ? text : `No ${tableEntity}s available to display`} color={SECONDARY_COLOR_DARK}/>}
        {footer && <TableFooter
          currentPage={0}
          totalPages={0}
          onPreviousPage={() => {
          }}
          onNextPage={() => {
          }}
          refreshData={refreshData}
          isFilterOn={isFilterOn}
          refreshButton={refreshButton}
        />}
      </>
    );
  }

  // Handle the previous page button
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Handle the next page button
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="custom-table">
      <TableHeader columns={columns} isEditable={isEditable} isFilterable={isFilterable}
                   entityFilters={entityFilters}
                   tableEntity={tableEntity}/>

      <div className="table-body">
        {currentPageData.map((dataInRow, index) => (
          <TableRow key={index} rowContent={dataInRow} columns={columns} isEditable={isEditable}
                    handleEdit={handleEdit} withLimit={withLimit}/>
        ))}
      </div>

      {footer && <TableFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        refreshData={refreshData}
        refreshButton={refreshButton}
        isFilterOn={isFilterOn}
      />}

    </div>
  );
};

export default Table;
