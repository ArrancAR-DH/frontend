import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8080/auth"
export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);