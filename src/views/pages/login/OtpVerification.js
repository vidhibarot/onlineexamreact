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
    CRow,
} from '@coreui/react'
import { checkUserOtpApi, userForgotPasswordApi } from '../../../api/user'
import { useNavigate } from 'react-router';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { commonDispatch } from '../../../dispatch'

const OtpVerification = () => {
    const location = useLocation();
    const userEmail = location?.state?.data?.email;;

    const [data, setdata] = useState();
    const [feild, setfeild] = useState({ otp: "" })
    const [validated, setValidated] = useState(false);
    const [otpSecond, setOtpSecond] = useState(59);
    const navigate = useNavigate();
    const { showNotification } = commonDispatch();

    const handleChange = (value) => {
        setdata(value)
        setfeild({ otp: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true);
        let response = await checkUserOtpApi(feild);
        let id = response?.data?.data?.user_id;
        if (response.status === 200) {
            showNotification({
                title: "Success",
                message: response?.data?.message,
                status: 'primary',
                isOpen: true
            })
            navigate("/reset-password", {
                state: { id },
            });
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

    const resendOtp = async (email) => {
        setOtpSecond(59);
        let response = await userForgotPasswordApi({ email: email });
        if (response?.status === 200) {
            showNotification({
                title: "Success",
                message: response?.data?.message,
                status: 'primary',
                isOpen: true
            })
        } else if (response?.status === 401) {
            redirectToLoginPage();
        } else {
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'danger',
                isOpen: true
            })
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (otpSecond > 0) {
                setOtpSecond(otpSecond - 1);
            }
            if (otpSecond === 0) {
                clearInterval(interval);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [otpSecond, location]);

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
                                        <h1 className="text-center " style={{ fontSize: "30px", fontWeight: 650, color: 'rgb(88, 86, 214)' }}>OTP Verification</h1>
                                        <p className="text-body-secondary text-center">Please enter the verification code sent to
                                            <span style={{
                                                fontWeight: 600,
                                                color: "black"
                                            }}> {userEmail}</span></p>
                                        <CRow>
                                            <CCol xs={12}>
                                                <MuiOtpInput
                                                    length={6}
                                                    value={data}
                                                    style={{ gap: '7px', padding: '10px' }}
                                                    onChange={handleChange}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol className='d-flex align-items-center justify-content-center gap-3'>
                                                <p className='mb-0'> Didn't receive an OTP?</p>
                                                <button
                                                    disabled={otpSecond > 0}
                                                    onClick={() => resendOtp(userEmail)}
                                                    style={{
                                                        '&:hover': {
                                                            backgroundColor: 'transparent',
                                                            textDecoration: 'underline',
                                                            cursor: `${otpSecond > 0 ? 'not-allowed !important' : 'pointer'}`,
                                                        },
                                                        border: "none",
                                                        backgroundColor: "white",
                                                        textDecoration: 'underline',
                                                        color: `${otpSecond > 0 ? '#94a3b8 !important' : ' #0095da'}`,
                                                        m: '0 !important',
                                                        pointerEvents: 'unset !important'
                                                    }}>Resend otp</button>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            {otpSecond > 0 &&
                                                <CCol className='text-center'>
                                                    <p style={{ marginTop: 10 }}>
                                                        <span>Time Remaining: {otpSecond < 10 ? `0${otpSecond}` : otpSecond}s</span>
                                                    </p>
                                                </CCol>
                                            }
                                        </CRow>

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

export default OtpVerification
