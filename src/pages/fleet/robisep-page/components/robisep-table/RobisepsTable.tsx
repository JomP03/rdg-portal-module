import React, {useEffect, useState} from "react";
import {useTableData} from "../../../../../hooks/useTableData";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import Table from "../../../../../components/table/Table";
import RobisepInDTO from "../../../../../dtos/in/RobisepInDTO";
import {mapRobisepInToRobisepView} from "../../../../../mappers/robisepMapper";
import RobisepFilters from "./../robisep-filters/robisep-filters/RobisepFilters";
import EditModal from "../../../../../components/edit-modal/EditModal";
import {useModal} from "../../../../../hooks/useModal";
import EditRobisepForm from "./../edit-robisep-form/EditRobisepForm";


interface RobisepTableProps {
  robiseps: RobisepInDTO[];
  error: any;
  loading: boolean;
  refreshData: () => void;
  isFilterOn: number;
  setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}

const RobisepsTable: React.FC<RobisepTableProps> = ({
                                                      robiseps, error,
                                                      loading, refreshData,
                                                      isFilterOn, setIsFilterOn
                                                    }) => {
  const columns = [
    {Header: 'Nickname', accessor: 'nickname'},
    {Header: 'Serial Number', accessor: 'serialNumber'},
    {Header: 'Code', accessor: 'code'},
    {Header: 'Descripton', accessor: 'description'},
    {Header: 'State', accessor: 'state'},
    {Header: 'Robisep Type', accessor: 'robisepTypeDesignation'},
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
    const robisepTypeDTO = robiseps?.map((robisepType) =>
      mapRobisepInToRobisepView(robisepType));

    // Update the table data
    handleTableData(robisepTypeDTO || []);
  }, [robiseps]); // Depend on robisepTypes

  // If any error occurs, log it
  useEffect(() => {
    if (error) {
      console.error('Error fetching robiseps:', error);
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
             entityFilters={<RobisepFilters handleDataChange={handleTableData} setIsFilterOn={setIsFilterOn}/>}
             tableEntity={'Robisep'}
             refreshData={refreshData}
             isFilterOn={isFilterOn}
             isEditable={true}
      />

      <EditModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        title={'Edit a Robisep'}
        form={<EditRobisepForm formData={rowContent}
                               handleCloseModal={handleCloseModal}
                               refreshData={refreshData}
        />}
      />
    </>
  )
}

export default RobisepsTable;