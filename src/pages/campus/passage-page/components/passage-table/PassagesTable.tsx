import React, {useEffect, useState} from "react";
import Table from "../../../../../components/table/Table";
import {useTableData} from "../../../../../hooks/useTableData";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import {mapPassageInToPassageView} from "../../../../../mappers/passageMapper";
import {PassageInDto} from "../../../../../dtos/in/PassageInDto";
import EditModal from "../../../../../components/edit-modal/EditModal";
import {useModal} from "../../../../../hooks/useModal";
import EditPassageForm from "../edit-passage-form/EditPassageForm";
import PassageFilters from "../passage-filters/PassageFilters";


interface PassagePageProps {
  passages: PassageInDto[];
  error: any;
  loading: boolean;
  refreshData: () => void;
  isFilterOn: number;
  setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}

const PassagePage: React.FC<PassagePageProps> = ({
                                                   passages,
                                                   error,
                                                   loading,
                                                   refreshData,
                                                   isFilterOn,
                                                   setIsFilterOn
                                                 }) => {

  const columns = [
    {Header: 'StartPointBuilding', accessor: 'startPointBuilding'},
    {Header: 'StartPointFloor', accessor: 'startPointFloor'},
    {Header: 'EndPointBuilding', accessor: 'endPointBuilding'},
    {Header: 'EndPointFloor', accessor: 'endPointFloor'},
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
    const passageDTO = passages?.map((passage) =>
      mapPassageInToPassageView(passage));

    // Update the table data
    handleTableData(passageDTO || []);
  }, [passages]); // Depend on passages

  useEffect(() => {
    if (error) {
      console.error('Error fetching passages:', error);
    }
  }, [error]);

  // Show loading animation while loading
  if (loading) {
    return <LoadingAnimation/>;
  }

  const handleEdit = (data: { [value: string]: string }) => {
    setRowContent(data);
    handleOpenModal();
  }

  return (
    <>
      <Table columns={columns}
             data={tableData}
             handleEdit={handleEdit}
             entityFilters={<PassageFilters handleDataChange={handleTableData} setIsFilterOn={setIsFilterOn}/>}
             tableEntity={'Passage'}
             refreshData={refreshData}
             isFilterOn={isFilterOn}
      />

      <EditModal
        id={'edit-passage-modal'}
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        title={'Edit the Passage'}
        form={<EditPassageForm
          formData={rowContent}
          handleCloseModal={handleCloseModal}
          refreshData={refreshData}
        />}
      />
    </>
  );

}

export default PassagePage;