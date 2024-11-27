import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Result List api
export async function getResultListApi(data) {
    try {
        const response = await callPostApi({ url: "result/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}
