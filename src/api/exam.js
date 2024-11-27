import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Exam list api
export async function getExamListApi(data) {
    try {
        const response = await callPostApi({ url: "exam/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Exam delete api.
export async function deleteExamApi(id) {

    try {
        const response = await callDeleteApi({ url: `exam/delete/${id}`, id: id });
        return response;
    } catch (error) {
        throw error;
    }
}

// Exam add api.
export async function addExamApi(data) {
    try {
        const response = await callPostApi({ url: `exam/add`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get Exam data by id .
export async function getExamByid(id) {
    try {
        const response = await callGetApi({ url: `exam/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update Exam api.
export async function examUpdateApi(data) {
    try {
        const response = await callPutApi({ url: 'exam/update', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get Exam data by id .
export async function getUserEnrollByExamId(data) {
    try {
        const response = await callPostApi({ url: 'user_exam_enroll/getDataByexamId/list', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get Exam data by id .
export async function userExamEnrollApi(data) {
    try {
        const response = await callPostApi({ url: 'user_exam_enroll/add', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}








