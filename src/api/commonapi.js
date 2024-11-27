// import { COMMON_API, USER, UTILS } from "utils/apiConstant";
import { callPostApi, callGetApi } from "./api";

// Common api for status change.
export async function statusChangeApi(data) {
    try {
        const response = await callPostApi({ url: "utils/update/status", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}




