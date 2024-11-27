import React, { useEffect, useState } from 'react'
import { getDashboardCountApi } from '../../api/dashboard'

import {
  CButton,
  CCol,
  CRow,
  CWidgetStatsC,
} from '@coreui/react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { FaBookOpen } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getResultListApi } from '../../api/result'
import { commonDispatch } from '../../dispatch'
import { SiBookstack } from "react-icons/si";
import { MdVerified } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import moment from 'moment';

const Dashboard = () => {
  const userData = useSelector((state) => state?.user)
  const todaydate = moment().format("YYYY-MM-DD");

  const userExam = userData?.userExamData;

  const { showNotification, setUserExamData, setUserTodayExamData } = commonDispatch()
  const navigate = useNavigate()
  const [userResult, setUserResult] = useState();
  const [dashboardCount, setDashboardCount] = useState()

  const resultData = async () => {
    let response = await getResultListApi();
    const resultData = response?.data?.data?.rows
    if (resultData && userExam?.length > 0) {
      const value = resultData?.filter((data) => data?.user_id == userData?.userData?.id && data?.exam_id == userExam[0]?.id);
      if (value.length > 0 || userExam[0]?.date != todaydate) {
        setUserExamData({})
        setUserTodayExamData({})
      }
      setUserResult(value)
    }

    if (response.status === 200) {
      showNotification({
        title: "Success",
        message: response?.data?.message,
        status: 'primary',
        isOpen: true
      });

    } else {
      showNotification({
        title: "Error",
        message: response?.data?.message,
        status: 'danger',
        isOpen: true
      });
    }
  }

  const getDashboardCount = async () => {
    let response = await getDashboardCountApi();
    if (response.status === 200) {
      showNotification({
        title: "Success",
        message: response?.data?.message,
        status: 'primary',
        isOpen: true
      });
      setDashboardCount(response?.data?.data)
    } else {
      showNotification({
        title: "Error",
        message: response?.data?.message,
        status: 'danger',
        isOpen: true
      });
    }
  }

  useEffect(() => {
    resultData();
    getDashboardCount();
  }, [])

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]
  const pageNavigate = () => {
    // navigate("/pages/examPaper")
    navigate("/pages/new_exampaper")
  }

  const goToResultPage = () => {
    const id = userData?.userData?.id
    navigate("/pages/student_results", {
      state: { id },
    });
  }
  return (
    <>

      <CRow>

        {
          userExam && userExam?.length > 0 ?
            <>
              <CCol className='col-lg-4 col-md-6 col-sm-12 col-xs-12 col-12' style={{ position: "relative" }}>
                <CWidgetStatsC
                  className="mb-3"
                  icon={<FaBookOpen style={{ fontSize: "50px" }}></FaBookOpen>}
                  color="primary"
                  inverse
                  text="Widget helper text"
                  title="Today's Exam"
                  value={userExam[0]?.subject?.name}
                />
                <CButton style={{
                  position: "absolute",
                  background: "#323260",
                  border: "none",
                  color: "white",
                  bottom: "30%",
                  right: "10%"
                }} onClick={pageNavigate}>Start</CButton>
              </CCol>
            </> : <></>
        }
        {
          userData?.userData?.role?.name == "Students" &&
          <CCol className='col-lg-4 col-md-6 col-sm-12 col-xs-12 col-12'>
            <CWidgetStatsC
              className="mb-3"
              icon={<MdVerified style={{ fontSize: "50px" }}></MdVerified>}
              color="success"
              inverse
              onClick={goToResultPage}
              text="Widget helper text"
              title="View Result Here"
              value="Result"
            />
          </CCol>
        }
        {
          userData?.userData?.role?.name != "Students" &&
          <>
            <CCol className='col-lg-4 col-md-6 col-sm-12 col-xs-12 col-12'>
              <CWidgetStatsC
                className="mb-3"
                icon={<GiNotebook style={{ fontSize: "50px" }}></GiNotebook>}
                color="danger"
                inverse
                onClick={() => navigate("/pages/exams", { state: { "todayData": true } })}
                text="Widget helper text"
                title="Exams"
                value={dashboardCount?.todayExamData?.count}
              />
            </CCol>
            <CCol className='col-lg-4 col-md-6 col-sm-12 col-xs-12 col-12'>
              <CWidgetStatsC
                className="mb-3"
                icon={<PiStudentFill style={{ fontSize: "50px" }}></PiStudentFill>}
                color="primary"
                inverse
                // onClick={goToResultPage}
                onClick={() => navigate("/pages/users", { state: { "student": true } })}
                text="Widget helper text"
                title="Students"
                value={dashboardCount?.studentData?.count}
              />
            </CCol>
            <CCol className='col-lg-4 col-md-6 col-sm-12 col-xs-12 col-12'>
              <CWidgetStatsC
                className="mb-3"
                icon={<SiGoogleclassroom style={{ fontSize: "50px" }}></SiGoogleclassroom>}
                color="warning"
                inverse
                // onClick={goToResultPage}
                onClick={() => navigate("/pages/standards")}
                text="Widget helper text"
                title="Standards"
                value={dashboardCount?.standardData?.count}
              />
            </CCol>
            <CCol className='col-lg-4 col-md-6 col-sm-12 col-xs-12 col-12'>
              <CWidgetStatsC
                className="mb-3"
                icon={<SiBookstack style={{ fontSize: "50px" }}></SiBookstack>}
                color="success"
                inverse
                // onClick={goToResultPage}
                onClick={() => navigate("/pages/subjects")}
                text="Widget helper text"
                title="Subjects"
                value={dashboardCount?.subjectData?.count}
              />
            </CCol>
          </>
        }
      </CRow>
    </>
  )
}

export default Dashboard
