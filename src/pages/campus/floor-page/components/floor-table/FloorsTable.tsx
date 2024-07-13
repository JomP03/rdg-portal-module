// Base
import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/table/Table';
import {useTableData} from "../../../../../hooks/useTableData";
import EditModal from '../../../../../components/edit-modal/EditModal';
import {useModal} from '../../../../../hooks/useModal';
import LoadingAnimation from '../../../../../components/loading-animation/LoadingAnimation';


// Floor
import EditFloorForm from '../edit-floor-form/EditFloorForm';
import FloorInDto from "../../../../../dtos/in/FloorInDto";
import {mapFloorInToFloorView} from "../../../../../mappers/floorMapper";
import FloorFilters from "../floor-filters/floor-filters/FloorFilters";


interface FloorsTableProps {
  floors: FloorInDto[];
  error: any;
  loading: boolean;
  refreshData: () => void;
  isFilterOn: number;
  setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}


const FloorsTable: React.FC<FloorsTableProps> =
  ({floors, error, loading, refreshData, isFilterOn, setIsFilterOn}) => {
    const columns = [
      {Header: 'Building Code', accessor: 'buildingCode'},
      {Header: 'Floor Number', accessor: 'floorNumber'},
      {Header: 'Floor Description', accessor: 'floorDescription'},
      {Header: 'Floor Plan', accessor: 'floorPlan'},
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
      const floorDto = floors?.map((floor) =>
        mapFloorInToFloorView(floor));

      // Update the table data
      handleTableData(floorDto || []);
    }, [floors]); // Depend on floors (for updating the table data)


    useEffect(() => {
      if (error) {
        console.error('Error fetching floors:', error);
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
               entityFilters={<FloorFilters handleDataChange={handleTableData} setIsFilterOn={setIsFilterOn}/>}
               tableEntity={'Floor'}
               refreshData={refreshData}
               isFilterOn={isFilterOn}
        />

        <EditModal
          id={'edit-floor-modal'}
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          title={'Edit the Floor'}
          form={<EditFloorForm formData={rowContent}
                               handleCloseModal={handleCloseModal}
                               refreshData={refreshData}
          />}
        />
      </>
    );
  };


export default FloorsTable;
