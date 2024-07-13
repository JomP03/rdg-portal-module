import React, {useEffect} from "react";
import {useTableData} from "../../../../../hooks/useTableData";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import Table from "../../../../../components/table/Table";
import RobisepTypeInDTO from "../../../../../dtos/in/RobisepTypeInDto";
import {mapRobisepTypeInToRobisepTypeView} from "../../../../../mappers/robisepTypeMapper";

interface RobisepTypeTableProps {
    robisepTypes: RobisepTypeInDTO[];
    error: any;
    loading: boolean;
    refreshData: () => void;
}

const RobisepTypesTable: React.FC<RobisepTypeTableProps> = ({
                                                                robisepTypes, error,
                                                                loading, refreshData
                                                            }) => {
    const columns = [
        {Header: 'Designation', accessor: 'designation'},
        {Header: 'Brand', accessor: 'brand'},
        {Header: 'Model', accessor: 'model'},
        {Header: 'Task Types', accessor: 'tasksType'},
    ];

    // Use the useTableData hook
    const {tableData, handleTableData} = useTableData();

    // Initialize the table data, only executed once
    useEffect(() => {
        refreshData();
    }, []);

    useEffect(() => {
        // Map the data to the format that the table expects
        const robisepTypeDTO = robisepTypes?.map((robisepType) =>
            mapRobisepTypeInToRobisepTypeView(robisepType));

        // Update the table data
        handleTableData(robisepTypeDTO || []);
    }, [robisepTypes]); // Depend on robisepTypes

    // If any error occurs, log it
    useEffect(() => {
        if (error) {
            console.error('Error fetching rooms:', error);
        }
    }, [error]);

    // Show loading animation while loading
    if (loading) {
        return <LoadingAnimation/>;
    }

    // component to display that there are no filters
    const filterForm =
        <div>
            No filters available.
        </div>;

    return (
        <>
            <Table columns={columns} data={tableData}
                   entityFilters={filterForm}
                   tableEntity={'RobisepType'}
                   refreshData={refreshData}
                   isFilterable={false}
                   isEditable={false}
            />
        </>
    );
}

export default RobisepTypesTable;