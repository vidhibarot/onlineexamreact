
import React, { useEffect, useState } from 'react'
import { useMemo } from 'react';

import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react'

import Table from '../../../components/Table'
import { commonDispatch } from '../../../dispatch'
import { AddButton } from '../../../ui-components/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserEnrollByExamId } from '../../../api/exam';
import moment from "moment"
import "../../../scss/_custom.scss"

const UserExamEnroll = () => {
  const navigate = useNavigate();

  const ResultPage = (exam_id, user_id) => {
    navigate("/pages/userresult", { state: { exam_id, user_id }, }
    );
  }


  const ExamId = useLocation();

  const { showNotification } = commonDispatch();
  const columns = useMemo(
    () => {
      let columnData = [
        {
          accessorKey: 'user_id',
          header: 'User Name',
          size: 100,
          defaultHidden: false,
          Cell: ({ row }) => <>{row?.original?.user?.full_name || "-"}</>
        },
        {
          accessorKey: 'exam_id',
          header: 'Exam name',
          size: 100,
          defaultHidden: false,
          Cell: ({ row }) => <>{row?.original?.exam?.exam_type?.name || "-"}</>
        },

        {
          accessorKey: 'subject_id',
          header: 'Subject',
          size: 100,
          defaultHidden: false,
          Cell: ({ row }) => <>{row?.original?.exam?.subject?.name || "-"}</>
        },
        {
          accessorKey: 'date',
          header: 'Exam date',
          size: 100,
          defaultHidden: false,
          Cell: ({ row }) => <>{moment(row?.original?.exam?.date, "DD-MM-YYYY").format("DD-MM-YYYY") || "-"}</>
        },
      ]

      let actionColumn = {
        accessorKey: 'result',
        header: 'Result',
        enableColumnFilter: false,
        enableSorting: false,
        enableHiding: false,
        size: 100,
        Cell: ({ row }) => <>
          <AddButton
            label={'Result'}
            onClick={() => { ResultPage(row?.original?.exam_id, row?.original?.user_id) }}
            width={"100px"}
            height={"40px"}
            margin={"20px"}
            background={"#5856d6"}
            hoverBack={"#4b49b6"}
          >
          </AddButton></>
      };

      // if (common?.access?.write_access || common?.access?.delete_access) {
      columnData.push(actionColumn);
      // }
      return columnData
    }, []



  );

  const [userExamEnrollData, setUserExamEnrollData] = useState([])
  const [rowCount, setRowCount] = useState(0);

  const [defaultFilter, setDefaultFilter] = useState({
    "itemsPerPage": 5,
    "currentPage": 1,
    "sortBy": [],
    "filters": []
  });


  useEffect(() => {
    getUserExamEnrollList(defaultFilter)
  }, [defaultFilter])



  const getUserExamEnrollList = async (filterValue) => {
    const examFilter = { id: 'exam_id', value: parseInt(ExamId?.state?.id) };

    const filters = filterValue.filters.filter((filter) => filter.id !== 'exam_id');
    filters.push(examFilter);

    filterValue.filters = filters;

    let response = await getUserEnrollByExamId(filterValue ?? defaultFilter);

    if (response && response?.status === 200) {
      setUserExamEnrollData(response?.data?.data?.rows);
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
          Exam Enrollment List
        </CCardHeader>
        <CCardBody>

          <CRow className="p-3">
            <Table
              columns={columns}
              data={userExamEnrollData}
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

export default UserExamEnroll

