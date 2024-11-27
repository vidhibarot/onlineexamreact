
import React, { useEffect, useState, createRef } from 'react'
import { useMemo } from 'react';

import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'

import { getExamListApi, deleteExamApi } from '../../../api/exam'
import { statusData } from '../../../utils/config'
import UpdateStatus from '../../../ui-components/updatestatus/updatestatus'
import Duration from '../../../ui-components/timeduration/duration';
import Table from '../../../components/Table'
import { useSelector } from 'react-redux';
import { MdEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { DeleteRecord } from '../../../utils/deleterecords';
import { commonDispatch } from '../../../dispatch'
import { AddButton } from '../../../ui-components/form';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment"
// import FormButton from '../../../ui-components/form';
import Questionmodel from '../../../ui-components/model/questionmodel';
import { restrictApi } from '../../../api/role';
import _nav from '../../../_nav';

const Exam = () => {
    const [statusUpdate, setStatusUpdate] = useState(false);
    const common = useSelector((state) => state?.user);
    const locationData = useLocation();
    const navigate = useNavigate();
    const Pagenavigate = (value, id) => {
        navigate("/examForm", {
            state: { value, id },
        });
    }


    const QuestionForm = (value, id) => {
        navigate("/questionForm", {
            state: { value, id },
        });
    }

    const { showNotification, setPermissionData } = commonDispatch();
    const columns = useMemo(
        () => {
            let columnData = [
                {
                    accessorKey: 'user.full_name',
                    header: 'User Name',
                    size: 100,
                    defaultHidden: true,
                    Cell: ({ row }) => <>{row?.original?.user?.full_name || "-"}</>
                },
                {
                    accessorKey: 'exam_type.name',
                    header: 'Exam name',
                    defaultHidden: false,
                    size: 100,
                    Cell: ({ row }) => <>{row?.original?.exam_type?.name || "-"}</>
                },
                {
                    accessorKey: 'subject.name',
                    header: 'Subject name',
                    size: 100,
                    defaultHidden: false,
                    Cell: ({ row }) => <>{row?.original?.subject?.name || "-"}</>
                },
                {
                    accessorKey: 'description',
                    header: 'Description',
                    size: 100,
                    defaultHidden: false,
                    // Cell: ({ row }) => <>{row?.original?.subject?.name || "-"}</>
                },
                {
                    accessorKey: 'standard.name',
                    header: 'Standard',
                    size: 100,
                    defaultHidden: false,
                    Cell: ({ row }) => <>{row?.original?.standard?.name || "-"}</>
                },
                {
                    accessorKey: 'min_percentage',
                    header: 'Min percentage',
                    size: 100,
                    defaultHidden: false,
                    // Cell: ({ row }) => <>{row?.original?.subject?.name || "-"}</>
                },
                {
                    accessorKey: 'total_questions',
                    header: 'total_questions',
                    defaultHidden: true,
                    size: 100,
                },
                {
                    accessorKey: 'total_marks',
                    header: 'Marks',
                    defaultHidden: false,
                    size: 100,
                },
                {
                    accessorKey: 'date',
                    header: 'Exam date',
                    defaultHidden: false,
                    size: 100,
                    filterVariant: "date",
                    Cell: ({ row }) => (
                        <>
                            {row?.original?.date ? moment(row?.original?.date).format('DD-MM-YYYY') : "-"}
                        </>
                    ),
                },
                {
                    accessorKey: 'start_time',
                    header: 'Exam start time',
                    defaultHidden: false,
                    size: 100,
                    filterVariant: 'time',
                    size: 150,
                    Cell: ({ row }) => (
                        <>
                            {row?.original?.start_time ? moment(`${row?.original?.date}, ${row?.original?.start_time}`).format('hh:mm A') : "-"}
                        </>
                    ),
                },
                {
                    accessorKey: 'end_time',
                    header: 'Exam end time',
                    defaultHidden: true,
                    size: 100,
                    filterVariant: 'time',
                    // muiFilterTimePickerProps: {
                    //     format: 'hh:mm A'
                    // },
                    size: 150,
                    Cell: ({ row }) => (
                        <>
                            {row?.original?.end_time ? moment(`${row?.original?.date}, ${row?.original?.end_time}`).format('hh:mm A') : "-"}
                        </>
                    ),
                },
                {
                    accessorKey: 'exam_duration',
                    header: 'Exam duration',
                    defaultHidden: false,
                    size: 100,
                    Cell: ({ row }) => (
                        <>
                            <div>{row?.original?.exam_duration}<span> minutes </span></div>
                        </>
                    ),

                },

                {
                    accessorKey: 'viewexam',
                    header: 'View Exam',
                    defaultHidden: false,
                    size: 150,
                    filterVariant: 'select',
                    mantineFilterSelectProps: {
                        data: statusData,
                    },
                    Cell: ({ row }) => (

                        <>
                            {
                                row?.original?.questions?.length !== 0 ?
                                    (<>

                                        <Questionmodel
                                            props={{
                                                background: "#67b1e8",
                                                hoverBack: "#3a97dc",
                                                width: "auto",
                                                label: "View exam",
                                                date: `${row?.original?.date}`,
                                                end_time: `${row?.original?.end_time}`,
                                                id: `${row?.original?.id}`,
                                            }}>

                                        </Questionmodel>


                                    </>
                                    ) : (<>
                                        <div style={{ textAlign: "center" }}>-
                                        </div></>)
                            }

                        </>
                    ),
                },

                {
                    accessorKey: 'status',
                    header: 'Status',
                    defaultHidden: false,
                    size: 100,
                    filterVariant: 'select',
                    mantineFilterSelectProps: {
                        data: statusData,
                    },
                    Cell: ({ row }) => (
                        <>
                            <UpdateStatus
                                data={row}
                                tableNameProp='exams'
                                writeAccess={common?.access?.write_access ? true : false}
                                setStatusUpdate={setStatusUpdate}
                            />
                        </>
                    ),
                },

            ]

            let actionColumn = {
                accessorKey: 'action',
                header: 'Actions',
                enableColumnFilter: false,
                enableSorting: false,
                enableHiding: false,
                size: 100,
                Cell: ({ row }) => {
                    const isDisabled = row?.original?.questions?.length !== 0;
                    return (<>
                        <div style={{ display: 'flex', gap: '5px', alignItems: "center" }}>
                            {
                                common?.access?.write_access ?
                                    <div className='edit' style={{
                                        color: isDisabled ? "#cccccc" : "#080a0c",
                                        height: "25px",
                                        width: "25px",
                                        textAlign: "center",
                                        cursor: isDisabled ? 'not-allowed' : 'pointer'
                                    }}>
                                        <MdEditNote
                                            size={30}
                                            color={isDisabled ? "#cccccc" : "#1D4ED8"}
                                            onClick={() => {
                                                if (!isDisabled) {
                                                    Pagenavigate(true, row?.original?.id);
                                                }
                                            }}
                                        />
                                    </div> :
                                    <div></div>
                            }


                            {
                                common?.access?.delete_access ?
                                    <div className='delete' style={{
                                        color: "#080a0c",
                                        height: "25px",
                                        width: "25px",
                                        textAlign: "center",
                                    }}>
                                        <MdDeleteForever
                                            size={30}
                                            color="#F44336"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => DeleteRecord(row?.original?.id, deleteExamApi, showNotification, setStatusUpdate)}
                                        />
                                    </div> : <div></div>
                            }

                            {
                                common?.access?.write_access ?
                                    <AddButton
                                        label={`${row?.original?.questions?.length === 0 ? 'Add question' : 'Edit question'}`}
                                        onClick={() => row?.original?.questions?.length === 0 ? QuestionForm(false, row?.original?.id) : QuestionForm(true, row?.original?.id)}

                                        width={"150px"}
                                        height={"40px"}
                                        margin={"20px"}
                                        background={`${row?.original?.questions?.length === 0 ? '#5856d6' : 'rgb(244, 67, 54)'}`}
                                        hoverBack={`${row?.original?.questions?.length === 0 ? '#4b49b6' : ' #de1a0b'}`}
                                    ></AddButton> : <div></div>
                            }



                        </div>

                    </>)

                },

            };

            if (common?.access?.write_access || common?.access?.delete_access) {
                columnData.push(actionColumn);
            }
            return columnData
        }, [common]



    );

    const [ExamList, setExamList] = useState([])
    const [rowCount, setRowCount] = useState(0);

    const [defaultFilter, setDefaultFilter] = useState({
        "itemsPerPage": 5,
        "currentPage": 1,
        "sortBy": [],
        "filters": []
    });

    useEffect(() => {
        getExamList(defaultFilter)
    }, [defaultFilter, statusUpdate])

    const setModulePermissionData = async () => {

        const data = await restrictApi(_nav)

        if (data) {
            let getReadAccess = common?.moduleData.filter((item) => item?.name === data?.name);

            setPermissionData(getReadAccess[0]?.permissions);

        }
    }

    useEffect(() => {

        setModulePermissionData()
        // restrictApi(_nav);
    }, [window.location.href])

    const getExamList = async (filterValue) => {
        let response = await getExamListApi(filterValue ?? defaultFilter);

        if (response && response?.status === 200) {

            if (locationData?.state?.todayData == true) {
                const todayExam = [];
                response?.data?.data?.rows?.map((data) => {
                    if (data?.date === moment().format("YYYY-MM-DD")) {
                        todayExam.push(data)
                    }
                })
                setExamList(todayExam)
            }
            else {
                setExamList(response?.data?.data?.rows);
                setRowCount(response?.data?.data?.count);
            }

            if (response?.data?.data?.rows.length === 0 && defaultFilter.currentPage > 1) {
                setDefaultFilter({ ...defaultFilter, "currentPage": defaultFilter.currentPage - 1 })
            }
        } else {
            showNotification({
                title: 'Error',
                message: response?.data?.message,
                status: 'error',
                isOpen: true
            });
        }
    };
    return (
        <>
            <CCard className="mb-4">
                <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", }}>
                    Exam List
                </CCardHeader>
                <CCardBody>
                    <AddButton
                        label={"Add Exam"}
                        onClick={() => { Pagenavigate(false) }}
                        width={"100px"}
                        height={"40px"}
                        margin={"20px"}
                        background={"#5856d6"}
                        hoverBack={"#4b49b6"}
                    // activeColor={"rgb(110 101 213 / 32%)"}
                    />
                    <CRow className="p-3">
                        <Table
                            columns={columns}
                            data={ExamList}
                            enableHiding={true}
                            defaultFilter={defaultFilter}
                            setDefaultFilter={setDefaultFilter}
                            rowCount={rowCount}
                        />
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}

export default Exam

