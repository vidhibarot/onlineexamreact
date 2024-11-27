import { CCol, CFormCheck, CFormInput, CFormLabel, CInputGroup, CInputGroupText } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddButton } from "../../../ui-components/form";
import { userExamEnrollApi } from "../../../api/exam";
import { commonDispatch } from "../../../dispatch";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "./examsubmit";
import useExamTime from "../../../ui-components/customhook/customhook";
const ExamPaper = () => {

    const userExam = useSelector((state) => state?.user?.userExamData);

    const [userCurrentExam, setUserCurrentExam] = useState({
        exam_id: userExam[0]?.questions[0]?.exam_id,
        standard_id: userExam[0]?.standard_id,
        questionAns: []
    })

    const [examduration] = useExamTime();
    const minutes = Math.floor(examduration / 60);
    const data = useSelector((state) => state?.user);
    const userTodayExamData = data?.userTodayExamData
    const { showNotification, setUserTodayExamData } = commonDispatch()
    const navigate = useNavigate()

    const handleChange = (event, questionId) => {
        setUserCurrentExam(prevState => {
            const questionExists = prevState?.questionAns?.some(data => data?.question_id === questionId);
            const updatedExam = questionExists ? {
                ...prevState,
                questionAns: prevState?.questionAns?.map(data =>
                    data?.question_id === questionId ? { ...data, user_ans: event.target.value } : data
                )
            } : {
                ...prevState,
                questionAns: [
                    ...prevState?.questionAns,
                    { question_id: questionId, user_ans: event.target.value }
                ]
            };
            setUserTodayExamData(updatedExam);
            
            return updatedExam;
        });

    };

    return (
        <>
            {
                userExam && userExam?.length > 0 &&

                <>
                    <div
                        style={{ padding: "0px 0px 30px 0px" }}
                    >
                        <div style={{ float: "right" }}>
                            <div>Time Left : {minutes >= 1 ? minutes : examduration} {minutes >= 1 ? "Minutes" : "Seconds"}  <span></span></div>
                        </div>                        {
                            userExam[0]?.questions?.map((questionData, index) => (

                                <div key={questionData?.id}>

                                    <CCol className="col-12">
                                        <div>
                                            <div className="d-flex align-items-center">
                                                {

                                                    questionData?.options?.length > 1 ? (<>
                                                        <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "20px", marginTop: "10px", color: "#68a9db" }}>Multiple Choice Questions</CFormLabel><br></br>
                                                    </>) : (<>
                                                        <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "20px", marginTop: "10px", color: "#68a9db" }}>Single Line Questions</CFormLabel><br></br>
                                                    </>)
                                                }

                                            </div>
                                            <div>
                                                <div className='d-flex align-items-center'>
                                                    <div>
                                                        <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "15px", }}>Question: {index + 1}</CFormLabel>
                                                    </div>

                                                    <div className="d-flex" style={{ marginLeft: "auto", marginRight: "50px" }}>
                                                        <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "18px", width: "auto", marginLeft: "50%", marginRight: "5px" }}>Marks:</CFormLabel>
                                                        <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "18px", width: "auto" }}>{questionData?.marks}</CFormLabel>

                                                    </div>
                                                </div>
                                                <div>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder={`Enter Question ${index + 1}`}
                                                        autoComplete="Question"
                                                        feedbackInvalid={`Please enter Question ${index + 1}`}
                                                        name="question"
                                                        value={questionData?.question}
                                                        id="validationCustomExam"
                                                        style={{ background: "#d1d9eb" }}
                                                        required
                                                        disabled
                                                    />
                                                </div>
                                                {
                                                    questionData?.options?.length == 0 &&
                                                    <div className='d-flex align-items-center'>

                                                        <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "18px", width: "auto", marginRight: "10px" }}>Answer:</CFormLabel>
                                                        <CFormInput
                                                            type="text"
                                                            placeholder="Enter correct ans"
                                                            autoComplete="Ans"
                                                            feedbackInvalid="Please enter ans"
                                                            name="ans"
                                                            onChange={(event) => handleChange(event, questionData?.id)}
                                                            value={userTodayExamData?.questionAns?.find(data => data.question_id === questionData?.id)?.user_ans}
                                                            id="validationCustomExam"
                                                            required
                                                            style={{ margin: "10px 20px 10px 0px", width: "auto" }}
                                                        />
                                                    </div>

                                                }

                                                <div>
                                                    {
                                                        questionData?.options?.map((optionvalue, oIndex) => (
                                                            <>
                                                                <div
                                                                    key={optionvalue?.id}
                                                                >

                                                                    <CInputGroup className="has-validation mb-3 mt-3">
                                                                        <CInputGroupText>

                                                                            <CFormCheck
                                                                                type="checkbox"
                                                                                id="validationRadioButton"
                                                                                feedback="Please select option."
                                                                                onChange={(event) => handleChange(event, questionData?.id)}
                                                                                checked={userTodayExamData?.questionAns?.some(
                                                                                    (data) =>
                                                                                        data.question_id === questionData.id &&
                                                                                        data.user_ans === optionvalue.option_value
                                                                                )}
                                                                                value={optionvalue.option_value}
                                                                                aria-label="Checkbox for following text input"
                                                                            />


                                                                        </CInputGroupText>
                                                                        <CFormInput
                                                                            type="text"
                                                                            name="option_value"
                                                                            id="validationOption"
                                                                            feedback="Please enter option."
                                                                            placeholder={`Enter Option ${oIndex + 1}`}
                                                                            aria-label="Text input with checkbox"
                                                                            value={optionvalue.option_value}
                                                                            required
                                                                            disabled
                                                                        />


                                                                    </CInputGroup >
                                                                </div >
                                                            </>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CCol>
                                </div>

                            ))
                        }
                        <div className='button d-flex gap-3 mt-3 align-items-center justify-content-center'>
                            <AddButton label={"Submit"}
                                width={"100px"}
                                height={"40px"}
                                margin={"15px"}
                                background={"#5856d6"}
                                hoverBack={"#4b49b6"}
                                type="submit"
                                onClick={() => handleSubmit(userTodayExamData, userExamEnrollApi, showNotification, setUserTodayExamData, "submit", navigate)}
                            />
                        </div>
                    </div >
                </>
            }
        </>
    )
}

export default ExamPaper