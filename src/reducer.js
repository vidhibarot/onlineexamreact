import { legacy_createStore as createStore } from 'redux'
import * as actionTypes from "./action"

export const initialState = {
  setSidebar: true,
  theme: 'light',
  userData: {},
  token: '',
  isLogin: false,
  snackbar: {
    title: '',
    message: '',
    status: '',
    isOpen: false
  },
  access: {},
  examTime: "",
  userExamData: {},
  userTodayExamData: {
         exam_id: "",
        standard_id: "",
        questionAns: []
  }

}
// Convert Permission Value 1/0 in Boolean
const convertPermissionsIntToBoolean = (modules) => {
  if (modules.length > 1) {
    return modules.map((module) => {
      return {
        ...module,
        permissions: {
          ...module.permissions,
          read_access: Boolean(module.permissions.read_access),
          write_access: Boolean(module.permissions.write_access),
          delete_access: Boolean(module.permissions.delete_access)
        }
      };
    });
  }

};
// created reducer for 
export const changeState = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN_DATA:
      localStorage.setItem('authorization', action.payload);
      localStorage.setItem('isLogin', true);
      return {
        ...state,
        token: action.payload,
        isLogin: true
      };
    case actionTypes.SET_USER_DATA:
      localStorage.setItem('userData', JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload
      };
    case actionTypes.SET_MODULE_DATA:
      localStorage.setItem('module', JSON.stringify(action.payload));
      return {
        ...state,
        moduleData: action.payload,
      };
    case actionTypes.SET_SIDEBAR:
      return {
        ...state,
        setSidebar: action.setSidebar,
      };
    case actionTypes.SET_SHOW_SNACKBAR:
      return {

        ...state,
        snackbar: action.payload
      };
    case actionTypes.SET_EXAM_DATA:
      return {
        ...state,
        setExamData: action.payload,
      };
    case actionTypes.SET_USER_EXAM:
      return {
        ...state,
        userExamData: action.payload
      };
    case actionTypes.SET_PERMISSION:
      return {
        ...state,
        access: action.payload
      };
    case actionTypes.SET_USER_TODAY_EXAM:
      return {
        ...state,
        userTodayExamData: action.payload
      };

    case actionTypes.SET_LOGOUT_USER:
      localStorage.removeItem('authorization');
      localStorage.removeItem('module');
      localStorage.setItem('isLogin', false);
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
