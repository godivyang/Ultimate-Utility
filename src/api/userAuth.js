import axios from "axios";

const baseURL = ["https://ult-userauth.onrender.com","http://localhost:3001"]

const axiosInstance = axios.create({
    baseURL: baseURL[0],
    withCredentials: true
});

const checkIfLogin = async () => {
    try {
        const response = await axiosInstance.get("/user/me");
        return response.data;
    } catch (e) {
        throw e;
    }
};

const login = async ({ email="", password="" }) => {
    try {
        const response = await axiosInstance.post("/user/login", { email, password });
        return response.data;
    } catch (e) {
        throw e;
    }
};

const signup = async ({ name="", email="", password="" }) => {
    try {
        const response = await axiosInstance.post("/user/signup", { name, email, password });
        return response.data;
    } catch (e) {
        throw e;
    }
};

const logout = async () => {
    try {
        const response = await axiosInstance.post("/user/logout");
        return response.data;
    } catch (e) {
        throw e;
    }
};

export { checkIfLogin, login, logout, signup };