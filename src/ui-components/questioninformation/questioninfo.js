import { CRow, CCol, CFormLabel, CAlert } from '@coreui/react'
import React, { Suspense, useEffect } from 'react'
import moment from 'moment';
import CIcon from '@coreui/icons-react';
import { cilWarning } from '@coreui/icons';



const GeneralInformation = (responseData) => {

    let totalMinutes = responseData?.data?.exam_duration;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    let Duration;

    if (hours === 0) {
        Duration = `${minutes} minutes`;
    } else if (hours === 1 && minutes === 0) {
        Duration = `${hours} hour`;
    } else if (hours === 1) {
        Duration = `${hours} hour, ${minutes} minutes`;
    } else if (minutes === 0) {
        Duration = `${hours} hours`;
    } else {
        Duration = `${hours} hours, ${minutes} minutes`;
    }

    return (
        <CRow>
            <CCol className='col-12'>

                <div className="mb-3" style={{ background: "#feecc547", width: "100%", padding: "10px", borderLeft: "5px solid #db5d5d94" }}>
                    <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "18px", width: "auto" }}>Exam Information</CFormLabel>
                    <div>
                        <CRow className="d-lg-flex">
                            <CCol>
                                <div className='d-flex'>
                                    <CFormLabel style={{ fontSize: "15px", width: "50%" }}>Exam name</CFormLabel>
                                    <CFormLabel style={{ fontSize: "15px" }}><span style={{ marginRight: "15px" }}>:</span>{responseData?.data?.exam_type?.name}</CFormLabel>
                                </div>
                            </CCol>
                            <CCol>
                                <div style={{ display: "flex" }}>
                                    <CFormLabel style={{ fontSize: "15px", width: "50%" }}>Subject</CFormLabel>
                                    <CFormLabel style={{ fontSize: "15px" }}><span style={{ marginRight: "15px" }}>:</span>{responseData?.data?.subject?.name}</CFormLabel>
                                </div>
                            </CCol>

                        </CRow>
                        <CRow>
                            <CCol>
                                <div style={{ display: "flex" }}>
                                    <CFormLabel style={{ fontSize: "15px", width: "50%" }}>Date</CFormLabel>
                                    <CFormLabel style={{ fontSize: "15px" }}><span style={{ marginRight: "15px" }}>:</span>{moment(responseData?.date).format('MMMM Do YYYY')}</CFormLabel>
                                </div>
                            </CCol>
                            <CCol>
                                <div style={{ display: "flex" }}>
                                    <CFormLabel style={{ fontSize: "15px", width: "50%" }}>Start Time</CFormLabel>
                                    <CFormLabel style={{ fontSize: "15px" }}><span style={{ marginRight: "15px" }}>:</span>{Duration}</CFormLabel>
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <div style={{ display: "flex" }}>
                                    <CFormLabel style={{ fontSize: "15px", width: "50%" }}>Time</CFormLabel>
                                    <CFormLabel style={{ fontSize: "15px" }}><span style={{ marginRight: "15px" }}>:</span>{responseData?.data?.exam_duration} Minutes</CFormLabel>
                                </div>
                            </CCol>
                            <CCol>
                                <div style={{ display: "flex" }}>
                                    <CFormLabel style={{ fontSize: "15px", width: "50%" }}>Maximum marks</CFormLabel>
                                    <CFormLabel style={{ fontSize: "15px" }}><span style={{ marginRight: "15px" }}>:</span>{responseData?.data?.total_marks} Marks</CFormLabel>
                                </div>
                            </CCol>
                        </CRow>
                    </div>

                    <CAlert color="danger" className="d-flex align-items-center mt-3" style={{padding:"10px"}}>
                        <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                        <div>After submitting, you will not be able to edit the exam</div>
                    </CAlert>
                </div>
                <div style={{ background: "#484861", height: "5px", }}></div>
            </CCol>

        </CRow>
    )
}
export default GeneralInformation