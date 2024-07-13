import React, {useEffect} from "react";
import Table from "../../../../../components/table/Table";
import {useTableData} from "../../../../../hooks/useTableData";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import {mapRoomInToRoomView} from "../../../../../mappers/roomMapper";
import {RoomInDto} from "../../../../../dtos/in/RoomInDto";


interface RoomTableProps {
    rooms: RoomInDto[];
    error: any;
    loading: boolean;
    refreshData: () => void;
}

const RoomTable: React.FC<RoomTableProps> = ({rooms, error, loading, refreshData}) => {


    const columns = [
        {Header: 'Name', accessor: 'name'},
        {Header: 'Category', accessor: 'category'},
        {Header: 'Building', accessor: 'buildingCode'},
        {Header: 'Floor', accessor: 'floorNumber'},
        {Header: 'Description', accessor: 'description'},
        {Header: 'InitialX', accessor: 'initialX'},
        {Header: 'InitialY', accessor: 'initialY'},
        {Header: 'FinalX', accessor: 'finalX'},
        {Header: 'FinalY', accessor: 'finalY'},
        {Header: 'DoorX', accessor: 'doorX'},
        {Header: 'DoorY', accessor: 'doorY'},
        {Header: 'Door Orientation', accessor: 'doorOrientation'},
    ];

    // Use the useTableData hook
    const {tableData, handleTableData} = useTableData();

    // Initialize the table data, only executed once
    useEffect(() => {
        refreshData();
    }, []);


    useEffect(() => {
        // Map the data to the format that the table expects
        const roomDTO = rooms?.map((room) =>
            mapRoomInToRoomView(room));

        // Update the table data
        handleTableData(roomDTO || []);
    }, [rooms]); // Depend on rooms

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
    const styles = {
        margin: '20px',
    }
    const filterForm =
        <div style={styles}>
            No filters available.
        </div>;

    return (
        <>
            <Table columns={columns} data={tableData}
                   entityFilters={filterForm}
                   tableEntity={'Room'}
                   refreshData={refreshData}
                   isFilterable={false}
                   isEditable={false}
            />
        </>
    );
};

export default RoomTable;