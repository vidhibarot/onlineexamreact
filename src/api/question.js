import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Question List api
export async function getQuestionListApi(data) {
    try {
        const response = await callPostApi({ url: "question/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Question delete api.
export async function deleteQuestionApi(id) {

    try {
        const response = await callDeleteApi({ url: `question/delete/${id}`, id: id });
        return response;
    } catch (error) {
        throw error;
    }
}

// Question add api.
export async function addQuestionApi(data) {
    try {
        const response = await callPostApi({ url: `question/add`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get Question Data by id .
export async function getQuestionByid(id) {
    try {
        const response = await callGetApi({ url: `question/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update Question api.
export async function questionUpdateApi(data) {
    try {
        const response = await callPutApi({ url: 'question/update', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

//Update Sortorder api
export async function updateSortOrderApi(data) {
    try {
        const response = await callPutApi({ url: 'question/sort/update', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


//Update Sortorder api
export async function updateQuestionSortOrderApi(data) {
    try {
        const response = await callPutApi({ url: 'question/question_sortOrder/update', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}





