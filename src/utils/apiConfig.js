import { API_BASE_URL } from "../api/endPoints";

// Enum for allowed HTTP methods
export const HttpMethod = Object.freeze({
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
});

/**
 * Creates common fetch options for API requests.
 * @param {HttpMethod} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {object} additionalHeaders - Any additional headers to include.
 * @returns {object} - The fetch options object.
 */
const createFetchOptions = (method,withCredentials = false) => {
    return {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: withCredentials,
    };
};

// Export the base URL and the fetch options function
export { API_BASE_URL, createFetchOptions };
