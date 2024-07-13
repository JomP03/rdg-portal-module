import {useTableData} from "../../../../../hooks/useTableData";
import React, {useEffect} from "react";
import Table from "../../../../../components/table/Table";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import PathInDto from "../../../../../dtos/in/PathInDto";

interface PathTableProps {
    paths: PathInDto[];
    error: any;
    loading: boolean;
}

const PathTable: React.FC<PathTableProps> = ({paths, error, loading}) => {
    const columns = [
        {Header: 'Path', accessor: 'path'},
        {Header: 'Cost', accessor: 'cost'},
    ];

    // Use the useTableData hook
    const {tableData, handleTableData} = useTableData();

    useEffect(() => {
        handleTableData(paths || []);
    }, [paths]); // Depend on paths

    useEffect(() => {
        if (error) {
            console.error('Error fetching paths:', error);
        }
    }, [error]);

    // component to display that there are no filters
    const styles = {
        margin: '20px',
    }
    const filterForm =
        <div style={styles}>
            <h3>No filters available</h3>
        </div>;

    // Show loading animation while loading
    if (loading) {
        return <LoadingAnimation/>;
    }

    return (
        <>
            <Table columns={columns} data={tableData}
                   entityFilters={filterForm}
                   tableEntity={'Path'}
                   refreshData={() => {}}
                   isFilterable={false}
                   footer={false}
                   span={false}
                   withLimit={false}
                   isEditable={false}
            />
        </>
    );
}

export default PathTable;