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
import { userLoginApi } from '../../../api/user'
import { useNavigate } from 'react-router';
import { cilLockLocked, cilUser } from '@coreui/icons'
import { commonDispatch } from '../../../dispatch'


const Login = () => {
  const [data, setdata] = useState({
    email: "",
    password: ""
  })
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { showNotification, setLoginData, setUserData, setModuleData } = commonDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true);
    let response = await userLoginApi(data);

    if (response.status === 200) {
      showNotification({
        title: "Success",
        message: response?.data?.message,
        status: 'primary',
        isOpen: true
      })
      setLoginData(response?.data?.data?.token);
      setUserData(response?.data?.data);
      setModuleData(response?.data?.data?.role?.modules)
      navigate("/dashboard")
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
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email Address"
                        autoComplete="Email Address"
                        feedbackInvalid="Please enter email in valid format."
                        name="email"
                        onChange={(event) => setdata({ ...data, email: event.target.value })}
                        id="validationCustomEmail"
                        required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        feedbackInvalid="Please enter password."
                        name="password"
                        onChange={(event) => setdata({ ...data, password: event.target.value })}
                        id="validationCustomPassword"
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          <Link to="/forgotPassword"> Forgot password?</Link>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Welcome Page</h2>
                    <p>
                      Online examination system
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
