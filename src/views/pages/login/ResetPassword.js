import { React, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { userResetPassworsUsingOtp } from '../../../api/user';
import { cilLockLocked } from '@coreui/icons';
// import { cidEye } from '@coreui/icons';
// import { cilEyeSlash } from '@coreui/icons';
import { useNavigate } from 'react-router';
import { cilEnvelopeClosed } from '@coreui/icons'
import { MuiOtpInput } from 'mui-one-time-password-input'
// import { commonDispatch } from '../../../dispatch'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { commonDispatch } from '../../../dispatch'
import { nominalTypeHack } from 'prop-types'
// import {Icon} from 'react-icons-kit';
// import {eyeOff} from 'react-icons-kit/feather/eyeOff';
// import {eye} from 'react-icons-kit/feather/eye'



const ResetPassword = () => {
    const location = useLocation();
    const userid = location?.state?.id;
    const [newpass, setnewpass] = useState(false);
    const [confirmpass, setconfirmpass] = useState(false);


    const [data, setdata] = useState({
        new_password: "",
        confirm_password: ""
    });
    const [feild, setfeild] = useState({ otp: "" })
    const [validated, setValidated] = useState(false);
    const [otpSecond, setOtpSecond] = useState(59);
    const navigate = useNavigate();
    const { showNotification } = commonDispatch();

    const handleChange = (value) => {
        setdata(value)
        setfeild({ otp: value })
    }

    const showpassword = (name) => {
        if (name === "confirm_password") {
            setconfirmpass(!confirmpass)
        }

        if (name === "new_password") {
            setnewpass(!newpass)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true);
        let response = await userResetPassworsUsingOtp(data, userid);
        if (response.status === 200) {
            showNotification({
                title: "Success",
                message: response?.data?.message,
                status: 'primary',
                isOpen: true
            })
        }
        else {
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'danger',
                isOpen: true
            })

        }
    }


    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6} >
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm className="row g-3 needs-validation"
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleSubmit}>
                                        <h1 className="text-center " style={{ fontSize: "30px", fontWeight: 650, color: 'rgb(88, 86, 214)' }}>Reset Password</h1>
                                        <p className="text-body-secondary text-center">Please enter the verification code sent to
                                        </p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type={newpass ? 'text' : 'password'}
                                                placeholder="New Password"
                                                autoComplete="current-password"
                                                feedbackInvalid="Please enter new password."
                                                name="new_password"
                                                onChange={(event) => setdata({ ...data, new_password: event.target.value })}
                                                id="validationCustomPassword"
                                                required />
                                            {
                                                newpass ?
                                                    <IoIosEye style={{
                                                        position: "absolute",
                                                        right: "30px",
                                                        fontSize: "30px",
                                                        cursor: 'pointer'
                                                    }}
                                                        onClick={() => showpassword("new_password")} />

                                                    :
                                                    <IoIosEyeOff
                                                        style={{
                                                            position: "absolute",
                                                            right: "30px",
                                                            fontSize: "30px",
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => showpassword("new_password")} />

                                            }


                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type={confirmpass ? 'text' : 'password'}
                                                placeholder="Confirm Password"
                                                autoComplete="current-password"
                                                feedbackInvalid="Please enter valid confirm."
                                                name="confirm_password"
                                                onChange={(event) => setdata({ ...data, confirm_password: event.target.value })}
                                                id="validationCustomPassword"
                                                required
                                            />
                                            {
                                                confirmpass ?
                                                    <IoIosEye
                                                        style={{
                                                            position: "absolute",
                                                            right: "30px",
                                                            fontSize: "30px",
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => showpassword("confirm_password")} />
                                                    :
                                                    <IoIosEyeOff
                                                        style={{
                                                            position: "absolute",
                                                            right: "30px",
                                                            fontSize: "30px",
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => showpassword("confirm_password")} />

                                            }

                                        </CInputGroup>


                                        <CRow>
                                            <CCol xs={12} className='d-flex justify-content-center' style={{ marginLeft: "14px" }} >
                                                <CButton color="primary w-100" type="submit" className="px-4">
                                                    Submit
                                                </CButton>
                                            </CCol>
                                            <CCol> <hr></hr></CCol>

                                            <CCol xs={12} className="text-right d-flex justify-content-center">
                                                <CButton color="link " className="px-0 text-decoration-none">
                                                    <Link to="/" className='text-decoration-none'> Back to Login?</Link>
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>

        </div>
    )
}

export default ResetPassword
