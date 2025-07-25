import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
});

const crossAppLogin = async () => {
    try {
        const response = await axiosInstance.get("/sso/crossAppLogin");
        return response.data;
    } catch (e) {
        throw e;
    }
};

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

const guestLogin = async () => {
    try {
        const response = await axiosInstance.post("/user/guestLogin");
        return response.data;
    } catch (e) {
        throw e;
    }
}

export { checkIfLogin, login, logout, signup, crossAppLogin, guestLogin };