import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useState } from 'react';
import { useEffect } from 'react';

const Table = ({ columns, data, enableHiding, defaultFilter, setDefaultFilter, rowCount, enableExpanding, title, enableColumnFilters }) => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: defaultFilter?.currentPage - 1,
        pageSize: defaultFilter?.itemsPerPage,
    });

    // Set pagination value to defaultFilter state.
    const setPaginationValue = () => {
        {
            setDefaultFilter && setDefaultFilter(prevState => ({
                ...prevState,
                itemsPerPage: pagination?.pageSize,
                currentPage: pagination?.pageIndex + 1,
                sortBy: sorting,
                filters: columnFilters
            }));
        }
    }

    useEffect(() => {
        setPaginationValue();
    }, [sorting, columnFilters, pagination]);

    // Set default hidden columns.
    const findColumn = () => {
        let defaultHiddenColumns = {};
        columns.forEach((column) => {
            if (column?.defaultHidden === true) {
                defaultHiddenColumns[column?.accessorKey] = false;
            }
        });
        return defaultHiddenColumns;
    }

    const table = useMantineReactTable({
        columns,
        data,
        enableDensityToggle: false,
        // initialState: { columnVisibility: findColumn(), density: 'comfortable' },  
        // above main initial state but using above density
        initialState: { columnVisibility: findColumn() },
        enableHiding,   // For hiding columns
        enableFullScreenToggle: false,   // For remove full screen table view option
        enableColumnActions: false,   // For remove column action option
        enableGlobalFilter: false,   // For remove global search option
        paginationDisplayMode: 'pages',   // For display page number in pagination
        rowCount,   // For total count of records.
        muiPaginationProps: {
            shape: 'rounded',   // For page number design in pagination
            color: 'secondary'
        },
        manualPagination: true,   // For manual pagination
        onSortingChange: setSorting,   // Set the value of sorting
        onColumnFiltersChange: setColumnFilters,   // Set the value of filtering
        onPaginationChange: setPagination,   // Set the value of pagination
        state: { sorting, columnFilters, pagination },   // Define states for manual sorting, filtering, and pagination
        enableExpanding,
        enableColumnFilters,
        headerColor: '#27275dc7',
        mantineTableProps: {
            backgroundColor: "red",
            // highlightOnHover: false,
            // withColumnBorders: true,
            // withBorder: colorScheme === 'light',
            sx: {
                'thead > tr': {
                    // backgroundColor: 'inherit',
                    backgroundColor: "white",
                    textAlign: 'center',
                    // display:"flex",
                    // justifyContent:"center"

                },
                'thead > tr > th': {
                    // backgroundColor: 'inherit',
                    fontSize: "15px",
                    // backgroundColor: "#cfa9ee42;",
                    // alignItems: "center",

                    // justifyContent: "center",
                    // color:"red",
                    gap: "0px"
                },
                'tbody > tr > td': {
                    // padding:"0px",
                    // height:"70px",
                    // paddingLeft:"16px"
                    // mantine-ccciun
                    // backgroundColor:"black",
                    // backgroundColor: 'inherit',
                    // admin super admin
                    // textAlign:'center'
                },
                'tbody > tr > .mantine-ccciun': {
                    padding:"0px"
                    // mantine-ccciun
                    // backgroundColor:"black",
                    // backgroundColor: 'inherit',
                    // admin super admin
                    // textAlign:'center'
                },
               
            },
        },
    });

    return (
        <MantineReactTable table={table} />
    );
};

export default Table;