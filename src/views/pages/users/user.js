import React, { useEffect, useState, createRef } from 'react'
import { useMemo } from 'react';
import { CRow, CCard, CCardHeader, CCardBody, CTooltip, CButton } from '@coreui/react'
import { getUserListApi, deleteUserApi } from '../../../api/user';
import { statusData } from '../../../utils/config'
import UpdateStatus from '../../../ui-components/updatestatus/updatestatus'
import Table from '../../../components/Table'
import { useSelector } from 'react-redux';
import { MdEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { DeleteRecord } from '../../../utils/deleterecords';
import { commonDispatch } from '../../../dispatch'
import { AddButton } from '../../../ui-components/form';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Cmodel from '../../../ui-components/model';
import { HiBookOpen } from "react-icons/hi2";
import resultImage from "../../../assets/images/exam-results.png"
import StudentResults from '../student_results/student_results';
import { restrictApi } from '../../../api/role';
import _nav from '../../../_nav';


const User = () => {
    const [statusUpdate, setStatusUpdate] = useState(false);
    const common = useSelector((state) => state?.user);
    const { setPermissionData } = commonDispatch();

    const userModule = useSelector((state) => state?.user)
    const navigate = useNavigate();
    const locationData = useLocation();
    const [UserList, setUserList] = useState([])
    const [rowCount, setRowCount] = useState(0);

    const Pagenavigate = (value, id) => {
        navigate("/userForm", {
            state: { value, id },
        });
    }

    const StudentResult = (id) => {
        navigate("/pages/student_results", {
            state: { id },
        });
    }

    const { showNotification } = commonDispatch();
    const columns = useMemo(
        () => {
            let columnData = [
                {
                    accessorKey: 'full_name',
                    header: 'Full Name',
                    size: 150,
                    mantineTableHeadCellProps: { sx: { color: 'green' } },
                    Cell: ({ row }) => (
                        <>
                            {row?.original?.first_name && row?.original?.last_name ? row?.original?.full_name : "-"}
                        </>
                    ),
                },
                {
                    accessorKey: 'role.name',
                    header: 'Role',
                    size: 150,
                    enableSorting: false,
                    // Header: <i style={{ display:"block",textAlign:"center" }}>Role</i>,
                    //  for give font color or stye
                    Cell: ({ row }) => (
                        <>
                            {row?.original?.role?.name || "-"}
                        </>
                    ),
                },
                {
                    accessorKey: 'email',
                    header: 'Email',
                    size: 200,
                },
                {
                    accessorKey: 'phone_no',
                    header: 'Phone No',
                    size: 150,
                    defaultHidden: true,
                    Cell: ({ row }) => (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'row' }}>

                                <div>{row?.original?.phone_no || "-"}</div>
                            </div>
                        </>
                    ),
                },
                {
                    accessorKey: 'gender',
                    header: 'Gender',
                    size: 150,
                    defaultHidden: true,
                    Cell: ({ row }) => (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'row' }}>

                                <div>{row?.original?.gender || "-"}</div>
                            </div>
                        </>
                    ),
                },
                {
                    accessorKey: 'address',
                    header: 'Address',
                    size: 150,
                    defaultHidden: true,
                    Cell: ({ row }) => (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'row' }}>

                                <div>{row?.original?.address || "-"}</div>
                            </div>
                        </>
                    ),
                },
                {
                    accessorKey: 'date_of_birth',
                    header: 'Birth date',
                    size: 150,
                    defaultHidden: false,
                    filterVariant: 'date',
                    Cell: ({ row }) => (
                        <>
                            {row?.original?.date_of_birth ? moment(row?.original?.date_of_birth).format('DD-MM-YYYY') : "-"}
                        </>
                    ),
                },
                {
                    accessorKey: 'image',
                    header: 'Image',
                    size: 150,
                    enableColumnFilter: false,
                    enableSorting: false,
                    Cell: ({ row }) => (
                        <>

                            {row?.original?.image ? (
                                <Cmodel
                                    props={{
                                        src: row?.original?.image,
                                        alt: "Profile Photo",
                                        btnText: 'Add Event',
                                        modelHead: `${common?.isEditForm ? 'Edit Event' : 'Add Event'}`,
                                        modelWidth: '50%',
                                        btnSX: { marginBottom: "15px" }
                                    }}
                                >
                                </Cmodel>
                            ) :
                                <div> - </div>
                            }
                        </>
                    ),
                },
                {
                    // accessorKey: 'status',
                    header: 'Result',
                    size: 150,
                    filterVariant: 'select',
                    mantineFilterSelectProps: {
                        data: statusData,
                    },
                    Cell: ({ row }) => (

                        <>
                            {
                                row?.original?.role_id === 3 ?
                                    (
                                        <CTooltip
                                            content="Please click on icon for view student results."
                                            placement="top"
                                            trigger="hover"
                                        >
                                            <CButton style={{ border: "none" }} onClick={() => StudentResult(row?.original?.id)}>
                                                <img style={{ height: "30px" }} src={resultImage}></img>
                                            </CButton>
                                        </CTooltip>) :
                                    (<div style={{ paddingLeft: "15px" }}>-</div>)
                            }

                        </>
                    ),
                },
                {
                    accessorKey: 'status',
                    header: 'Status',
                    size: 150,
                    filterVariant: 'select',
                    mantineFilterSelectProps: {
                        data: statusData,
                    },
                    Cell: ({ row }) => (
                        <>
                            <UpdateStatus
                                data={row}
                                tableNameProp='users'
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
                size: 150,
                Cell: ({ row }) => (
                    <>

                        <div style={{ display: 'flex', gap: '5px', alignItems: "center" }}>
                            {
                                common?.access?.write_access &&
                                <div className='edit' style={{
                                    color: "#080a0c",
                                    // backgroundColor: "rgb(110 101 213 / 32%)",
                                    height: "25px",
                                    width: "25px",
                                    textAlign: "center",
                                }}>
                                    <MdEditNote
                                        size={30}
                                        color="#1D4ED8"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => Pagenavigate(true, row?.original?.id)}
                                    /></div>
                            }

                            {
                                common?.access?.delete_access &&
                                <div className='delete' style={{
                                    color: "#080a0c",
                                    // backgroundColor: "rgb(225 7 51 / 32%)",
                                    height: "25px",
                                    width: "25px",
                                    textAlign: "center",
                                }}>
                                    <MdDeleteForever
                                        size={30}
                                        color="#F44336"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => DeleteRecord(row?.original?.id, deleteUserApi, showNotification, setStatusUpdate)}
                                    />
                                </div>
                            }
                        </div>
                    </>
                ),
            };

            if (common?.access?.write_access || common?.access?.delete_acces) {
                columnData.push(actionColumn);
            }
            return columnData
        }, [common, setUserList]
    );

    const [defaultFilter, setDefaultFilter] = useState({
        "itemsPerPage": 5,
        "currentPage": 1,
        "sortBy": [],
        "filters": []
    });

    const getUserList = async (filterValue) => {
        let response = await getUserListApi(filterValue ?? defaultFilter);

        if (response && response?.status === 200) {
            const studentData = []
            if (locationData?.state?.student == true) {
                response?.data?.data?.rows?.map((data) => {
                    if (data?.role?.name == "Students") {
                        studentData.push(data)
                    }
                })
                setUserList(studentData)
            }
            else {
                setUserList(response?.data?.data?.rows);
                setRowCount(response?.data?.data?.count);
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


    useEffect(() => {
        getUserList(defaultFilter)
    }, [defaultFilter, statusUpdate])

    const setModulePermissionData = async () => {
        const data = await restrictApi(_nav)
        if (data) {
            let getReadAccess = userModule?.moduleData.filter((item) => item?.name === data?.name);
            setPermissionData(getReadAccess[0]?.permissions);
        }
    }

    useEffect(() => {
        setModulePermissionData()
    }, [window.location.href])


    return (
        <>
            <CCard className="mb-4">
                <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px" }}>
                    User List
                </CCardHeader>
                <CCardBody>

                    <AddButton
                        label={"Add User"}
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
                            data={UserList}
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

export default User



