import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";
import {useUserGet} from "../../hooks/useApiRequest";
import AuthInDto from "../../dtos/in/AuthInDto";
import {jwtDecode} from "jwt-decode";
import LoadingAnimation from "../loading-animation/LoadingAnimation";
import {toast} from "react-toastify";
import { StateInDto } from "../../dtos/in/StateInDto";


const CallbackPage = () => {

  const navigate = useNavigate();

  const {isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();
  const [userId, setUserId] = useState<string | undefined>('');
  const {data, error, loading, refreshData} = useUserGet<AuthInDto>('/Auth/' + userId || '');
  const {data: state, error: stateError, loading: stateLoading, refreshData: refreshState} =
    useUserGet<StateInDto>('/SignUpRequest/state?iamId=' + userId || '');


  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        // Store token in local storage
        localStorage.setItem('token', token);

        // Decode token to get user id
        const decodedToken = jwtDecode(token);

        setUserId(decodedToken.sub);
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);


  // Check if user is already signed up
  useEffect(() => {
    if (userId) {
      refreshData();
      refreshState();
    }
  }, [userId]);


  useEffect(() => {
    if (data && state) {

      switch (data.role) {
        case 'awaiting-approval':
          navigate('/awaiting-approval');
          break;
        case 'ADMIN':
          navigate('/admin/');
          break;
        case 'CAMPUS_MANAGER':
          navigate('/campus/');
          break;
        case 'FLEET_MANAGER':
          navigate('/fleet/');
          break;
        case 'TASK_MANAGER':
          navigate('/task/');
          break;
        case 'ENDUSER':
          navigate('/user/');
          break;
        default:
          if(state.state === 'Requested'){
             navigate('/awaiting-approval');
          } else {
            navigate('/sign-up');
          }
          break;
      }
    }
  }, [data, state]);

  // Handle error
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // Handle loading
  if (isLoading || loading || stateLoading) {
    return <LoadingAnimation/>;
  }

  return (
    <>
    </>
  )
}

export default CallbackPage;