import { React, useState } from 'react'
import { Link } from 'react-router-dom'
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
import { userForgotPasswordApi } from '../../../api/user'
import { useNavigate } from 'react-router';
import { cilEnvelopeClosed } from '@coreui/icons'
// import { commonDispatch } from '../../../dispatch'
import { commonDispatch } from '../../../dispatch'


const ForgotPassword = () => {
    const [data, setdata] = useState({
        email: "",
    })
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const { showNotification } = commonDispatch();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true);
        let response = await userForgotPasswordApi(data);
        if (response.status === 200) {
            showNotification({
                title: "Success",
                message: response?.data?.message,
                status: 'primary',
                isOpen: true
            })
            navigate("/otp-verification", {
                state: { data },
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
    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">

                    <CCol md={9} lg={7} xl={6}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm className="row g-3 needs-validation"
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleSubmit}>
                                        <h1 className="text-center " style={{ fontSize: "30px", fontWeight: 650, color: 'rgb(88, 86, 214)' }}>Forgot Password</h1>
                                        <p className="text-body-secondary text-center">Enter your email and we'll send you a link to reset your password</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilEnvelopeClosed} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="email"
                                                placeholder="Email Address"
                                                autoComplete="Email Address"
                                                feedbackInvalid="Please enter email."
                                                name="email"
                                                onChange={(event) => setdata({ ...data, email: event.target.value })}
                                                id="validationCustomEmail"
                                                required />
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

export default ForgotPassword
