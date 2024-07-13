import Title from "../../../components/base/title/Title"
import "./profile-page.css"
import ProfilePic from "../../../assets/user.png"
import { useUserDelete, useUserGet } from "../../../hooks/useApiRequest"
import { jwtDecode } from "jwt-decode";
import { UserInDto } from "../../../dtos/in/UserInDto"
import LogoutButton from "../../../components/logout-button/LogoutButton"
import FormButton from "../../../components/form-button/FormButton"
import { mapUserInDtoToUserViewDto } from "../../../mappers/userMapper";
import { useEffect, useState } from "react";
import editImage from "../../../assets/pencil-edit.png";
import ImageButton from "../../../components/base/image-button/ImageButton";
import EditModal from "../../../components/edit-modal/EditModal";
import EditUserForm from "./components/edit-user-form/EditUserForm";
import { useModal } from "../../../hooks/useModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import DeleteUserForm from "./components/delete-user-form/DeleteUserForm";


const ProfilePage = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token!);
  const userId = decodedToken.sub;
  const { data, refreshData } = useUserGet<UserInDto>('/Users/ids?iamId=' + userId || '');
  const { data: deleteData, error, refreshData: deleteRefreshData }  = useUserDelete<UserInDto>('/Users/' + userId || '');

  // States for the modals
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { showModal: showConfirmationBox, handleOpenModal: openConfirmationBox, handleCloseModal: closeConfirmationBox } = useModal();

  // State for the row content
  const [rowContent, setRowContent]
    = useState<{ [key: string]: string }>({});


  const handleClickExport = () => {
    if(data != undefined){
    const userInfoToShow = mapUserInDtoToUserViewDto(data!);

    // Export JSON file
    const jsonData = JSON.stringify(userInfoToShow, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = data.name + '_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    } else {
      toast.error("Error exporting data!");
    }
  };

  // Initialize the user data, only executed once
  useEffect(() => {
    refreshData();
  }, []);

  const handleEdit = () => {
    //put data into row content
    setRowContent({
      id: data?.id!,
      name: data?.name!,
      nif: data?.nif!,
      phoneNumber: data?.phoneNumber!,
    });
    handleOpenModal();
  }

  const handleClickDelete = () => {
    openConfirmationBox();
  }


  return (
    <>
      <br></br>
      <Title text={"My Profile"} className={"main-titles"}></Title>
      <br /><br />

      <div className={"profile-info"}>
        <img src={ProfilePic} alt={"Profile Picture"} className={"profile-picture"}></img>
        <div className={"profile-details"}>
          <p className={"profile-name"}>
            <b>Name: </b>{data?.name}
          </p>
          <p className={"profile-email"}>
            <b>Email: </b>{data?.email}
          </p>
          <p className={"profile-contact"}>
            <b>Phone Number: </b>{data?.phoneNumber}
          </p>
          {(data?.nif !== null) && (
            <p className={"profile-nif"}>
              <b>Nif: </b>{data?.nif}
            </p>
          )}
        </div>

        
        {(data?.roleName == 'ENDUSER') &&
          <ImageButton className={'profile-edit-button'} imageUrl={editImage} onClick={handleEdit} height={"60px"} width={"60px"} />
        }
        

      </div>
      {(data?.roleName == 'ENDUSER') &&
        <div className={"profile-actions"}>
          <Title text={"Export Account Data"} className={"export-data-title"}></Title>
          <p className={"export-data-text"}>Export your account data to a JSON file. This file will contain all of your account data. </p>
          <FormButton
            label={"Export Data"}
            onClick={handleClickExport}></FormButton>
          <br />

          <Title text={"Delete Account"} className={"delete-account-title"}></Title>
          <p className={"delete-account-text"}>Permanently delete your account. This action cannot be undone.</p>
          <LogoutButton
            label={"Delete Account"}
            onClick={handleClickDelete}></LogoutButton>
        </div>
      }

      {(data?.roleName == 'ENDUSER') && <EditModal
        id={'edit-user-modal'}
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        title={'Edit Your Profile'}
        form={<EditUserForm formData={rowContent} handleCloseModal={handleCloseModal} refreshData={refreshData} role={data?.roleName!}
        />}
      />}

      {(data?.roleName == 'ENDUSER') && <EditModal
        id={'delete-user-modal'}
        isOpen={showConfirmationBox}
        onRequestClose={closeConfirmationBox}
        title={'Are you sure you want to delete your account?'}
        form={<DeleteUserForm error={error} data={deleteData} closeConfirmationBox={closeConfirmationBox} refreshData={deleteRefreshData}></DeleteUserForm>}
      />}
    </>
  )
}

export default ProfilePage;