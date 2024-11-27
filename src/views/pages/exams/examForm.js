import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    CRow, CCard, CCardHeader, CCardBody, CForm, CFormLabel,
    CFormInput, CFormSelect, CFormCheck,
    CCol,
    CModal, CFormTextarea
} from '@coreui/react'

import { AddButton } from '../../../ui-components/form';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import { commonDispatch } from '../../../dispatch'
import { getSubjectListApi } from "../../../api/subject"
import { addExamApi, getExamByid, examUpdateApi } from '../../../api/exam';
import { getExamTypeListApi } from '../../../api/exam_types';
import { getStandardListApi } from '../../../api/standard';
import { getQuestionTypeListApi } from '../../../api/question_type';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const ExamForm = () => {
    const { showNotification } = commonDispatch();

    const locationData = useLocation();
    const IsEdit = locationData.state.value;
    const IsEditid = locationData.state.id;
    const [validated, setValidated] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [data, setdata] = useState({
        exam_type_id: "",
        subject_id: "",
        standard_id: "",
        description: "",
        total_questions: "",
        total_marks: "",
        min_percentage: "",
        date: "",
        start_time: "",
        end_time: "",
        exam_duration: "",
        status: "",
        "questionType": []
    });

    const [subjectData, setsubjectData] = useState();
    const [standardData, setstandardData] = useState();
    const [questionTypeData, setQuestionTyepData] = useState();

    const [examType, setExamType] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            const totalQuestion = data?.questionType.map((product) => parseInt(product.total_questions))
            const total = totalQuestion.reduce((acc, curr) => acc + curr)

            if (total !== parseInt(data?.total_questions)) {
                showNotification({
                    title: "Error",
                    message: "Your total questions and selected multiple choice and single line questions value not matched",
                    status: 'danger',
                    isOpen: true
                });
            }
            else {
                if (IsEdit) {
                    let response = await examUpdateApi(data);
                    if (response.status === 200) {
                        showNotification({
                            title: "Success",
                            message: response?.data?.message,
                            status: 'primary',
                            isOpen: true
                        });
                        navigate("/pages/exams");
                    } else {
                        showNotification({
                            title: "Error",
                            message: response?.data?.message,
                            status: 'danger',
                            isOpen: true
                        });
                    }
                }
                else {
                    let response = await addExamApi(data);
                    if (response.status === 200) {
                        showNotification({
                            title: "Success",
                            message: response?.data?.message,
                            status: 'primary',
                            isOpen: true
                        });
                        navigate("/pages/exams");
                    } else {
                        showNotification({
                            title: "Error",
                            message: response?.data?.message,
                            status: 'danger',
                            isOpen: true
                        });
                    }
                }
            }
        }
        setValidated(true);
    };

    const handleBirthDate = (date) => {
        if (date) {
            setdata({ ...data, date: moment(date).format('YYYY-MM-DD') || "" });
            setStartDate(date);

        } else {
            setdata({ ...data, date: '' });
            setStartDate('');
        }
    }
    const handleStartTime = (time) => {
        if (time) {
            const formattedTime = moment(time, 'HH:mm').format('HH:mm:ss');
            const end = moment(time, 'HH:mm').add(data.exam_duration, 'minutes').format('HH:mm');
            setdata({
                ...data,
                start_time: formattedTime,
                end_time: end
            });
            setStartTime(time);
            setEndTime(end);
        } else {
            setdata({ ...data, start_time: '', end_time: '' });
            setStartTime('');
            setEndTime('');
        }
    }



    const handleduration = (e) => {
        setStartTime()
        setEndTime()
        setdata({ ...data, exam_duration: e })
    }

    useEffect(() => {
        getQuestionTypeData();
        getStandardData();
        getSubjectData();
        getExamTypeData();
        if (IsEdit) {
            getExamData();
        }
    }, [IsEdit, IsEditid]);

    const getExamData = async () => {
        let response = await getExamByid(IsEditid);
        if (response && response?.status === 200) {
            const examData = response?.data?.data;
            setdata({
                ...response?.data?.data, questionType: response?.data?.data?.
                    exam_questiontype_relations
            })


            if (examData?.date) {
                setStartDate(moment(examData?.date).toDate() || "");
            }
            if (examData?.start_time || examData?.end_time) {
                setStartTime(examData?.start_time)
                setEndTime(examData?.end_time)
            }
        }
    };

    const getSubjectData = async () => {
        let response = await getSubjectListApi();
        if (response && response?.status === 200) {
            setsubjectData(response?.data?.data?.rows)
        }
    }

    const getExamTypeData = async () => {
        let response = await getExamTypeListApi();
        if (response && response?.status === 200) {
            setExamType(response?.data?.data?.rows)
        }
    }

    const getStandardData = async () => {
        let response = await getStandardListApi();
        if (response && response?.status === 200) {
            setstandardData(response?.data?.data?.rows)
        }
    }

    const getQuestionTypeData = async () => {
        let response = await getQuestionTypeListApi();
        if (response && response?.status === 200) {
            setQuestionTyepData(response?.data?.data?.rows)
        }
    }


    const handleCheckbox = (event) => {
        const { id, checked } = event.target;
        if (checked) {
            document.getElementById(event.target.value).style.display = "initial";
            setdata(prevState => ({
                ...prevState,
                questionType: [...prevState.questionType, { question_type_id: parseInt(id) }]
            }));
        }
        else {
            document.getElementById(event.target.value).style.display = "none";
            setdata(prevState => ({
                ...prevState,
                questionType: prevState.questionType.filter(qt => qt.question_type_id !== parseInt(id))
            }));
        }

    }

    const handleInput = (event) => {
        setdata(prevState => ({
            ...prevState,
            questionType: prevState.questionType.map(question =>
                question.question_type_id === parseInt(event.target.name) ? { ...question, total_questions: event.target.value } : question
            )
        }));
    }

    const navigate = useNavigate();

    const handleForm = () => {
        navigate("/pages/exams")
    }

    return (
        <>
            <CCard className="mb-4">
                <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", paddingLeft: "35px" }}>
                    {IsEdit ? "Edit Exam" : "Add Exam"}
                </CCardHeader>
                <CCardBody>
                    <CRow className="m-2 d-flex align-items-center justify-content-center">
                        <CForm noValidate
                            validated={validated}
                            onSubmit={handleSubmit}>

                            <CRow>

                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Exam Name</CFormLabel>
                                    <CFormSelect
                                        name=""
                                        value={data?.exam_type_id}
                                        aria-describedby="validationCustom03Feedback"
                                        onChange={(event) => setdata({ ...data, exam_type_id: event.target.value })}
                                        id="validationsubject"
                                        required
                                        className={`form-control ${data.exam_type_id === "" && validated ? 'is-invalid' : ''}`}>

                                        <option value="">Please select exam type</option>
                                        {
                                            examType?.map((data) => (
                                                <option value={data?.id}>{data?.name}</option>

                                            ))
                                        }
                                    </CFormSelect>
                                    {data.exam_type_id === "" && validated && <div className="invalid-feedback">Please select a exam type.</div>}
                                </CCol>


                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Suject Name</CFormLabel>
                                    <CFormSelect
                                        name="subject_id"
                                        value={data?.subject_id}
                                        aria-describedby="validationCustom03Feedback"
                                        onChange={(event) => setdata({ ...data, subject_id: event.target.value })}
                                        id="validationsubject"
                                        required
                                        className={`form-control ${data.subject_id === "" && validated ? 'is-invalid' : ''}`}>

                                        <option value="">Please select a subject</option>
                                        {
                                            subjectData?.map((data) => (
                                                <option value={data?.id}>{data?.name}</option>

                                            ))
                                        }
                                    </CFormSelect>
                                    {data.subject_id === "" && validated && <div className="invalid-feedback">Please select a subject.</div>}
                                </CCol>

                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Description</CFormLabel>
                                    <CFormTextarea
                                        id="exampleFormControlTextarea1"
                                        rows={2}
                                        value={data?.description}
                                        feedbackInvalid="Please enter description."
                                        text="Must be 8-20 words long."
                                        onChange={(event) => setdata({ ...data, description: event.target.value })}
                                        required
                                    ></CFormTextarea>
                                </CCol>


                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Standard</CFormLabel>
                                    <CFormSelect
                                        name=""
                                        value={data?.standard_id}
                                        aria-describedby="validationCustom03Feedback"
                                        onChange={(event) => setdata({ ...data, standard_id: event.target.value })}
                                        id="validationsubject"
                                        required
                                        className={`form-control ${data.standard_id === "" && validated ? 'is-invalid' : ''}`}>

                                        <option value="">Please select standard</option>
                                        {
                                            standardData?.map((data) => (
                                                <option value={data?.id}>{data?.name}</option>
                                            ))
                                        }
                                    </CFormSelect>
                                    {data.exam_type_id === "" && validated && <div className="invalid-feedback">Please select standard.</div>}
                                </CCol>

                                <CCol className='col-md-6 col-sm-6 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Select question type</CFormLabel><br></br>
                                    {
                                        questionTypeData?.map((questionData) => (

                                            <>


                                                <CFormCheck inline
                                                    id={questionData?.id}
                                                    value={questionData?.name}
                                                    label={questionData?.name}
                                                    onChange={(e) => handleCheckbox(e)}
                                                    // checked=
                                                    // {data?.questionType?.find(qt => parseInt(qt[0]?.question_type_id) === questionData.id) === true ? qt.id : ""}
                                                    checked={data?.questionType?.some(qt => qt.question_type_id === questionData.id)}
                                                    required={`${data?.questionType?.length}` > 0 ? false : true}
                                                // className={`${data?.questionType?.length === 0 && validated ? 'is-invalid' : ''}`}


                                                />
                                                <br></br>

                                                <CFormInput
                                                    type="number"
                                                    placeholder={`enter no of ${questionData.name} questions`}
                                                    id={questionData?.name}
                                                    name={questionData?.id}
                                                    onChange={(event) => handleInput(event)}
                                                    feedbackInvalid={`${data?.questionType?.some(qt => qt.question_type_id === questionData.id) ? `Please enter no of ${questionData?.name} question which you want` : ''}`}
                                                    value={
                                                        (data?.questionType?.find(qt => qt.question_type_id === questionData.id)?.total_questions) || ""
                                                    }


                                                    style={{ display: data?.questionType?.some(qt => qt.question_type_id === questionData.id) ? "initial" : "none" }}
                                                // required={`${data?.questionType?.some(qt => qt.question_type_id === questionData.id) ? true : false}`}
                                                // required
                                                ></CFormInput>
                                            </>

                                        ))
                                    }


                                </CCol>

                                <CCol className='col-md-6 col-sm-6 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Total questions</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        placeholder="Total question"
                                        autoComplete="Total question"
                                        feedbackInvalid="Please enter no of question."
                                        name="total_questions"
                                        value={data?.total_questions}
                                        onChange={(event) => setdata({ ...data, total_questions: event.target.value })}
                                        id="validationCustomExam"
                                        required />
                                </CCol>

                                <CCol className='col-md-3 col-sm-6 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Total marks</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        placeholder="Total marks"
                                        autoComplete="Total marks"
                                        feedbackInvalid="Please enter marks for exam."
                                        name="total_marks"
                                        value={data?.total_marks}
                                        onChange={(event) => setdata({ ...data, total_marks: event.target.value })}
                                        id="validationCustomExam"
                                        required />
                                </CCol>

                                <CCol className='col-md-3 col-sm-6 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Min percentage</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        placeholder="Min Percentage"
                                        autoComplete="Min Percentage"
                                        feedbackInvalid="Please enter min require percentage."
                                        name="min_percentage"
                                        value={data?.min_percentage}
                                        onChange={(event) => setdata({ ...data, min_percentage: event.target.value })}
                                        id="validationCustomExam"
                                        required />
                                </CCol>



                                <CCol className='col-md-6 col-sm-6 col-12 mt-1'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Exam Date:</CFormLabel><br></br>
                                    <DatePicker
                                        showIcon
                                        selected={startDate}
                                        id="inlineCheckbox2"
                                        minDate={new Date()}
                                        onChange={(date) => handleBirthDate(date)}
                                        feedbackInvalid="Please select date."
                                        required
                                        className={`form-control ${!data.date && validated ? 'is-invalid' : ''}`}
                                    />
                                    {!data.date && validated && <div className="invalid-feedback">Please select date.</div>}

                                </CCol>

                                <CCol className='col-md-6 col-sm-6 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Exam duration</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        placeholder="Duration in minutes"
                                        autoComplete="Exam duration"
                                        feedbackInvalid="Please enter exam duration"
                                        name="exam_duration"
                                        value={data?.exam_duration}
                                        onChange={(e) => handleduration(e?.target?.value)}
                                        // onChange={(event) => setdata({ ...data, exam_duration: event.target.value })}
                                        id="validationCustomExam"
                                        required />
                                </CCol>

                                <CCol className='col-md-3 col-sm-6 col-12 mt-1'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Start time:</CFormLabel><br></br>
                                    <TimePicker
                                        onChange={handleStartTime}
                                        value={startTime}
                                        id="starttime"
                                        feedbackInvalid="Please select start_time."
                                        required
                                        className={`${!startTime && validated ? 'is-invalid' : ''}`}
                                    />
                                    {!startTime && validated && <div className="invalid-feedback">Please select start_time.</div>}    </CCol>
                                <CCol className='col-md-3 col-sm-6 col-12 mt-1'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>End time:</CFormLabel><br></br>
                                    <TimePicker
                                        // onChange={handleStartTime}
                                        value={endTime}
                                        id="endTime"
                                        feedbackInvalid="End time is not defined."
                                        disabled={true}
                                        required
                                        className={`${!endTime && validated ? 'is-invalid' : ''}`}
                                    // style={{ cursor: "not-allowed" }}
                                    />
                                    {!endTime && validated && <div className="invalid-feedback">End time is not defined.</div>}
                                </CCol>
                                <CCol className=''></CCol>
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
                                    // activeColor={"rgb(110 101 213 / 32%)"}
                                    // navigate={"/pages/role"}
                                    // hoverColor={"white"}
                                    onClick={handleForm}
                                />
                                <div className="time-picker" data-coreui-locale="en-US" data-coreui-toggle="time-picker" id="timePicker1"></div>
                            </div>
                        </CForm>
                    </CRow>
                </CCardBody >
            </CCard >
        </>
    )
}


export default ExamForm











