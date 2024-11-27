
import React, { useEffect, useState } from 'react'
import {
    CRow, CCard, CCardHeader, CCardBody
} from '@coreui/react'

import { useLocation, useNavigate } from 'react-router-dom';
import { commonDispatch } from '../../../dispatch'
import { addSubjectApi, getSubjectByid, subjectUpdateApi } from '../../../api/subject';
import { getUserByid } from '../../../api/user';
import "../../../style.css"
import moment from 'moment';
import "../../../style.css"


const StudentResults = () => {
    const { showNotification } = commonDispatch();

    const userIds = useLocation();

    const [defaultFilter, setDefaultFilter] = useState({
        "itemsPerPage": 5,
        "currentPage": 1,
        "sortBy": [],
        "filters": []
    });

    const [data, setdata] = useState({
        name: "",
        status: ""
    })


    const getSubjectData = async () => {
        let response = await getSubjectByid();
        if (response && response?.status === 200) {
            setdata(response?.data?.data);
        }
    };

    const [currentYearData, setCurrentYearDate] = useState();
    const [previousYearData, setPreviousYearData] = useState();
    const [userName, setUserName] = useState()
    const navigate = useNavigate();

    const handleForm = () => {
        navigate("/pages/subjects")
    }

    const getUserExamResult = async () => {
        let response = await getUserByid(userIds?.state?.id);
        if (response && response?.status === 200) {
            setUserName(response?.data?.data?.full_name)
            let currentYear = moment().year()
            const currentYearData = response?.data?.data?.user_exam_enrolls.filter(data => {
                let dateFromOfData = (data?.result?.user_enroll_year);
                return dateFromOfData == currentYear;
            });

            setCurrentYearDate(currentYearData)
            const previousYearData = response?.data?.data?.user_exam_enrolls.filter(data => {
                let dateFromOfData = (data?.result?.user_enroll_year);
                return dateFromOfData != currentYear;
            });

            const groupedByYear = previousYearData.reduce((acc, fruit) => {
                const years = fruit?.result?.user_enroll_year;
                (acc[years] = acc[years] || []).push(fruit);
                return acc;
            }, {});

            const resultArray = Object.values(groupedByYear);

            setPreviousYearData(resultArray)
        }
    };
  

    useEffect(() => {
        getUserExamResult();
        getSubjectData();
    }, [defaultFilter])



    return (
        <>
          
            <CCard className="mb-4">
                <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", paddingLeft: "35px" }}>
                    Exam Result
                </CCardHeader>
                <CCardBody>
                    <CRow className="m-2 d-flex align-items-center justify-content-center">

                        <CCard style={{ padding: "0px" }}>
                            <div >
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "8px",
                                    background: "rgb(35 64 79)",
                                    borderRadius: "5px 5px 0px 0px",
                                    color: "white",
                                }}>
                                    <span> <span style={{ fontWeight: "700" }}>{userName}</span>`s Result Information</span>
                                </div>
                                {
                                    previousYearData?.length > 0 &&
                                    <CCard style={{ margin: "20px" }}>
                                        <div style={{ padding: "20px" }}>
                                            <h5 style={{ marginBottom: "0px" }}> Previous year result </h5>
                                            {
                                                previousYearData?.map((yearData, index) => (

                                                    <div style={{ overflowX: "auto" }} key={index}>

                                                        <h6 style={{ textAlign: "center", padding: "5px", marginBottom: "0px" }}>Year: {yearData[0]?.result?.user_enroll_year}</h6>
                                                        <table>
                                                            <tr>
                                                                <th>Subject</th>
                                                                <th>Exam</th>
                                                                <th>Standard</th>
                                                                <th>Exam Date</th>
                                                                <th>Total Marks</th>
                                                                <th>Obtain</th>
                                                            </tr>
                                                            {
                                                                yearData.map((data, index) => (
                                                                    <>
                                                                        <tr>
                                                                            <td>{data?.result?.exam?.subject?.name}</td>
                                                                            <td>{data?.result?.exam?.exam_type?.name}</td>
                                                                            <td>{data?.result?.exam?.standard?.name}</td>
                                                                            <td>{data?.result?.exam?.date}</td>
                                                                            <td>{data?.result?.exam?.total_marks}</td>
                                                                            <td>{data?.result?.total_right_ans_marks}</td>
                                                                        </tr>
                                                                    </>
                                                                ))
                                                            }
                                                        </table >
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </CCard>

                                }
                                {
                                    currentYearData?.length > 0 &&
                                    <CCard style={{ margin: "20px" }}>
                                        <div style={{ padding: "20px" }}>
                                            <h5 style={{ marginBottom: "0px" }}> Current year result </h5>
                                            <div style={{ overflowX: "auto" }}>
                                                <h6 style={{ textAlign: "center", padding: "5px", marginBottom: "0px" }}>Year: {currentYearData[0].result?.user_enroll_year}</h6>
                                                <table>

                                                    <tr>
                                                        <th>Subject</th>
                                                        <th>Exam</th>
                                                        <th>Standard</th>
                                                        <th>Exam Date</th>
                                                        <th>Total Marks</th>
                                                        <th>Obtain</th>

                                                    </tr>
                                                    {
                                                        currentYearData?.map((yearData, index) => (
                                                            <tr>
                                                                <td>{yearData?.result?.exam?.subject?.name}</td>
                                                                <td>{yearData?.result?.exam?.exam_type?.name}</td>
                                                                <td>{yearData?.result?.exam?.standard?.name}</td>
                                                                <td>{yearData?.result?.exam?.date}</td>
                                                                <td>{yearData?.result?.exam?.total_marks}</td>
                                                                <td>{yearData?.result?.total_right_ans_marks}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </table>
                                            </div>
                                        </div>
                                    </CCard>

                                }

                                {
                                    previousYearData?.length == 0 && currentYearData?.length == 0 &&
                                    <div style={{ fontSize: "30px", textAlign: "center", height: "50vh", margin: "auto" }}>No Data Found...</div>

                                }

                            </div>
                        </CCard>
                    </CRow>
                </CCardBody>
            </CCard >
        </>
    )
}

export default StudentResults

