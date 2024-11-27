
import React from 'react';
import { FormButton } from '../form';
import { commonDispatch } from '../../dispatch';
import { statusChangeApi } from '../../api/commonapi';

const UpdateStatus = ({ data, tableNameProp, writeAccess, setStatusUpdate }) => {
    const { showNotification } = commonDispatch();

    const handleStatusChange = async () => {
        const updatedData = data.original;
        var message = '';

        if (updatedData?.status === 1) {
            updatedData.status = 0;
            message = 'Record has been inactivated successfully.';
        } else {
            updatedData.status = 1;
            message = 'Record has been activated successfully.';
        }

        const { id, status } = updatedData;
        let response = await statusChangeApi({ id, status, tableName: tableNameProp });

        if (response?.status === 200) {
            setStatusUpdate(prev => !prev);
            showNotification({
                title: "Success",
                message: message,
                status: 'success',
                isOpen: true
            });
        } else {
            setStatusUpdate(prev => !prev);
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'error',
                isOpen: true
            });
        }
    };

    const isClickable = !((tableNameProp === 'users' && data.original?.role_id === 1) || (tableNameProp === 'roles' && data.original?.isDefault === 1) || (tableNameProp === 'leave_types' && data.original?.isDefault === 1) || (tableNameProp === 'leave_sub_types' && data.original?.isDefault === 1));

    return (
        <FormButton
            label={data?.original?.status === 1 ? 'Active' : 'Inactive'}
            type={'button'}
            onClick={writeAccess ? handleStatusChange : null}
            // onClick={handleStatusChange}
            className={data?.original?.status === 1 ? 'active-button' : 'inactive-button'}
            height="40px"
            width="100px"
            margin="0px"
            status={data?.original?.status}
        />
    );
};

export default UpdateStatus;

