import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/table/Table';
import EditBuildingForm from '../edit-building-form/EditBuildingForm';
import EditModal from '../../../../../components/edit-modal/EditModal';
import {useModal} from '../../../../../hooks/useModal';
import {Building} from '../../../../../interfaces/building';
import {mapBuildingToBuildingDto} from "../../../../../mappers/buildingMapper";
import BuildingFilters from "../building-filters/BuildingFilters";
import LoadingAnimation from '../../../../../components/loading-animation/LoadingAnimation';
import {useTableData} from "../../../../../hooks/useTableData";

interface BuildingsTableProps {
  buildings: Building[];
  error: any;
  loading: boolean;
  refreshData: () => void;
  isFilterOn: number;
  setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}

const BuildingsTable: React.FC<BuildingsTableProps> = ({
                                                         buildings,
                                                         error,
                                                         loading,
                                                         refreshData,
                                                         isFilterOn,
                                                         setIsFilterOn
                                                       }) => {
  const columns = [
    {Header: 'Code', accessor: 'buildingCode'},
    {Header: 'Name', accessor: 'buildingName'},
    {Header: 'Width', accessor: 'width'}, // Updated accessor
    {Header: 'Length', accessor: 'length'}, // Updated accessor
    {Header: 'Description', accessor: 'buildingDescription'},
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
    const buildingsDto = buildings?.map((building) =>
      mapBuildingToBuildingDto(building));

    // Update the table data
    handleTableData(buildingsDto || []);
  }, [buildings]); // Depend on buildings

  useEffect(() => {
    if (error) {
      console.error('Error fetching buildings:', error);
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
      <Table columns={columns} data={tableData} handleEdit={handleEdit}
             entityFilters={<BuildingFilters handleDataChange={handleTableData} setIsFilterOn={setIsFilterOn}/>}
             tableEntity={'Building'}
             refreshData={refreshData}
             isFilterOn={isFilterOn}
      />

      <EditModal
        id={'edit-building-modal'}
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        title={'Edit the Building'}
        form={<EditBuildingForm formData={rowContent}
                                handleCloseModal={handleCloseModal}
                                refreshData={refreshData}
        />}
      />
    </>
  );
};

export default BuildingsTable;
