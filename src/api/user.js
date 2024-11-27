
import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// User login
export async function userLoginApi(data) {
    try {
        const response = await callPostApi({ url: "user/sign_in", body: data });
        return response
    } catch (error) {
        throw error;
    }
}

// User forgot password using otp 
export async function userForgotPasswordApi(data) {
    try {
        const response = await callPostApi({ url: "user/forgotPassword/otp", body: data });
        return response
    } catch (error) {
        throw error;
    }
}

// User otp verification api.
export async function checkUserOtpApi(data) {
    try {
        const response = await callPostApi({ url: "user/otp_verification", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// User reset password using otp api.
export async function userResetPassworsUsingOtp(data, id) {
    try {
        const response = await callPutApi({ url: `user/otp_verification/reset_password/${id}`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// User log out api.
export async function userLogoutApi() {
    try {
        const response = await callPostApi({ url: "user/sign_out" });
        return response;
    } catch (error) {
        throw error;
    }
}

// Add user Api
export async function addUserApi(data) {
    try {
        const response = await callPostApi({ url: "user/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// User List api
export async function getUserListApi(data) {
    try {
        const response = await callPostApi({ url: "user/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Get user Data by id .
export async function getUserByid(id) {
    try {
        const response = await callGetApi({ url: `user/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update user api.
export async function userUpdateApi(data) {
    try {
        const response = await callPutApi({ url: 'user/update', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// User delete api.
export async function deleteUserApi(id) {
    try {
        const response = await callDeleteApi({ url: `user/delete/${id}`, id: id });
        return response;
    } catch (error) {
        throw error;
    }
}

//User change password api
export async function changePasswordApi(data) {
    try {
        const response = await callPostApi({ url: 'user/change_password', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}





