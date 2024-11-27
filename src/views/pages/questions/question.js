
import React, { useEffect, useState, createRef } from 'react'
import { useMemo } from 'react';

import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'

import { getRolesListApi, deleteRoleApi, getRoleByid } from '../../../api/role'
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




const Question = () => {
  const [statusUpdate, setStatusUpdate] = useState(false);
  const common = useSelector((state) => state?.common);
  const navigate = useNavigate();
  const Pagenavigate = (value, id) => {
    navigate("/roleForm", {
      state: { value, id },
    });
  }

  const { showNotification } = commonDispatch();
  const columns = useMemo(
    () => {
      let columnData = [
        {
          accessorKey: 'name',
          header: 'Role name',
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
                tableNameProp='roles'
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
                  onClick={() => DeleteRecord(row?.original?.id, deleteRoleApi, showNotification, setStatusUpdate)}
                /></div>
            </div>


          </>
        ),

      };

      // if (common?.access?.write_access || common?.access?.delete_access) {
      columnData.push(actionColumn);
      // }
      return columnData
    }, [common]



  );

  const [RoleList, setRoleList] = useState([])
  const [rowCount, setRowCount] = useState(0);

  const [defaultFilter, setDefaultFilter] = useState({
    "itemsPerPage": 5,
    "currentPage": 1,
    "sortBy": [],
    "filters": []
  });

  useEffect(() => {
    getRolesList(defaultFilter)
  }, [defaultFilter, statusUpdate])



  const getRolesList = async (filterValue) => {
    let response = await getRolesListApi(filterValue ?? defaultFilter);
    if (response && response?.status === 200) {
      setRoleList(response?.data?.data?.rows);
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

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", }}>
          Role List
        </CCardHeader>
        <CCardBody>
          <AddButton
            label={"Add Role"}
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
              data={RoleList}
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

export default Question

