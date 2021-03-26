import axios from "axios";

// This is an extraction of the http functionality. Made to remove axios and messy code from parent component.
axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    
    if (!expectedError) {
        console.log("Logging the error", error);
        alert("An unexpected error occured.");
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};