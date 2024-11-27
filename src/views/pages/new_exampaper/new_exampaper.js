
import { CButton, CCard, CCol, CFormCheck, CFormInput, CFormLabel, CInputGroup, CInputGroupText } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddButton } from "../../../ui-components/form";
import { userExamEnrollApi } from "../../../api/exam";
import { commonDispatch } from "../../../dispatch";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "../examPaper/examsubmit";
import "../../../style.css"
// import { handleSubmit } from "./examsubmit";
import useExamTime from "../../../ui-components/customhook/customhook";
const NewExamPaper = () => {

    const userExam = useSelector((state) => state?.user?.userExamData);

    const [singleQuestion, setSingleQuestion] = useState(userExam[0]?.questions[0])
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

    // const handleChange = (event, questionId) => {
    //     console.log("USERF CURRENTECACACAhandle chenage ma vehccjjejejejejeeeeeeeeeeeeeeeCACACmmmm", userCurrentExam)

    //     setUserCurrentExam(prevState => {
    //         const questionExists = prevState?.questionAns?.some(data => data?.question_id === questionId);
    //         const updatedExam = questionExists ? {
    //             ...prevState,
    //             questionAns: prevState?.questionAns?.map(data =>
    //                 data?.question_id === questionId ? { ...data, user_ans: event.target.value } : data
    //             )
    //         } : {
    //             ...prevState,
    //             questionAns: [
    //                 ...prevState?.questionAns,
    //                 { question_id: questionId, user_ans: event.target.value }
    //             ]
    //         };
    //         setUserTodayExamData(updatedExam);
    //         return updatedExam;
    //     });

    // };


    const handleQuestionView = (index, questionData) => {
        questionData.index = index
        setSingleQuestion(questionData)
    }

    const handleChange = (event, questionId) => {
        // console.log("Updating userTodayExamData...");
        //   if(userTodayExamData?.exam_id==""&& userTodayExamData?.standard_id==""){
        //     userTodayExamData?.exam_id= userExam[0]?.questions[0]?.exam_id,
        //     userTodayExamData?.standard_id= userExam[0]?.standard_id
        //   }
        const questionExists = userTodayExamData?.questionAns?.some(data => data?.question_id === questionId);
        console.log("QUETSION EXAIST MALE CHHEHHEHEHEHEHEH>>>>",questionExists)
        const updatedExam = questionExists ? {
            exam_id: userExam[0]?.questions[0]?.exam_id,
            standard_id: userExam[0]?.standard_id,
            questionAns: userTodayExamData?.questionAns?.map(data =>
                data?.question_id === questionId ? { ...data, user_ans: event.target.value } : data
            )
        } : {
            exam_id: userExam[0]?.questions[0]?.exam_id,
            standard_id: userExam[0]?.standard_id,
            questionAns: [
                ...userTodayExamData?.questionAns,
                { question_id: questionId, user_ans: event.target.value }
            ]
        };
        console.log("UPDATED EXAM IS THEREREREREREER>>>>>>>>", updatedExam)
        setUserTodayExamData(updatedExam);
    };


    return (

        // <div className="new-exam-paper">

        <CCard>

            <div className="exam-paper-start">

                <div className="question-part">
                    <div style={{ float: "right" }}>
                        <div style={{ fontWeight: "700" }}>Time Left : {minutes >= 1 ? minutes : examduration} {minutes >= 1 ? "Minutes" : "Seconds"}  <span></span></div>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                        {

                            singleQuestion?.options?.length > 1 ? (<>
                                <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "20px", marginTop: "10px", color: "#68a9db" }}>Multiple Choice Questions</CFormLabel><br></br>
                            </>) : (<>
                                <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "20px", marginTop: "10px", color: "#68a9db" }}>Single Line Questions</CFormLabel><br></br>
                            </>)
                        }

                    </div>
                    <div>
                        <div className='d-flex align-items-center'>
                            <div>
                                <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "15px", }}>Question: {singleQuestion?.index} </CFormLabel>
                            </div>

                            <div className="d-flex" style={{ marginLeft: "auto", marginRight: "50px" }}>
                                <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "18px", width: "auto", marginLeft: "50%", marginRight: "5px" }}>Marks:</CFormLabel>
                                <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "18px", width: "auto" }}>{singleQuestion?.marks}</CFormLabel>

                            </div>
                        </div>
                        <div>
                            <CFormInput
                                type="text"
                                placeholder={`Enter Question ${singleQuestion?.index}`}
                                autoComplete="Question"
                                feedbackInvalid={`Please enter Question ${singleQuestion?.index}`}
                                name="question"
                                value={singleQuestion?.question}
                                id="validationCustomExam"
                                style={{ background: "#d1d9eb" }}
                                disabled
                                required
                            />
                        </div>
                        {
                            singleQuestion?.options?.length == 0 &&
                            <div className='d-flex align-items-center'>

                                <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "18px", width: "auto", marginRight: "10px" }}>Answer:</CFormLabel>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter correct ans"
                                    autoComplete="Ans"
                                    feedbackInvalid="Please enter ans"
                                    name="ans"
                                    onChange={(event) => handleChange(event, singleQuestion?.id)}
                                    value={userTodayExamData?.questionAns?.find(data => data.question_id === singleQuestion?.id)?.user_ans}
                                    id="validationCustomExam"
                                    required
                                    style={{ margin: "10px 20px 10px 0px", width: "auto" }}
                                />
                            </div>

                        }

                        <div>
                            {
                                singleQuestion?.options?.map((optionvalue, oIndex) => (
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
                                                        onChange={(event) => handleChange(event, singleQuestion?.id)}
                                                        checked={userTodayExamData?.questionAns?.some(
                                                            (data) =>
                                                                data.question_id === singleQuestion.id &&
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
                        {
                            userExam && userExam.length > 0 && userExam[0].questions?.length == singleQuestion?.index &&
                            <div className='button d-flex gap-3 mt-3 align-items-center justify-content-center'>
                                <AddButton label={"Submit"}
                                    width={"100px"}
                                    height={"40px"}
                                    margin={"15px"}
                                    background={"#4e578f"}
                                    hoverBack={"#4e578f"}
                                    type="submit"
                                    onClick={() => handleSubmit(userTodayExamData, userExamEnrollApi, showNotification, setUserTodayExamData, "submit", navigate)}
                                />
                            </div>
                            // console.log("indexx i sthererrerer", userExam[0].questions?.length, singleQuestion?.index)
                        }

                    </div>
                </div>
                <div className="button-part">
                    <div className="head">All Questions</div>
                    {/* <div className="">Multi choice</div> */}
                    <div className="buttons">
                        {
                            userExam && userExam.length > 0 &&

                            <>
                                {
                                    userExam[0].questions?.map((questionData, index) => (


                                        <>

                                            <div className="button-start">
                                                <CButton
                                                    className={singleQuestion?.id == questionData.id ? "data" : userTodayExamData?.questionAns?.some(
                                                        (data) =>
                                                            data.question_id === questionData.id
                                                    ) ? "completed" : "data2"}
                                                    color="primary"
                                                    variant="outline"
                                                    onClick={() => handleQuestionView(index + 1, questionData)}>{index + 1}
                                                </CButton>


                                                {/* <CButton className="Cbutton-style" color="primary" variant="outline" onClick={() => handleQuestionView(index + 1, questionData)}>{index + 1}</CButton> */}
                                            </div>

                                        </>


                                    ))
                                }



                            </>
                        }

                    </div>

                </div>
            </div>
        </CCard>

        // </div>
    )
}

export default NewExamPaper
