import {useState} from 'react';
import {get, post, patch, del} from '../services/DataApiService/DataApiService';

interface ApiResponse<T> {
    data?: T;
    error?: any;
    loading: boolean;
}

interface ExtendedApiResponse<T> extends ApiResponse<T> {
    sendData: (path: string, body?: T) => Promise<void>;
}


export const useDataGet = <T extends object>(path: string, params?: Record<string, unknown>): ApiResponse<T> & { refreshData: () => void } => {
    const [state, setState] = useState<ApiResponse<T>>({loading: false});

    const fetchData = async () => {
        setState({loading: true});

        try {
            const response = await get<T>(path, 'data', params);
            setState({data: response, loading: false});
        } catch (error) {
            setState({error, loading: false});
        }
    };



    const refreshData = async () => {
        await fetchData();
    };

    return {...state, refreshData};
};

export const useDataPost = <T extends object>(): ExtendedApiResponse<T> => {
    const [state, setState] = useState<ApiResponse<T>>({loading: false});

    const sendData = async (path: string, body?: T) => {
        setState({loading: true});

        try {
            const response = await post<T>(path, 'data', body);
            setState({
                data: response,
                loading: false
            });
        } catch (error: any) {
            setState({
                error: error,
                loading: false
            });
            throw error;
        }
    };

    return {...state, sendData};
};

export const useDataPatch = <T extends object>(): ExtendedApiResponse<T> => {
    const [state, setState] = useState<ApiResponse<T>>({loading: false});

    const sendData = async (path: string, body?: unknown) => {
        setState({loading: true});

        try {
            const response = await patch<T>(path, 'data', body);
            setState({
                data: response,
                loading: false
            });
        } catch (error: any) {
            setState({
                error: error,
                loading: false
            });
            throw error;
        }
    };

    return {...state, sendData};
};

export const useUserGet = <T extends object>(path: string, params?: Record<string, unknown>): ApiResponse<T> & { refreshData: () => void } => {
    const [state, setState] = useState<ApiResponse<T>>({loading: false});

    const fetchData = async () => {
        setState({loading: true});

        try {
            const response = await get<T>(path, 'user', params);
            setState({data: response, loading: false});
        } catch (error) {
            setState({error, loading: false});
        }
    };


    const refreshData = async () => {
        await fetchData();
    };

    return {...state, refreshData};
};

export const useUserPost = <T extends object>(): ExtendedApiResponse<T> => {
    const [state, setState] = useState<ApiResponse<T>>({loading: false});

    const sendData = async (path: string, body?: T) => {
        setState({loading: true});

        try {
            const response = await post<T>(path, 'user', body);
            setState({
                data: response,
                loading: false
            });
        } catch (error: any) {
            setState({
                error: error,
                loading: false
            });
            throw error;
        }
    };

    return {...state, sendData};
};

export const useUserPatch = <T extends object>(): ExtendedApiResponse<T> => {
    const [state, setState] = useState<ApiResponse<T>>({loading: false});

    const sendData = async (path: string, body?: unknown) => {
        setState({loading: true});

        try {
            const response = await patch<T>(path, 'user', body);
            setState({
                data: response,
                loading: false
            });
        } catch (error: any) {
            setState({
                error: error,
                loading: false
            });
            throw error;
        }
    };

    return {...state, sendData};
};


export const useUserDelete = <T extends object>(path: string, params?: Record<string, unknown>): ApiResponse<T> & { refreshData: () => void } => {
    const [state, setState] = useState<ApiResponse<T>>({loading: false});

    const fetchData = async () => {
        setState({loading: true});

        try {
            const response = await del<T>(path, 'user', params);
            setState({data: response, loading: false});
        } catch (error: any) {
            setState({error, loading: false});
        }
    };


    const refreshData = async () => {
        await fetchData();
    };

    return {...state, refreshData};
};

