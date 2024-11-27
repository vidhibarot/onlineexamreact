import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Subject List api
export async function getSubjectListApi(data) {
    try {
        const response = await callPostApi({ url: "subject/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Subject delete api.
export async function deleteSubjectApi(id) {

    try {
        const response = await callDeleteApi({ url: `subject/delete/${id}`, id: id });
        return response;
    } catch (error) {
        throw error;
    }
}

// Subject add api.
export async function addSubjectApi(data) {
    try {
        const response = await callPostApi({ url: `subject/add`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get subject Data by id .
export async function getSubjectByid(id) {
    try {
        const response = await callGetApi({ url: `subject/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update subject api.
export async function subjectUpdateApi(data) {
    try {
        const response = await callPutApi({ url: 'subject/update', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}






