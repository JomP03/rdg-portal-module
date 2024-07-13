// Base
import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/table/Table';
import {useTableData} from "../../../../../hooks/useTableData";
import EditModal from '../../../../../components/edit-modal/EditModal';
import {useModal} from '../../../../../hooks/useModal';
import LoadingAnimation from '../../../../../components/loading-animation/LoadingAnimation';

import  {SignUpRequestInDto}  from '../../../../../dtos/in/RegistrationRequestResponseList';
import { mapSignUpRequestInDtoToSignUpRequestViewDto } from '../../../../../mappers/signUpRequestMapper';
import ManageSignUpRequestForm from '../manage-signup-request-form/ManageSignUpRequestForm';


interface SignUpRequestTableProps {
  requests: SignUpRequestInDto[];
  error: any;
  loading: boolean;
  refreshData: () => void;
}


const SignUpRequestTable: React.FC<SignUpRequestTableProps> =
  ({requests, error, loading, refreshData}) => {
    const columns = [
      {Header: 'Name', accessor: 'name'},
      {Header: 'Email', accessor: 'email'},
      {Header: 'Nif', accessor: 'nif'},
      {Header: 'Phone Number', accessor: 'phoneNumber'},
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


        // Map the requests to the view dto
        const requestsDto = requests.map(request => mapSignUpRequestInDtoToSignUpRequestViewDto(request));

        // Update the table data
        handleTableData(requestsDto || []);
    }, [requests]); // Depend on requests (for updating the table data)


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
               isFilterable={false}
               entityFilters={null}
               tableEntity={'Request'}
               refreshData={refreshData}
        />
      
    {<EditModal
          id={'manage-request-modal'}
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          title={'Manage Request'}
          form={<ManageSignUpRequestForm formData={rowContent} handleCloseModal={handleCloseModal} refreshData={refreshData}
          />}
        />}
      </>
    );
  };


export default SignUpRequestTable;