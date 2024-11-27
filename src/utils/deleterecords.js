import { ConformationAlert } from './conformationAlert';

export const DeleteRecord = async (id, DeleteApiData, showNotification, setStatusUpdate) => {

    return ConformationAlert({
        title: "Do you want to Delete this record?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes Delete",
        denyButtonText: `Don't save`
    }).then(async (result) => {
        if (result?.isConfirmed) {
            let response = await DeleteApiData(id);
            if (response?.status === 200) {
                showNotification({
                    title: "Success",
                    message: response?.data?.message,
                    status: 'success',
                    isOpen: true
                });
                setStatusUpdate(prev => !prev);
            } else {
                showNotification({
                    title: "Error",
                    message: response?.data?.message,
                    status: 'error',
                    isOpen: true
                })
            }
        }
    });
}
