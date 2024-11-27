import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Question type List api
export async function getQuestionTypeListApi(data) {
    try {
        const response = await callPostApi({ url: "question_type/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Question type delete api.
export async function deleteQuestionTypeApi(id) {

    try {
        const response = await callDeleteApi({ url: `question_type/delete/${id}`, id: id });
        return response;
    } catch (error) {
        throw error;
    }
}

// Question type add api.
export async function addQuestionTypeApi(data) {
    try {
        const response = await callPostApi({ url: `question_type/add`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get Question type Data by id .
export async function getQuestionTypeByid(id) {
    try {
        const response = await callGetApi({ url: `question_type/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update Question type api.
export async function QuestionTypeUpdateApi(data) {
    try {
        const response = await callPutApi({ url: 'question_type/update', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}






