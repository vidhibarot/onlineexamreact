
import React, { useEffect, useState, createRef } from 'react'
import { useMemo } from 'react';

import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'

import { getSubjectListApi, deleteSubjectApi } from '../../../api/subject'
import { statusData } from '../../../utils/config'
import UpdateStatus from '../../../ui-components/updatestatus/updatestatus'
import Table from '../../../components/Table'
import { useSelector } from 'react-redux';
import { MdEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { DeleteRecord } from '../../../utils/deleterecords';
import { commonDispatch } from '../../../dispatch'
import { AddButton } from '../../../ui-components/form';
import { useNavigate } from 'react-router-dom';
import { restrictApi } from '../../../api/role';
import _nav from '../../../_nav';




const Subject = () => {
  const [statusUpdate, setStatusUpdate] = useState(false);
  const common = useSelector((state) => state?.user);

  const navigate = useNavigate();
  const Pagenavigate = (value, id) => {
    navigate("/subjectForm", {
      state: { value, id },
    });
  }

  const { showNotification, setPermissionData } = commonDispatch();
  const userModule = useSelector((state) => state?.user)
  const columns = useMemo(
    () => {
      let columnData = [
        {
          accessorKey: 'user.full_name',
          header: 'User Name',
          size: 100,
          // Cell:({row})=><>{console.log("row?.original?.user?.full_name",row?.original?.user?.full_name )}</>
          Cell: ({ row }) => <>{row?.original?.user?.full_name || "-"}</>
        },
        {
          accessorKey: 'name',
          header: 'Subject name',
          size: 100,
        },
        {
          accessorKey: 'status',
          header: 'Status',
          size: 100,
          filterVariant: 'select',
          mantineFilterSelectProps: {
            data: statusData,
          },
          Cell: ({ row }) => (
            <>
              <UpdateStatus
                data={row}
                tableNameProp='subjects'
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
        Cell: ({ row }) => (
          <>
            <div style={{ display: 'flex', gap: '5px', alignItems: "center" }}>
              {common?.access?.write_access ? <div className='edit' style={{
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
                /></div> : <div></div>}

              {
                common?.access?.delete_access ?
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
                      onClick={() => DeleteRecord(row?.original?.id, deleteSubjectApi, showNotification, setStatusUpdate)}
                    /></div> : <div></div>
              }

            </div>

          </>
        ),

      };

      if (common?.access?.write_access || common?.access?.delete_access) {
        columnData.push(actionColumn);
      }
      return columnData
    }, []



  );

  const [SubjectList, setSubjectList] = useState([])
  const [rowCount, setRowCount] = useState(0);

  const [defaultFilter, setDefaultFilter] = useState({
    "itemsPerPage": 5,
    "currentPage": 1,
    "sortBy": [],
    "filters": []
  });

  useEffect(() => {
    getSubjectsList(defaultFilter)
  }, [defaultFilter, statusUpdate])



  const getSubjectsList = async (filterValue) => {
    let response = await getSubjectListApi(filterValue ?? defaultFilter);
    if (response && response?.status === 200) {
      setSubjectList(response?.data?.data?.rows);
      setRowCount(response?.data?.data?.count);
    } else {
      showNotification({
        title: 'Error',
        message: response?.data?.message,
        status: 'error',
        isOpen: true
      });
    }
  };
  const setModulePermissionData = async () => {

    const data = await restrictApi(_nav)

    if (data) {
      let getReadAccess = userModule?.moduleData.filter((item) => item?.name === data?.name);

      setPermissionData(getReadAccess[0]?.permissions);
    }
  }

  useEffect(() => {

    setModulePermissionData()
    // restrictApi(_nav);
  }, [window.location.href])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", }}>
          Subject List
        </CCardHeader>
        <CCardBody>
          <AddButton
            label={"Add Subject"}
            onClick={() => { Pagenavigate(false) }}
            width={"auto"}
            height={"40px"}
            margin={"20px"}
            background={"#5856d6"}
            hoverBack={"#4b49b6"}
          // activeColor={"rgb(110 101 213 / 32%)"}
          />
          <CRow className="p-3">
            <Table
              columns={columns}
              data={SubjectList}
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

export default Subject

