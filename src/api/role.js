import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";
import { commonDispatch } from "../dispatch";
// Role List api
export async function getRolesListApi(data) {
    try {
        const response = await callPostApi({ url: "role/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Roles delete api.
export async function deleteRoleApi(id) {

    try {
        const response = await callDeleteApi({ url: `role/delete/${id}`, id: id });
        return response;
    } catch (error) {
        throw error;
    }
}

// Roles add api.
export async function addRoleApi(data) {
    try {
        const response = await callPostApi({ url: `role/add`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get role Data by id .
export async function getRoleByid(id) {
    try {
        const response = await callGetApi({ url: `role/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update role api.
export async function roleUpdateApi(data) {
    try {
        const response = await callPutApi({ url: 'role/update', body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Module List api
export async function getModulesListApi(data) {
    try {
        const response = await callGetApi({ url: "module/list" });
        return response;
    } catch (error) {
        throw error;
    }
}


export async function restrictApi(modulesData) {
    let moduleData;

    for (const module of modulesData || []) {
        if (!module?.to) {
            moduleData = await restrictApi(module?.items);

            if (moduleData) {
                break;
            }
        } else {

            if (module?.to === window.location.href?.slice(23)) {

                moduleData = module;
                break; 
            }
        }
    }
    return moduleData;
}







