import React, { useEffect, useState } from 'react';
import {
    CRow, CCard, CCardHeader, CCardBody, CForm, CFormLabel,
    CFormInput, CFormSelect,
    CCol
} from '@coreui/react';
import { AddButton, FormButton } from '../../../ui-components/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { commonDispatch } from '../../../dispatch';
import { addRoleApi, getRoleByid, roleUpdateApi, getModulesListApi } from '../../../api/role';

const RoleForm = () => {
    const { showNotification } = commonDispatch();
    const locationData = useLocation();
    const IsEdit = locationData.state.value;
    const IsEditid = locationData.state.id;
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        status: "",
        permissions: []
    });


    const permissionButtons = ["Read", "Write", "Delete"];
    const [moduleData, setModuleData] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (IsEdit) {
                const response = await getRoleByid(IsEditid);
                if (response && response.status === 200) {
                    setData(response.data.data);
                }
            }
            const moduleResponse = await getModulesListApi();
            if (moduleResponse && moduleResponse.status === 200) {
                setModuleData(moduleResponse.data.data);
            }
        };
        fetchData();
    }, [IsEdit, IsEditid]);

    const handlePermissionClick = (moduleId, permissionType) => {
        setData(prevData => {
            const updatedPermissions = prevData.permissions.map(permission => {
                if (permission.module_id === moduleId) {
                    if (`${permissionType.toLowerCase()}_access` === "read_access" && permission?.read_access === true) {
                        return {
                            ...permission,
                            write_access: false,
                            delete_access: false,
                            [`${permissionType.toLowerCase()}_access`]: !permission[`${permissionType.toLowerCase()}_access`]
                    };
                }
                else {
                    return {
                        ...permission,
                        read_access:true,
                        [`${permissionType.toLowerCase()}_access`]: !permission[`${permissionType.toLowerCase()}_access`]
                    };
                }

            }
                return permission;
        });
      
        if (!updatedPermissions.find(permission => permission.module_id === moduleId)) {
            if (permissionType === "Read") {
                updatedPermissions.push({
                    module_id: moduleId,
                    read_access: permissionType === "Read",
                    write_access: permissionType === "Write",
                    delete_access: permissionType === "Delete"
                });
            }
            else {
                updatedPermissions.push({
                    module_id: moduleId,
                    read_access: true,
                    write_access: permissionType === "Write",
                    delete_access: permissionType === "Delete"
                });
            }

        }

        moduleData.forEach(module => {
            if (!updatedPermissions.find(permission => permission.module_id === module.id)) {
                updatedPermissions.push({
                    module_id: module.id,
                    read_access: false,
                    write_access: false,
                    delete_access: false
                });
            }
        });

        return { ...prevData, permissions: updatedPermissions };
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false || data.name.trim() === "") {
        event.stopPropagation();
        setValidated(true);
        return;
    }

    const apiCall = IsEdit ? roleUpdateApi : addRoleApi;
    const response = await apiCall(data);

    if (response.status === 200) {
        showNotification({
            title: "Success",
            message: response.data.message,
            status: 'primary',
            isOpen: true
        });
        navigate("/pages/role");
    } else {
        showNotification({
            title: "Error",
            message: response.data.message,
            status: 'danger',
            isOpen: true
        });
    }
};

return (
    <>
        <CCard className="mb-4">
            <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", paddingLeft: "35px" }}>
                {IsEdit ? "Edit Role" : "Add Role"}
            </CCardHeader>
            <CCardBody>
                <CRow className="m-2 d-flex align-items-center justify-content-center">
                    <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <CFormLabel htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Name</CFormLabel>
                            <CFormInput
                                type="text"
                                placeholder="Role Name"
                                autoComplete="Role Name"
                                feedbackInvalid="Please enter name."
                                name="name"
                                value={data.name}
                                onChange={(event) => setData({ ...data, name: event.target.value })}
                                id="validationCustomRole"
                                required
                            />
                        </div>

                        <CFormLabel htmlFor="status" style={{ fontWeight: "500", fontSize: "15px" }}>Status</CFormLabel>
                        <CFormSelect
                            name="status"
                            value={data.status}
                            aria-describedby="validationCustom03Feedback"
                            feedbackInvalid="Please select a valid state."
                            onChange={(event) => setData({ ...data, status: event.target.value })}
                            id="validationStatus"
                            required
                        >
                            <option value="2">Please select a status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </CFormSelect>

                        <CRow className='mt-3'>
                            <CCol className='col-3'>
                                <div className='module-name'><label style={{ fontSize: "18px", fontWeight: 700 }}>Module</label></div>
                            </CCol>
                            <CCol className='col-4' style={{ textAlign: "center", fontSize: "18px", fontWeight: 700 }}><div className='permi'><label>Access</label></div></CCol>
                        </CRow>

                        <CRow className='mt-3'>
                            {moduleData.map(module => (
                                <div className='col-data d-flex align-items-center mb-3' key={module.name}>
                                    <CCol className='col-3'>
                                        <div className='module-name-data'><label>{module.name}</label></div>
                                    </CCol>
                                    <CCol className='col-9'>
                                        <div className='acess-data d-flex gap-5'>
                                            {permissionButtons.map(permission => (
                                                <FormButton
                                                    key={permission}
                                                    label={permission}
                                                    type='button'
                                                    onClick={() => handlePermissionClick(module.id, permission)}
                                                    className={data.permissions.some(p => p.module_id === module.id && p[`${permission.toLowerCase()}_access`]) ? 'active-permission' : 'permi-button'}
                                                    height="40px"
                                                    width="80px"
                                                    margin="0px"
                                                    color="black"
                                                    fontWeight="400"
                                                />
                                            ))}
                                        </div>
                                    </CCol>
                                </div>
                            ))}
                        </CRow>
                        <div className='button d-flex gap-3 mt-3 align-items-center justify-content-center'>
                            <AddButton
                                label="Submit"
                                width="100px"
                                height="40px"
                                margin="20px"
                                background="#5856d6"
                                hoverBack="#4b49b6"
                                hoverColor="white"
                                type="submit"
                            />
                            <AddButton
                                label="Cancel"
                                width="100px"
                                height="40px"
                                margin="20px"
                                background="rgb(33, 38, 49)"
                                hoverBack="#000000"
                                hoverColor="white"
                                onClick={() => navigate("/pages/role")}
                            />
                        </div>
                    </CForm>
                </CRow>
            </CCardBody>
        </CCard>
    </>
);
};

export default RoleForm;

