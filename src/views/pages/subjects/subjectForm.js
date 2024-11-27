
import React, { useEffect, useState } from 'react'
import {
    CRow, CCard, CCardHeader, CCardBody, CForm, CFormLabel,
    CFormInput, CFormSelect
} from '@coreui/react'
import { AddButton } from '../../../ui-components/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { commonDispatch } from '../../../dispatch'
import { addSubjectApi, getSubjectByid, subjectUpdateApi } from '../../../api/subject';

const SubjectForm = () => {
    const { showNotification } = commonDispatch();

    const locationData = useLocation();
    const IsEdit = locationData.state.value;
    const IsEditid = locationData.state.id;

    const [data, setdata] = useState({
        name: "",
        status: ""
    })
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false || data.name.trim() === "") {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (IsEdit) {
            let response = await subjectUpdateApi(data);
            if (response.status === 200) {
                showNotification({
                    title: "Success",
                    message: response?.data?.message,
                    status: 'primary',
                    isOpen: true
                });

                navigate("/pages/subjects");
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
            let response = await addSubjectApi(data);
            if (response.status === 200) {
                showNotification({
                    title: "Success",
                    message: response?.data?.message,
                    status: 'primary',
                    isOpen: true
                });

                navigate("/pages/subjects");
            } else {
                showNotification({
                    title: "Error",
                    message: response?.data?.message,
                    status: 'danger',
                    isOpen: true
                });
            }
        }

    };


    const getSubjectData = async () => {
        let response = await getSubjectByid(IsEditid);
        if (response && response?.status === 200) {
            setdata(response?.data?.data);
        }
    };

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleForm = () => {
        navigate("/pages/subjects")
    }

    useEffect(() => {
        getSubjectData();
    }, [])



    return (
        <>
            <CCard className="mb-4">
                <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", paddingLeft: "35px" }}>
                    {IsEdit ? "Edit Subject" : "Add Subject"}
                </CCardHeader>
                <CCardBody>
                    <CRow >

                    </CRow>
                    <CRow className="m-2 d-flex align-items-center justify-content-center">
                        <CForm noValidate validated={validated}>
                            <div className="mb-3">
                                <CFormLabel htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    placeholder="Subject Name "
                                    autoComplete="Subject Name"
                                    feedbackInvalid="Please enter name."
                                    name="name"
                                    value={data.name}
                                    onChange={(event) => setdata({ ...data, name: event.target.value })}
                                    id="validationCustomSubject"
                                    required />
                            </div>

                            <CFormLabel htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Status</CFormLabel>
                            <CFormSelect
                                name="status"
                                value={data.status}
                                aria-describedby="validationCustom03Feedback"
                                feedbackInvalid="Please select a valid state."
                                onChange={(event) => setdata({ ...data, status: event.target.value })}
                                id="validationStatus"
                                required
                            >
                                <option value="2">Please select a status</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </CFormSelect>
                            <div className='button d-flex gap-3 mt-3 align-items-center justify-content-center'>
                                <AddButton label={"Submit"} onClick={handleSubmit}
                                    width={"100px"}
                                    height={"40px"}
                                    margin={"20px"}
                                    background={"#5856d6"}
                                    hoverBack={"#4b49b6"}
                                    // activeColor={"rgb(110 101 213 / 32%)"}
                                    hoverColor={"white"} />

                                <AddButton
                                    label={"Cancel"}
                                    width={"100px"}
                                    height={"40px"}
                                    margin={"20px"}
                                    background={"rgb(33, 38, 49)"}
                                    hoverBack={"#000000"}
                                    // activeColor={"rgb(110 101 213 / 32%)"}
                                    hoverColor={"white"}
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

export default SubjectForm

