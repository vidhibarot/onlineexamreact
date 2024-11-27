
import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import {
    CRow, CCard, CCardHeader, CCardBody, CForm, CFormLabel,
    CFormInput, CFormSelect, CFormCheck,
    CCol,
    CModal
} from '@coreui/react'

import { AddButton } from '../../../ui-components/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { commonDispatch } from '../../../dispatch'
import { addStandardApi, getStandardByid, standardUpdateApi } from '../../../api/standard';

const StandardForm = () => {
    const { showNotification } = commonDispatch();

    const locationData = useLocation();
    const IsEdit = locationData.state.value;
    const IsEditid = locationData.state.id;
    const [validated, setValidated] = useState(false);

    const [data, setdata] = useState({
        name: "",
        status: ""
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            if (IsEdit) {
                let response = await standardUpdateApi(data);
                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'primary',
                        isOpen: true
                    });
                    navigate("/pages/standards");
                } else {
                    showNotification({
                        title: "Error",
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true
                    });
                }
            }
            else {
                let response = await addStandardApi(data);
                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'primary',
                        isOpen: true
                    });
                    navigate("/pages/standards");
                } else {
                    showNotification({
                        title: "Error",
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true
                    });
                }
            }
        }
        setValidated(true);
    };


    useEffect(() => {
        if (IsEdit) {
            getStandardData();
        }
    }, [IsEdit, IsEditid]);

    const getStandardData = async () => {
        let response = await getStandardByid(IsEditid);
        if (response && response?.status === 200) {
            const standardData = response?.data?.data;
            setdata(standardData);
        }
    };

    const navigate = useNavigate();

    const handleForm = () => {
        navigate("/pages/standards")
    }

    return (
        <>
            <CCard className="mb-4">
                <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", paddingLeft: "35px" }}>
                    {IsEdit ? "Edit Standard" : "Add Standard"}
                </CCardHeader>
                <CCardBody>
                    <CRow className="m-2 d-flex align-items-center justify-content-center">
                        <CForm noValidate
                            validated={validated}
                            onSubmit={handleSubmit}>

                            <CRow>
                                <CCol className='col-md-6 col-sm-6 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Standard Name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        placeholder="Standard Name"
                                        autoComplete="Standard Name"
                                        feedbackInvalid="Please enter standard."
                                        name="name"
                                        value={data?.name}
                                        onChange={(event) => setdata({ ...data, name: event.target.value })}
                                        id="validationCustomUser"
                                        required />
                                </CCol>
                            </CRow>

                            <CCol className='col-md-3 col-sm-3 col-12'>
                                <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Status</CFormLabel>
                                <CFormSelect
                                    name="status"
                                    value={data?.status}
                                    aria-describedby="validationCustom03Feedback"
                                    onChange={(event) => setdata({ ...data, status: event.target.value })}
                                    id="validationStatus"
                                    required
                                    className={`form-control ${data.status === "" && validated ? 'is-invalid' : ''}`}>

                                    <option value="">Please select a status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </CFormSelect>
                                {data.status === "" && validated && <div className="invalid-feedback">Please select a status.</div>}
                            </CCol>

                            <div className='button d-flex gap-3 mt-3 align-items-center justify-content-center'>
                                <AddButton label={"Submit"}
                                    width={"100px"}
                                    height={"40px"}
                                    margin={"15px"}
                                    background={"#5856d6"}
                                    hoverBack={"#4b49b6"}
                                    type="submit"
                                />

                                <AddButton
                                    label={"Cancel"}
                                    width={"100px"}
                                    height={"40px"}
                                    margin={"15px"}
                                    background={"rgb(33, 38, 49)"}
                                    hoverBack={"#000000"}
                                    onClick={handleForm}
                                />
                            </div>
                        </CForm>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}


export default StandardForm



