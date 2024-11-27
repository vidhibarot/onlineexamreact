import React, { Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import SnackbarNotification from './ui-components/snackbar/snackbar'
import _nav from './_nav'
import { commonDispatch } from './dispatch'
import { socket } from './socket'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

import useExamTime from './ui-components/customhook/customhook'

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const ForgotPassword = React.lazy(() => import('./views/pages/login/forgotpassword'))
const OtpVerification = React.lazy(() => import('./views/pages/login/OtpVerification'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const { setUserExamData } = commonDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, [])
  const userData = useSelector((state) => state?.user);
 
  const onConnect = () => {
 
    const data = {
      "standard_id": userData.userData?.standard_user_relation?.standard?.id
    }

    socket.emit('standardId', { data });

    socket.on("sendQuestionList", (questionData) => {

      if (questionData && userData?.userExamData) {
        if (Object.keys(userData?.userExamData).length === 0 && questionData.length > 0 && userData?.userData?.standard_user_relation?.standard?.id === questionData[0]?.standard_id) {
          setUserExamData(questionData)
        }
      }
    });
  };

  //useEffect for connect user with socket when login 
  useEffect(() => {
    if (userData?.isLogin === true) {
      socket.on('connect', onConnect);
    }
  }, [])

  const [examduration] = useExamTime();

  return (
    // <HashRouter>
    <>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route exact path="/forgotPassword" name="ForgotPassword Page" element={<ForgotPassword />} />
          <Route exact path="/otp-verification" name="OtpVerification Page" element={<OtpVerification />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
      <SnackbarNotification />
    </>

    // </HashRouter>
  )
}

export default App
