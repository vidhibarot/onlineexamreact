import { useNavigate } from 'react-router-dom';
import { ConformationAlert } from '../../../utils/conformationAlert';

export const handleSubmit = async (finalData, enrollApi, showNotification, data, value, navigate) => {
    if (value == "completeTime") {
        let response = await enrollApi(finalData);
        if (response?.status === 200) {
            showNotification({
                title: "Success",
                message: response?.data?.message,
                status: 'success',
                isOpen: true
            });
            navigate("/dashboard")
        } else {
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'error',
                isOpen: true
            })
        }
    }
    else {
        return ConformationAlert({
            title: "Do you want to submit this?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes Submit",
            denyButtonText: `Don't save`
        }).then(async (result) => {
            if (result?.isConfirmed) {
                let response = await enrollApi(finalData);
                if (response?.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'success',
                        isOpen: true
                    });
                    navigate("/dashboard")
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
}

