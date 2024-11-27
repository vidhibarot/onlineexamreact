import * as React from 'react';
import { useSelector } from 'react-redux';
import { commonDispatch } from '../../dispatch'
import { CAlert } from '@coreui/react'


const SnackbarNotification = () => {


    const common = useSelector((state) => state?.user);

    const { showNotification } = commonDispatch();

    const handleClick = () => showNotification({ isOpen: true });

    const handleClose = () => showNotification({ isOpen: false });

    const isVisible = common?.snackbar?.message ? true : false;
    return (
        <>
            <div style={{ position: "fixed", bottom: "0", right: "0", width: "auto", float: "right" }}>
                <CAlert color={common?.snackbar?.status} visible={isVisible} spacing={2} sx={{ width: '50%' }} dismissible >
                    {common?.snackbar?.message}
                </CAlert>
            </div>
        </>
    );
}

export default SnackbarNotification;