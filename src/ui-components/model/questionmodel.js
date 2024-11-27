import { React, useEffect, useState } from "react";
import { RiDragDropFill, RiDragMove2Fill } from "react-icons/ri";
import { GrDrag } from "react-icons/gr";
import {
    CButton, CAlert, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CRow, CCol,
    CFormLabel, CFormInput, CInputGroup, CInputGroupText, CFormCheck, CTooltip
} from '@coreui/react'
import styled from 'styled-components';
import { getExamByid } from "../../api/exam";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateSortOrderApi, updateQuestionSortOrderApi } from "../../api/question";
import { FaRegEye } from "react-icons/fa";
import { AddButton } from "../form";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Questionmodel = ({ props, children }) => {
   
    const navigate = useNavigate();
    const date = new Date();
    const todaysDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
const currentTime = moment(date,"HH:MM:AA").format("HH:MM:AA")


    const [visible, setVisible] = useState(false)
    const [responseData, setresponseData] = useState();
    const [sortOrderData, setSortOrderData] = useState({
        id: "",
        new_sort_order: ""
    })
    const StyledButton1 = styled(CButton)`
        cursor: pointer;
        width: ${props?.width};
        height:${props?.height};
        margin-left:${props?.margin};
        float:${props?.float};
        background: ${props?.background};
        font-weight:500;
        color:white;
        bodrder:none !important;
        &:hover {
            background: ${props?.hoverBack} !important;
            transition: 0.6s;
            color:white;
            font-weight:500;
        };
        &:active {
            background:  ${props?.activeColor} !important; 
        }`;

    const getExamData = async () => {
        let response = await getExamByid(props?.id);
        setresponseData(response?.data?.data)
        const relationData = response?.data?.data?.exam_questiontype_relations;

        let questionChoiceData = [];

    };

    const handleDragEnd = async (result) => {

        if (!result?.destination) {
            return;
        }
        let oldorder = result?.source?.index

        let newOrder = result?.destination?.index

        let updateSortOrder = {
            id: result?.draggableId,
            new_sort_order: newOrder
        }

        const update = await updateSortOrderApi(updateSortOrder)
        const getdata = await getExamByid(responseData?.id);
        setresponseData(getdata?.data?.data)

    };

    const handleQuestionDragend = async (result) => {
        if (!result?.destination) {
            return;
        }
        let oldorder = result?.source?.index
        let newOrder = result?.destination?.index

        let updateSortOrder = {
            id: result?.draggableId,
            new_sort_order: newOrder
        }

        const update = await updateQuestionSortOrderApi(updateSortOrder)
        const getdata = await getExamByid(responseData?.id);
        setresponseData(getdata?.data?.data)
    }


    const ExamEnroll = (id) => {
    
        navigate("/pages/userexamenroll", {
            state: { id },
        });
    }

    useEffect(() => {
        getExamData()
    }, [props?.id])
    const isDisabled = props?.date > todaysDate;
    return (
        <>
            <div className="d-flex align-items-center">

                <CTooltip
                    content="Please click on icon for view exam questions."
                    placement="top"
                    trigger="hover"
                >
                    <CButton style={{ padding: "5px", border: "none", backgroundColor: "#ebdfdf" }}>  <FaRegEye
                        style={{ fontSize: '28px', color: '#813a3a' }}
                        onClick={() => setVisible(!visible)}
                    /></CButton>

                </CTooltip>

                <AddButton
                    label={'Enroll List'}
                    onClick={() => ExamEnroll(props?.id)}
                    // cursor: isDisabled ? 'not-allowed' : 'pointer'
                    width={"auto"}
                    height={"40px"}
                    margin={"20px"}
                    background={'#5a7a8e'}
                    hoverBack={'#364955'}
                    disable={isDisabled}
                    cursor={`${isDisabled}` ? 'not-allowed' : 'pointer'}
                >
                </AddButton>

            </div>

            {/* <StyledButton1 onClick={() => setVisible(!visible)}>
                {props?.label}
            </StyledButton1> */}
            <CModal
                scrollable
                size="md"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredScrollableExample2"
            >
                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredScrollableExample2"> {props?.label}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <div>
                            <DragDropContext onDragEnd={handleQuestionDragend}>
                                <Droppable droppableId="questions-droppable">
                                    {
                                        (provided) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                {
                                                    responseData?.questions?.map((questionData, index) => (
                                                        <Draggable key={questionData.id}
                                                            draggableId={questionData?.id.toString()}
                                                            index={index + 1}>
                                                            {
                                                                (provided) => (
                                                                    <div key={questionData?.id}
                                                                        ref={provided.innerRef}
                                                                        style={{ ...provided.draggableProps.style }}
                                                                        {...provided.draggableProps}
                                                                    >
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

                                                                                    <p  {...provided.dragHandleProps} style={{ marginLeft: "auto", marginBottom: "0px" }}>
                                                                                        <GrDrag style={{ fontSize: "25px", color: "#4c7d9b" }} />
                                                                                    </p>

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
                                                                                        />
                                                                                    </div>

                                                                                    <div>
                                                                                        <DragDropContext onDragEnd={handleDragEnd}>
                                                                                            <Droppable droppableId={`droppable-${index}`}>
                                                                                                {
                                                                                                    (provided) => (
                                                                                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                                                            {
                                                                                                                questionData?.options?.map((optionvalue, oIndex) => (

                                                                                                                    <Draggable
                                                                                                                        key={optionvalue?.id}
                                                                                                                        draggableId={optionvalue?.id.toString()}
                                                                                                                        index={oIndex + 1}
                                                                                                                    >

                                                                                                                        {(provided) => (
                                                                                                                            <div
                                                                                                                                key={optionvalue?.id}
                                                                                                                                ref={provided.innerRef}
                                                                                                                                style={{ ...provided.draggableProps.style }}
                                                                                                                                {...provided.draggableProps}
                                                                                                                            >

                                                                                                                                <CInputGroup className="has-validation mb-3 mt-3">

                                                                                                                                    <CInputGroupText style={{ paddingLeft: "6px" }}>
                                                                                                                                        <p  {...provided.dragHandleProps} style={{ marginLeft: "auto", marginBottom: "0px", paddingRight: "5px" }}>

                                                                                                                                            <GrDrag style={{ fontSize: "20px", color: "#4c7d9b" }} />
                                                                                                                                        </p>


                                                                                                                                        <CFormCheck
                                                                                                                                            type="checkbox"
                                                                                                                                            id="validationRadioButton"
                                                                                                                                            feedback="Please select option."
                                                                                                                                            aria-label="Checkbox for following text input"
                                                                                                                                        // disabled
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
                                                                                                                                    />


                                                                                                                                </CInputGroup >
                                                                                                                            </div>

                                                                                                                        )}
                                                                                                                    </Draggable>


                                                                                                                ))
                                                                                                            }

                                                                                                            {provided.placeholder}
                                                                                                        </div>

                                                                                                    )
                                                                                                }
                                                                                            </Droppable >
                                                                                        </DragDropContext>

                                                                                    </div>
                                                                                </div>


                                                                            </div>

                                                                        </CCol>

                                                                    </div>

                                                                )
                                                            }

                                                        </Draggable>
                                                    ))
                                                }

                                            </div>
                                        )
                                    }

                                </Droppable>
                            </DragDropContext>
                        </div>
                    </CRow>
                </CModalBody>
                {/* <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary">Save changes</CButton>
                </CModalFooter> */}
            </CModal>
        </>
    )


}

export default Questionmodel
