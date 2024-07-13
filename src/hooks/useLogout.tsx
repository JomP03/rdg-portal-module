import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import {HOME_PATH} from "../pages/Routes";


export function useLogout() {

    const navigate = useNavigate();
    const {logout} = useAuth0();

    function logoutAction() {
        // Remove the access token from the local storage
        localStorage.removeItem('token');

        // Logout from Auth0
        logout();
        // Navigate to the home page
        navigate(HOME_PATH);
    }

    return {
        logoutAction,
    };
}