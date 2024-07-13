import React, {useEffect} from "react";
import Form from "../../../../../components/base/form/Form";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import BackofficeUserForm from "../backoffice-user-form/BackofficeUserForm";
import {useDataPost, useUserGet, useUserPost} from "../../../../../hooks/useApiRequest";
import {toast} from "react-toastify";
import {BackofficeUserOutDto} from "../../../../../dtos/out/BackofficeUserOutDto";
import {UserRole, UserRoleList} from "../../../../../interfaces/userRole";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";


const CreateBackofficeUserForm = () => {
    // Use the usePost hook to handle the creation (POST) request
    const {data, loading, sendData} = useUserPost<BackofficeUserOutDto>();

    // State responsible for holding the role's id
    const [roleId, setRoleId] = React.useState<string>();

    // State for the form content
    const {formContent, handleChangeTextField, handleChangeSelect} = useCreateFormState();

    // Get the roles from the API
    const {data: roleList, error: rolesError, loading: rolesLoading, refreshData: getRoles} =
        useUserGet<UserRoleList>('/Users/ManagerRoles');

    // Get the roles data, only executed once
    useEffect(() => {
        getRoles();
    }, []);

    // Function to convert role name to a more readable format
    const formatRoleName = (name: string) => {
        // Split the name by underscores, make every word lowercase and capitalize the first letter and join them
        return name.split("_").map((word) => word.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())).join(" ");
    };

    const rolesToUse = roleList?.roles || [];
    // Prepare the roles data, {value: roleName, id: roleId}
    const rolesWithId = rolesToUse
        .filter((role): role is UserRole & { name: string; id: string } =>
            role.name !== undefined && role.id !== undefined
        )
        .map((role) =>
            ({ value: formatRoleName(role.name), id: role.id }));

    // Change the role id when the role changes
    useEffect(() => {
        const roleElement = document.getElementById(formContent.userRoleId);
        if (roleElement) {
            const roleId = roleElement.accessKey;
            setRoleId(roleId);
        }
    }, [formContent.userRoleId]);

    // When the data is successfully sent, show a success toast and refresh the data
    useEffect(() => {
        // If the data is present, inform the user
        if (data) {
            toast.success(`User ${data.name} with email ${data.email} created successfully!`);
        }
    }, [data]);

    // Define the required fields
    const requiredFields = [
        formContent.userEmail,
        formContent.userName,
        formContent.userPhoneNumber,
        formContent.userPassword,
        formContent.userRoleId
    ];

    // Handle the submission of the form
    const handleSubmit = async () => {
        // If the form is not filled, tell the field that is not filled to show the error
        const isFormFilled = requiredFields.every((field) => field);
        if (!isFormFilled) {
            toast.warning("Please fill all the required fields!");
            return;
        }

        // Map the form content to a BackofficeUserOutDto
        const backofficeUserOutDto: BackofficeUserOutDto = {
            email: formContent.userEmail,
            name: formContent.userName,
            phoneNumber: formContent.userPhoneNumber,
            password: formContent.userPassword,
            roleId: roleId as string
        };

        // Send the request
        try {
            await sendData("/Users", backofficeUserOutDto);

            // Clear the form
            clearForm();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    // Method to clear the form
    const clearForm = () => {
        for (const key in formContent) {
            formContent[key as keyof typeof formContent] = "";
        }
    };

    if (rolesError) {
        toast.error(rolesError.message);
    }

    if (rolesLoading) return <LoadingAnimation/>;

    const createUserForm =
        <BackofficeUserForm rolesData={rolesWithId || []}
                            nameValue={formContent.userName}
                            emailValue={formContent.userEmail}
                            phoneNumberValue={formContent.userPhoneNumber}
                            passwordValue={formContent.userPassword}
                            userRoleValue={formContent.userRoleId}
                            handleChangeTextField={handleChangeTextField}
                            handleChangeSelect={handleChangeSelect}/>;

    return (
        <Form form={createUserForm} onSubmit={handleSubmit} buttonText={"Create User"} waitingForResponse={loading}/>
    );
};

export default CreateBackofficeUserForm;
