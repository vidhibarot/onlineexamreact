import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Exam type List api
export async function getExamTypeListApi(data) {
    try {
        const response = await callPostApi({ url: "exam_type/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Exam type delete api.
export async function deleteExamTypeApi(id) {

    try {
        const response = await callDeleteApi({ url: `exam_type/delete/${id}`, id: id });
        return response;
    } catch (error) {
        throw error;
    }
}

// Exam type add api.
export async function addExamTypeApi(data) {
    try {
        const response = await callPostApi({ url: `exam_type/add`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get exam type data by id .
export async function getExamTypeByid(id) {
    try {
        const response = await callGetApi({ url: `exam_type/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update exam type api.
export async function examTypeUpdateApi(data) {
    try {
        const response = await callPutApi({ url: 'exam_type/update', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}






