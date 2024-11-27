import { useDispatch } from 'react-redux';
import * as actionTypes from './action'

export const commonDispatch = () => {

    const dispatch = useDispatch();

    const showNotification = async (payload) => {
        dispatch({ type: actionTypes.SET_SHOW_SNACKBAR, payload });
    };

    const setLoginData = (payload) => {
        dispatch({ type: actionTypes.SET_LOGIN_DATA, payload });
    };

    const setUserData = (payload) => {
        dispatch({ type: actionTypes.SET_USER_DATA, payload });
    };

    const setModuleData = (payload) => {
        dispatch({ type: actionTypes.SET_MODULE_DATA, payload });
    };

    const logout = (payload) => {
        dispatch({ type: actionTypes.SET_LOGOUT_USER, payload });
    };

    const setExamData = (payload) => {
        dispatch({ type: actionTypes.SET_EXAM_DATA, payload });
    }

    const setPermissionData = (payload) => {
        dispatch({ type: actionTypes.SET_PERMISSION, payload });
    }
    const setUserExamData = (payload) => {
        dispatch({ type: actionTypes.SET_USER_EXAM, payload });
    }
    const setUserTodayExamData = (payload) => {
        dispatch({ type: actionTypes.SET_USER_TODAY_EXAM, payload });
    }

    const setExamTime = (payload) => {
        dispatch({ type: actionTypes.SET_EXAM_TIME, payload });
    }

    return { showNotification, setLoginData, setUserData, setModuleData, logout, setExamData, setPermissionData, setUserExamData, setUserTodayExamData, setExamTime };
};
