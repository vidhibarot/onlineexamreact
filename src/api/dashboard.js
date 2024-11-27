import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Exam list api
export async function getDashboardCountApi() {
    try {
        const response = await callGetApi({ url: "dashboard/getcount" });
        return response;
    } catch (error) {
        throw error;
    }
}








