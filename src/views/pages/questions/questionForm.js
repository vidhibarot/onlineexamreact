import React, { useEffect, useState } from 'react'
import { ConformationAlert } from '../../../utils/conformationAlert';
import {
    CRow, CCard, CCardHeader, CCardBody, CForm, CFormLabel,
    CFormInput, CCol, CInputGroup, CInputGroupText, CFormCheck,
} from '@coreui/react'
import { AddButton } from '../../../ui-components/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { commonDispatch } from '../../../dispatch'

import { getExamByid } from '../../../api/exam';

import { getQuestionTypeListApi } from '../../../api/question_type';
import { addQuestionApi, questionUpdateApi } from '../../../api/question';

import { MdDelete } from "react-icons/md";
import "../../../style.css"
import moment from 'moment';
import GeneralInformation from '../../../ui-components/questioninformation/questioninfo';
import { configs } from 'eslint-plugin-prettier';

const QuestionForm = () => {
    const { showNotification } = commonDispatch();

    const locationData = useLocation();
    const IsEdit = locationData.state.value;
    const IsEditid = locationData.state.id;

    const [questionTypeList, setQuestionTypeList] = useState([]);
    const [totalMarks, setTotalmarks] = useState();
    const [responseData, setresponseData] = useState()

    const [questionData, setQuestionData] = useState({
        exam_id: "",
        questionList: []
    });

    const [data, setdata] = useState({
        name: "",
        status: ""
    });

    const [options, setOption] = useState([{ option_value: "" }, { option_value: "" }]);

    const handleAddInput = (index, event) => {
        event.preventDefault();
        if (event?.clientX > 0) {
            setQuestionData(prevstate => ({
                ...prevstate,
                questionList: prevstate.questionList.map((questionData, i) =>
                    index === i ? {
                        ...questionData,
                        options: [...questionData.options, { option_value: "" }]
                    } : questionData
                )
            }));
        }

    };

    const handleChange = (event, questionIndex, optionIndex) => {
        let dataw = ""
        if (event.target.checked === true) {
            dataw = event.target.value
        }

        setQuestionData(prevstate => ({
            ...prevstate,
            questionList: prevstate.questionList.map((questionData, qIndex) =>
                questionIndex === qIndex ? {
                    ...questionData, ans: dataw,

                    options: questionData.options.map((option, oIndex) =>
                        optionIndex === oIndex && event.target.checked === false ? { ...option, [event.target.name]: event.target.value } : option
                    )
                } : questionData
            )
        }));
    };

    const handleDeleteInput = (questionIndex, optionIndex) => {
        setQuestionData(prevstate => ({
            ...prevstate,
            questionList: prevstate.questionList.map((questionData, qIndex) =>
                questionIndex === qIndex ? {
                    ...questionData,
                    options: questionData.options.filter((_, oIndex) => optionIndex !== oIndex)
                } : questionData
            )
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        else {
            const totalQuestion = questionData.questionList?.map((product) => parseInt(product.marks))
            const total = totalQuestion.reduce((acc, curr) => acc + curr)
            if (total !== parseInt(totalMarks)) {
                showNotification({
                    title: "Error",
                    message: "Your total questions and selected multiple choice and single line questions value not matched",
                    status: 'danger',
                    isOpen: true
                });
            }
            else {
                if (IsEdit) {
                    questionData.exam_id = IsEditid
                    return ConformationAlert({
                        title: "Are you sure?",
                        text: "You won't be able to edit exam!",
                        icon: "warning",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Yes Save",
                        denyButtonText: `Don't save`
                    }).then(async (result) => {
                        if (result?.isConfirmed) {
                            let response = await questionUpdateApi(questionData);
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
                    });


                }
                else {
                    questionData.exam_id = IsEditid
                    return ConformationAlert({
                        title: "Are you sure?",
                        text: "You won't be able to edit exam!",
                        icon: "warning",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Yes Save",
                        denyButtonText: `Don't save`
                    }).then(async (result) => {
                        if (result?.isConfirmed) {
                            let response = await addQuestionApi(questionData);
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
                    });

                }
            }

        }
        setValidated(true);
    };

    const getExamData = async () => {
        let response = await getExamByid(IsEditid);
        setTotalmarks(response?.data?.data?.total_marks)
        setresponseData(response?.data?.data)
        const relationData = response?.data?.data?.exam_questiontype_relations;

        let questionChoiceData = [];
        relationData?.map((questiontypeData) => {
            if (questiontypeData?.question_type_id === 1) {
                for (var i = 0; i < questiontypeData.total_questions; i++) {
                    questionChoiceData.push({
                        "question": "",
                        "marks": "",
                        "ans": "",
                        "question_type": `${questiontypeData?.question_type_id}`,
                        "options": [
                            {
                                "option_value": ""
                            },
                            {
                                "option_value": ""
                            },
                        ]
                    })
                }
            }
            else {
                for (var i = 0; i < questiontypeData?.total_questions; i++) {
                    questionChoiceData.push({
                        "question": "",
                        "marks": "",
                        "ans": "",
                        "question_type": `${questiontypeData?.question_type_id}`,
                    })
                }
            }
        })

        if (response?.data?.data?.questions?.length > 0) {
            questionChoiceData = [],
                response?.data?.data?.questions?.map((dataofque) => {
                    if (dataofque?.options?.length > 0) {
                        questionChoiceData.push({
                            ...dataofque,
                            question_type: "1",
                        });
                    } else {
                        questionChoiceData.push({
                            ...dataofque,
                            question_type: "2",
                        });
                    }
                })
        }

        setQuestionData((prevstate) => ({ ...prevstate, questionList: questionChoiceData }))
    };

    const getQuestionTypeList = async () => {
        let response = await getQuestionTypeListApi();
        if (response && response?.status === 200) {
            setQuestionTypeList(response?.data?.data);
        }
    }
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();

    const handleQuestionChange = (event, index) => {
        setQuestionData(prevstate => ({
            ...prevstate,
            questionList: prevstate.questionList.map((questionData, i) =>
                index === i ? { ...questionData, [event.target.name]: event.target.value } : questionData
            )
        }))
    }

    const handleForm = () => {
        navigate("/pages/exams")
    }

    useEffect(() => {
        getQuestionTypeList();
        getExamData();
    }, [])


    return (
        <>
            <CCard className="mb-4">
                <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", paddingLeft: "35px" }}>
                    {IsEdit ? "Edit Exam Type" : "Add Exam Type"}
                </CCardHeader>
                <CCardBody>
                    <GeneralInformation data={responseData} />
                    <CRow className="m-2 d-flex align-items-center justify-content-center">

                        <CForm noValidate
                            validated={validated}
                            onSubmit={handleSubmit}>
                            <CRow>

                                {
                                    questionData?.questionList.map((questionListData, index) => (
                                        <>
                                            <CCol className='col-12'>
                                                {
                                                    questionListData?.question_type === "1" ? (<>
                                                        <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "20px", marginTop: "10px", color: "#68a9db" }}>Multiple Choice Questions</CFormLabel><br></br>
                                                    </>) :
                                                        (<>
                                                            <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "20px", marginTop: "10px", color: "#68a9db" }}>Single Line Questions</CFormLabel><br></br>
                                                        </>)
                                                }

                                                <CCol className='d-flex align-items-center'>
                                                    <CCol>
                                                        <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "15px", }}>Question: {index + 1}</CFormLabel>
                                                    </CCol>

                                                    <CCol className="d-flex align-items-center" style={{ marginLeft: "auto" }}>
                                                        <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "18px", width: "auto", marginLeft: "50%" }}>Marks :</CFormLabel>
                                                        <CFormInput
                                                            type="text"
                                                            placeholder="Marks"
                                                            autoComplete="Marks"
                                                            feedbackInvalid="Please enter marks."
                                                            name="marks"
                                                            onChange={(event) => handleQuestionChange(event, index)}
                                                            value={questionListData?.marks}
                                                            id="validationCustomExam"
                                                            required
                                                            style={{ width: "20%", marginBottom: "10px" }}
                                                        />

                                                    </CCol>
                                                </CCol>
                                                <CFormInput
                                                    type="text"
                                                    placeholder={`Enter Question ${index + 1}`}
                                                    autoComplete="Question"
                                                    feedbackInvalid={`Please enter Question ${index + 1}`}
                                                    name="question"
                                                    onChange={(event) => handleQuestionChange(event, index)}
                                                    value={questionListData?.question}
                                                    id="validationCustomExam"
                                                    style={{ background: "#d1d9eb" }}
                                                    required
                                                />

                                                {
                                                    questionListData?.question_type === "1" ? (<>
                                                        {
                                                            !questionData.questionList[index]?.ans ?
                                                                (<>

                                                                    <CFormLabel style={{ color: "#dd5656", fontSize: "16px", fontWeight: "500" }}>Select an answer to continue.</CFormLabel></>) : (<></>)
                                                        }

                                                        {
                                                            questionListData?.options?.map((option, oIndex) => (
                                                                <>

                                                                    <div className='d-flex'>

                                                                        <CInputGroup className="has-validation mb-3 mt-3">
                                                                            <CInputGroupText>

                                                                                <CFormCheck
                                                                                    type="checkbox"
                                                                                    id="validationRadioButton"
                                                                                    feedback="Please select option."
                                                                                    onChange={(event) => handleChange(event, index, oIndex)}
                                                                                    checked={questionData.questionList[index]?.ans === option?.option_value && questionData.questionList[index]?.ans !== ""}
                                                                                    value={option.option_value}
                                                                                    aria-label="Checkbox for following text input"
                                                                                    required={`${questionData.questionList[index]?.ans}` !== "" ? false : true}
                                                                                />


                                                                            </CInputGroupText>
                                                                            <CFormInput
                                                                                type="text"
                                                                                name="option_value"
                                                                                id="validationOption"
                                                                                feedback="Please enter option."
                                                                                placeholder={`Enter Option ${oIndex + 1}`}
                                                                                aria-label="Text input with checkbox"
                                                                                value={option.option_value}
                                                                                onChange={(event) => handleChange(event, index, oIndex)}
                                                                                required
                                                                            />


                                                                        </CInputGroup >

                                                                        {questionListData?.options?.length > 2 && (
                                                                            <div className='d-flex align-items-center'>
                                                                                <MdDelete
                                                                                    size={30}
                                                                                    color="rgb(124,137,204)"
                                                                                    style={{ cursor: 'pointer' }}
                                                                                    onClick={() => handleDeleteInput(index, oIndex)}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {oIndex === questionListData?.options.length - 1 && (

                                                                        <div className='add-option'>


                                                                            <AddButton
                                                                                label={"Add New Option"}
                                                                                width={"auto"}
                                                                                height={"40px"}
                                                                                // margin={"80%"}
                                                                                // float={"right"}
                                                                                background={"rgb(33, 38, 49)"}
                                                                                hoverBack={"#000000"}
                                                                                hoverColor={"white"}
                                                                                onClick={(event) => handleAddInput(index, event)}
                                                                            />
                                                                        </div>

                                                                    )}
                                                                </>
                                                            ))}</>) : (<></>)


                                                }

                                                <div className='d-flex align-items-center'>

                                                    <CFormLabel htmlFor="name" style={{ fontWeight: "700", fontSize: "18px", width: "auto", marginRight: "10px" }}>Answer:</CFormLabel>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Enter correct ans"
                                                        autoComplete="Ans"
                                                        feedbackInvalid="Please enter ans"
                                                        name="ans"
                                                        onChange={(event) => handleQuestionChange(event, index)}
                                                        value={questionListData?.ans}
                                                        id="validationCustomExam"
                                                        // required={`${data?.questionType?.length}` > 0 ? false : true}
                                                        disabled={`${questionListData?.question_type}` === "1" ? true : false}
                                                        required
                                                        style={{ margin: "10px 20px 10px 0px", width: "auto" }}
                                                    />
                                                </div>
                                            </CCol>
                                        </>
                                    )
                                    )
                                }
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
                                    onClick={handleForm}
                                />
                            </div>
                        </CForm>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}


export default QuestionForm





