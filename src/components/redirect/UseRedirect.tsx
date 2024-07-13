import {useUserGet} from "../../hooks/useApiRequest";
import {SignUpRequestInDto} from "../../dtos/in/SignUpRequestInDto";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";


export const useRedirect = () => {

  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [iamId, setIamId] = useState<string>('');
  const {data, loading, error, refreshData} = useUserGet<SignUpRequestInDto>(`/SignUpRequest/ids?iamId=${iamId}`);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token)
      return;

    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token) as { [key: string]: any };
      const permission = decodedToken.permissions[0];

      // Redirect to the corresponding page
      switch (permission) {
        case 'manage:campus':
          navigate('/campus');
          break;
        case 'manage:fleet':
          navigate('/fleet');
          break;
        case 'manage:tasks':
          navigate('/task');
          break;
        case 'manage:admin':
          navigate('/admin');
          break;
        case 'user:requests':
          navigate('/user');
          break;
        case 'create:taskrequisition':
          navigate('/user');
          break;
      }

      // Not a use
      setIamId(decodedToken.sub);
    }
  }, [token]);

  useEffect(() => {
    if (iamId) {
      refreshData();
    }
  }, [iamId]);

  useEffect(() => {
    if (data) {
      if (data.status === 'Requested')
        navigate('/awaiting-approval');
    }
  }, [data]);

  return {
    loading,
  }
};
