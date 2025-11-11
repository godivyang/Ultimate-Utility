import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
});

// const wait = (time=1000, res) => {
//     setTimeout(async () => res(), time);
// }

const crossAppLogin = async () => {
    try {
        const response = await axiosInstance.get("/sso/crossAppLogin");
        return response.data.data;
    } catch (e) {
        throw e.response.data.details;
    }
};

const checkIfLogin = async () => {
    // return new Promise((res,rej) => wait(3500, res)).then(async () => {
    try {
        let response = await axiosInstance.get("/user/me");
        return response.data.data;
    } catch (e) {
        return await axiosInstance.get("/user/refresh").then((res) => {
            return res.data.data;
        }).catch(e => {
            throw e.response.data.details;
        });
    }
    // });
};

const login = async ({ email="", password="" }) => {
    try {
        const response = await axiosInstance.post("/user/login", { email, password });
        return response.data.data;
    } catch (e) {
        throw e.response.data.details;
    }
};

const signup = async ({ name="", email="", password="" }) => {
    try {
        const response = await axiosInstance.post("/user/signup", { name, email, password });
        return response.data.data;
    } catch (e) {
        throw e.response.data.details;
    }
};

const logout = async () => {
    try {
        const response = await axiosInstance.post("/user/logout");
        return response.data.data;
    } catch (e) {
        throw e.response.data.details;
    }
};

const guestLogin = async () => {
    try {
        const response = await axiosInstance.post("/user/guestLogin");
        return response.data.data;
    } catch (e) {
        throw e.response.data.details;
    }
}

export { checkIfLogin, login, logout, signup, crossAppLogin, guestLogin };