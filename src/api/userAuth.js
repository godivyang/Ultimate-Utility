import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
});

const crossAppLogin = async () => {
    try {
        const response = await axiosInstance.get("/sso/crossAppLogin");
        return response.data.data;
    } catch (e) {
        throw e.response.details.message;
    }
};

const checkIfLogin = async () => {
    try {
        let response = await axiosInstance.get("/user/me");
        return response.data.data;
    } catch (e) {
        return await axiosInstance.get("/user/refresh").then((res) => {
            return res.data.data;
        }).catch(e => {
            throw e.response.details.message;
        });
    }
};

const login = async ({ email="", password="" }) => {
    try {
        const response = await axiosInstance.post("/user/login", { email, password });
        return response.data.data;
    } catch (e) {
        throw e.response.details.message;
    }
};

const signup = async ({ name="", email="", password="" }) => {
    try {
        const response = await axiosInstance.post("/user/signup", { name, email, password });
        return response.data.data;
    } catch (e) {
        throw e.response.details.message;
    }
};

const logout = async () => {
    try {
        const response = await axiosInstance.post("/user/logout");
        return response.data.data;
    } catch (e) {
        throw e.response.details.message;
    }
};

const guestLogin = async () => {
    try {
        const response = await axiosInstance.post("/user/guestLogin");
        return response.data.data;
    } catch (e) {
        throw e.response.details.message;
    }
}

export { checkIfLogin, login, logout, signup, crossAppLogin, guestLogin };