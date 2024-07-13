import {appConfig} from "../ConfigService/ConfigService";

// Get for the hooks to use. Needs the path and params (if any)
export const get = <T>(path: string, type: string, params?: Record<string, unknown>): Promise<T> => {
    const hasQueryParams = path.includes('?');
    const separator = hasQueryParams ? '&' : '?';
    return buildApiRequest<T>(`${path}${separator}${buildParams(params || {})}`, type, 'GET');
}


// Post for the hooks to use. Needs the path and body (if any)
export const post = <T>(path: string, type: string, body?: unknown): Promise<T> => {
    return buildApiRequest<T>(path, type, 'POST', body);
}

// Patch for the hooks to use. Needs the path and body (if any)
export const patch = <T>(path: string, type: string, body?: unknown): Promise<T> => {
    return buildApiRequest<T>(path, type, 'PATCH', body);
}

// Delete for the hooks to use. Needs the path and params (if any)
export const del = <T>(path: string, type: string, params?: Record<string, unknown>): Promise<T> => {
    const hasQueryParams = path.includes('?');
    const separator = hasQueryParams ? '&' : '?';
    return buildApiRequest<T>(`${path}${separator}${buildParams(params || {})}`, type, 'DELETE');
}

// Used to build the params for the get request
const buildParams = (params: Record<string, unknown>): string => {
    return Object.entries(params)
        .reduce((c, [key, value]) => [...c, `${key}=${value}`], [] as string[])
        .join('&');
}

/**
 * Build the api request
 * @param path
 * @param type
 * @param method
 * @param data
 * @returns
 */
const buildApiRequest = <T>(path: string, type: string, method = 'GET', data?: unknown): Promise<T> => {
    const requestUri = buildPath(path, type);

    let body: string | undefined | any;

    if (['POST', 'PATCH'].includes(method)) {
        body = JSON.stringify(data);
    }

    const token = localStorage.getItem('token');

    return fetch(requestUri, {
        method,
        body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status >= 200 && response.status <= 300) {
            return response.json();
        }
        return response.json().then((data) => Promise.reject(data));
    });
}

/**
 * Builds the path to access the api
 * @param path
 * @param type
 * @returns
 */
const buildPath = (path: string, type: string): string => {
    if (type === 'user') {
        return `${appConfig.UserApiHost}/api${path}`;
    }
    return `${appConfig.DataApiHost}/api${path}`;
};
