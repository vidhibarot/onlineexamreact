
import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import {
    CRow, CCard, CCardHeader, CCardBody, CForm, CFormLabel,
    CFormInput, CFormSelect, CFormCheck,
    CCol,
    CModal
} from '@coreui/react'
import { IoMdEye } from "react-icons/io";
import { AddButton } from '../../../ui-components/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { commonDispatch } from '../../../dispatch'
import { addExamTypeApi, getExamTypeByid, examTypeUpdateApi } from '../../../api/exam_types';
import { changePasswordApi } from '../../../api/user';
import { IoMdEyeOff } from "react-icons/io";
import "../../../style.css"

const ChangePassword = () => {

    const { showNotification } = commonDispatch();

    const value = JSON.parse(localStorage.getItem("setmodal"));
    const [validated, setValidated] = useState(false);
    const [closeEyeIcon, setcloseEyeIcon] = useState(true)
    const [data, setdata] = useState({
        old_password: "",
        new_password: "",
        confirm_new_password: ""
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            let response = await changePasswordApi(data);
            if (response.status === 200) {
                showNotification({
                    title: "Success",
                    message: response?.data?.message,
                    status: 'primary',
                    isOpen: true
                });
                navigate("/pages/userprofile", { state: { "modal": false } })
            } else {
                showNotification({
                    title: "Error",
                    message: response?.data?.message,
                    status: 'danger',
                    isOpen: true
                });
            }
        }

        setValidated(true);
    };


    const navigate = useNavigate();

    const handleForm = () => {
        navigate("/pages/userprofile", { state: { "modal": false } })
    }

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);


    const handleClickShowPassword = (name) => {
        if (name === 'old_password') {
            setShowOldPassword(!showOldPassword);
        }
        if (name === 'new_password') {
            setShowNewPassword(!showNewPassword);
        }
        if (name === 'confirm_new_password') {
            setShowConfirmNewPassword(!showConfirmNewPassword);
        }
    };

    return (
        <>
            <CRow className="d-flex align-items-center justify-content-center">
                <CForm noValidate
                    validated={validated}
                    onSubmit={handleSubmit}>

                    <CRow>
                        <CCol className='col-12'>

                            <div className='password m-3'>

                                <CFormInput
                                    type={showOldPassword ? "text" : "password"}
                                    placeholder="Current Password"
                                    autoComplete="Current Password"
                                    feedbackInvalid="Please enter current password."
                                    name="old_password"
                                    onChange={(event) => setdata({ ...data, old_password: event.target.value })}
                                    id="validationCustomPassword"
                                    required
                                />

                                <span className='eyeicon'>{!showOldPassword ? <IoMdEyeOff onClick={() => handleClickShowPassword("old_password")} /> : < IoMdEye onClick={() => handleClickShowPassword("old_password")} />}
                                </span>


                            </div>
                            {/* <div></div> */}




                            <div className='password m-3'>
                                <CFormInput
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    autoComplete="New Password"
                                    feedbackInvalid="Please enter new password."
                                    name="new_password"
                                    onChange={(event) => setdata({ ...data, new_password: event.target.value })}
                                    id="validationCustomPassword"
                                    required
                                />
                                <span className='eyeicon'>{!showNewPassword ? <IoMdEyeOff onClick={() => handleClickShowPassword("new_password")} /> : < IoMdEye onClick={() => handleClickShowPassword("new_password")} />}
                                </span>
                            </div>

                            <div className='password m-3'>
                                <CFormInput
                                    type={showConfirmNewPassword ? "text" : "password"}
                                    placeholder="Confirm New Password"
                                    autoComplete="Confirm New Password"
                                    feedbackInvalid="Please enter confirm new password."
                                    name="confirm_new_password"
                                    onChange={(event) => setdata({ ...data, confirm_new_password: event.target.value })}
                                    id="validationCustomPassword"
                                    required
                                />
                                <span className='eyeicon'>{!showConfirmNewPassword ? <IoMdEyeOff onClick={() => handleClickShowPassword("confirm_new_password")} /> : < IoMdEye onClick={() => handleClickShowPassword("confirm_new_password")} />}
                                </span>
                            </div>
                        </CCol>
                    </CRow>

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
        </>
    )
}


export default ChangePassword



