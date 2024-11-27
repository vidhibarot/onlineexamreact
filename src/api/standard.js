import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Standard List api
export async function getStandardListApi(data) {
    try {
        const response = await callPostApi({ url: "standard/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Standard delete api.
export async function deleteStandardApi(id) {

    try {
        const response = await callDeleteApi({ url: `standard/delete/${id}`, id: id });
        return response;
    } catch (error) {
        throw error;
    }
}

// Standard add api.
export async function addStandardApi(data) {
    try {
        const response = await callPostApi({ url: `standard/add`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get standard Data by id .
export async function getStandardByid(id) {
    try {
        const response = await callGetApi({ url: `standard/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update standard api.
export async function standardUpdateApi(data) {
    try {
        const response = await callPutApi({  url: 'standard/update', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}






