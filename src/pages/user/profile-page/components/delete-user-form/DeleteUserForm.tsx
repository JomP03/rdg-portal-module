import React, { useEffect, useState } from "react";
import FormButton from "../../../../../components/form-button/FormButton";
import { useNavigate } from "react-router";
import { useLogout } from "../../../../../hooks/useLogout";
import { toast } from "react-toastify";
import { UserInDto } from "../../../../../dtos/in/UserInDto";
import { jwtDecode } from "jwt-decode";
import { useDataPatch, useUserGet } from "../../../../../hooks/useApiRequest";

interface DeleteUserFormProps {
  error: any;
  data: UserInDto | undefined;
  closeConfirmationBox: () => void;
  refreshData: () => void;
}

const DeleteUserForm: React.FC<DeleteUserFormProps> = ({error, data, closeConfirmationBox, refreshData}) => {
  const navigate = useNavigate();
  const {logoutAction} = useLogout();
  const {data: rejectTaskData, loading: rejectTaskLoading, sendData} = useDataPatch<String>();

  // Get the IAM id from the local storage, only once
  const [iamId, setIamToken] = useState<string | null>(null);

  useEffect(() => {
    const iamToken = localStorage.getItem('token');
    const decodedToken = jwtDecode(iamToken || '');
    const iamId = decodedToken.sub;
    setIamToken(iamId || null);
  }, []);

  const { data: userData, refreshData: refreshUserData } = useUserGet<UserInDto>('/Users/ids?iamId=' + iamId || '');

  useEffect(() => {
    if(iamId){
      refreshUserData();
    }
  }, [iamId]);

  useEffect(() => {
    if (data) {
      // Close the confirmation box
      closeConfirmationBox();

      // Redirect to the deleted page
      navigate('/deleted')

      // After a few seconds redirect to the login page
      setTimeout(() => {
        logoutAction();
      }, 5000);

      // Reject all tasks of the user
      try{
      sendData('/tasks/tasks/reject?email=' + userData!.email);
      } catch (error: any) {
        toast.error('Error Rejecting Pending Task Requests: ' + error.message);
      }
    }
  }, [data]); 

  useEffect(() => {
    if (error) {
      toast.error('Error deleting account.');
    }
  }, [error]);

  const handleDelete = async () => {
      refreshData();
  }

  return (
    <div>
      <p style={{
      fontSize: "1.5rem",
      textAlign: "center",
      }}>This action cannot be undone.</p>

    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
    }}>
      
      <FormButton label={"Delete"} onClick={handleDelete}></FormButton>
      <FormButton label={"Cancel"} onClick={closeConfirmationBox}></FormButton>
    </div>
    </div>
  );

}

export default DeleteUserForm;