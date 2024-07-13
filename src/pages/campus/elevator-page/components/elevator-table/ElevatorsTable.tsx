// Base
import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/table/Table';
import {useTableData} from "../../../../../hooks/useTableData";
import EditModal from '../../../../../components/edit-modal/EditModal';
import {useModal} from '../../../../../hooks/useModal';
import LoadingAnimation from '../../../../../components/loading-animation/LoadingAnimation';


// Floor
import EditElevatorForm from '../edit-elevator-form/EditElevatorForm';
import ElevatorInDto from '../../../../../dtos/in/ElevatorInDto';
import {mapElevatorInToElevatorView} from '../../../../../mappers/elevatorMapper';
import ElevatorFilters from '../elevator-filters/ElevatorFilters';


interface ElevatorTableProps {
  elevators: ElevatorInDto[];
  error: any;
  loading: boolean;
  refreshData: () => void;
  isFilterOn: number;
  setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}


const ElevatorsTable: React.FC<ElevatorTableProps> =
  ({elevators, error, loading, refreshData, isFilterOn, setIsFilterOn}) => {
    const columns = [
      {Header: 'Building', accessor: 'buildingCode'},
      {Header: 'Number', accessor: 'uniqueNumber'},
      {Header: 'Served Floors', accessor: 'floors'},
      {Header: 'Brand', accessor: 'brand'},
      {Header: 'Model', accessor: 'model'},
      {Header: 'Serial Number', accessor: 'serialNumber'},
      {Header: 'X Position', accessor: 'xposition'},
      {Header: 'Y Position', accessor: 'yposition'},
      {Header: 'Description', accessor: 'description'},
      {Header: 'Orientation', accessor: 'orientation'},
    ];

    // State for the modal
    const {showModal, handleOpenModal, handleCloseModal} = useModal();

    // State for the row content
    const [rowContent, setRowContent]
      = useState<{ [key: string]: string }>({});

    // Use the useTableData hook
    const {tableData, handleTableData} = useTableData();

    // Initialize the table data, only executed once
    useEffect(() => {
      refreshData();
    }, []);


    useEffect(() => {
      // Map the data to the format that the table expects
      const elevatorDto = elevators?.map((elevator) =>
        mapElevatorInToElevatorView(elevator));

      // Update the table data
      handleTableData(elevatorDto || []);
    }, [elevators]); // Depend on elevators (for updating the table data)


    useEffect(() => {
      if (error) {
        console.error('Error fetching elevators:', error);
      }
    }, [error]);


    // Show loading animation while loading
    if (loading) {
      return <LoadingAnimation/>;
    }


    const handleEdit = (data: { [value: string]: string }) => {
      setRowContent(data);
      handleOpenModal();
    };


    return (
      <>
        <Table columns={columns}
               data={tableData}
               handleEdit={handleEdit}
               entityFilters={<ElevatorFilters handleDataChange={handleTableData} setIsFilterOn={setIsFilterOn}/>}
               tableEntity={'Elevator'}
               refreshData={refreshData}
               isFilterOn={isFilterOn}
        />

        {<EditModal
          id={'edit-elevator-modal'}
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          title={'Edit the Elevator'}
          form={<EditElevatorForm formData={rowContent} handleCloseModal={handleCloseModal} refreshData={refreshData}
          />}
        />}
      </>
    );
  };


export default ElevatorsTable;