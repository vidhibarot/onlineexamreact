
import React, { useEffect, useState } from 'react'
import {
    CRow, CCard, CCardHeader, CCardBody, CForm, CFormLabel,
    CFormInput, CFormSelect,
    CCol
} from '@coreui/react'

import { useLocation, useNavigate } from 'react-router-dom';
import { commonDispatch } from '../../../dispatch'
import { addSubjectApi, getSubjectByid, subjectUpdateApi } from '../../../api/subject';
import { getResultListApi } from '../../../api/result';
import "../../../style.css"

const SubjectForm = () => {
    const { showNotification } = commonDispatch();

    const locationData = useLocation();
    const userIds = useLocation();
    const [userExamEnrollData, setUserExamEnrollData] = useState([])
    const [rowCount, setRowCount] = useState(0);

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
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false || data.name.trim() === "") {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        // if (IsEdit) {
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
        // }
        // else {
        let response1 = await addSubjectApi(data);
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
        // }

    };


    const getSubjectData = async () => {
        let response = await getSubjectByid();
        if (response && response?.status === 200) {
            setdata(response?.data?.data);
        }
    };

    const [validated, setValidated] = useState(false);
    const [userImage, setUserImage] = useState()
    const navigate = useNavigate();

    const handleForm = () => {
        navigate("/pages/subjects")
    }



    const getUserExamEnrollList = async (filterValue) => {
        const examFilter = { id: 'exam_id', value: parseInt(userIds?.state?.exam_id), id: 'user_id', value: parseInt(userIds?.state?.user_id) };

        const filters = filterValue.filters.filter((filter) => filter.id !== 'exam_id' && filter.id !== 'user_id');
        filters.push(examFilter);

        filterValue.filters = filters;

        let response = await getResultListApi(filterValue ?? defaultFilter);

        if (response && response?.status === 200) {
            setUserExamEnrollData(response?.data?.data?.rows);
            response?.data?.data?.rows?.map((userData) => {
                setUserImage(userData?.user?.image)
            })
            // setUserImage(response?.data?.data?.rows?.user?.image)
        } else {
            showNotification({
                title: 'Error',
                message: response?.data?.message,
                status: 'error',
                isOpen: true
            });
        }
    };
    
    useEffect(() => {
        getUserExamEnrollList(defaultFilter)
        getSubjectData();
    }, [defaultFilter])



    return (
        <>
            <CCard className="mb-4">
                <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", paddingLeft: "35px" }}>
                    Online Exam Result
                </CCardHeader>
                <CCardBody>
                    <CRow className="m-2 d-flex align-items-center justify-content-center">
                        <CCard className='p-3'>
                            <div className='d-flex'>
                                <div className='image-part'><img src={userImage} className='image'></img></div>
                                <div>
                                    <div className='description'><h3>Johnny Lever</h3></div>
                                    <div><CFormLabel style={{ marginBottom: "0px" }}>Email</CFormLabel><br></br>
                                        <CFormLabel>johnny@mailinator.com</CFormLabel>
                                    </div>

                                    <div><CFormLabel style={{ marginBottom: "0px" }}>Email</CFormLabel><br></br>
                                        <CFormLabel>johnny@mailinator.com</CFormLabel>
                                    </div>

                                </div>

                            </div>
                        </CCard>

                        <CCard className='p-3 mt-4'>
                            <div className='result-part'>
                                <div className='result'>
                                    <h2>Result Details</h2>
                                    {/* <div className='image-part'><img src={userImage} className='image'></img></div>
                                <div className='description'>fffff</div> */}
                                </div>
                                <div>
                                    <CFormLabel>hello</CFormLabel>
                                    <CFormLabel>hello</CFormLabel>
                                </div>
                            </div>
                            {/* <div className='result'>
                                <h2>Result Details</h2>
                              
                            </div> */}
                        </CCard>

                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}

export default SubjectForm

