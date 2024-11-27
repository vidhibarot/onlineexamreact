
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    CRow, CCard, CCardHeader, CCardBody, CForm, CFormLabel,
    CFormInput, CFormSelect, CFormCheck,
    CCol
} from '@coreui/react'

import { AddButton } from '../../../ui-components/form';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import { commonDispatch } from '../../../dispatch'
import { addUserApi, getUserByid, userUpdateApi } from '../../../api/user';
import { getStandardListApi } from '../../../api/standard';


const UserForm = () => {
    const { showNotification, setUserData } = commonDispatch();

    const locationData = useLocation();
    const IsEdit = locationData.state.value;
    const IsEditid = locationData.state.id;
    const userprofileData = locationData.state.userProfile
    const [validated, setValidated] = useState(false);
    const [startDate, setStartDate] = useState(null);

    const [data, setdata] = useState({
        first_name: "",
        last_name: "",
        username: "",
        role_id: "",
        email: "",
        password: "",
        confirm_password: "",
        phone_no: "",
        address: "",
        gender: "",
        date_of_birth: "",
        image: "",
        standard_id: "",
        status: ""
    });

    const genderData = [
        {
            label: 'Male',
            value: 0,
            default: true,
            id: "validationMale"
        },
        {
            label: 'Female',
            value: 1,
            id: "validationFemale"
        }
    ];

    const [file, setFile] = useState();
    const [image, setimage] = useState();
    const [standardData, setstandardData] = useState();


    const handleChange = (e) => {
        setFile(e.target.files[0]);
        setimage(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            let formData = new FormData();
            if (IsEdit && userprofileData != "userProfile") {
                formData.append("id", IsEditid);
                formData.append("first_name", data?.first_name);
                formData.append("last_name", data?.last_name);
                formData.append("role_id", data?.role_id);
                formData.append("username", data?.username);
                formData.append("email", data?.email);
                formData.append("phone_no", data?.phone_no);
                formData.append("address", data?.address);
                formData.append("gender", data?.gender);
                formData.append("date_of_birth", data?.date_of_birth);
                formData.append("standard_id", data?.standard_id)
                formData.append("file", file);
                formData.append("status", data?.status);
                let response = await userUpdateApi(formData);

                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'primary',
                        isOpen: true
                    });
                    navigate("/pages/users");
                } else {
                    showNotification({
                        title: "Error",
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true
                    });
                }
            }
            else if (userprofileData == "userProfile") {
                formData.append("id", IsEditid);
                formData.append("first_name", data?.first_name);
                formData.append("last_name", data?.last_name);
                formData.append("role_id", data?.role_id);
                formData.append("username", data?.username);
                formData.append("email", data?.email);
                formData.append("phone_no", data?.phone_no);
                formData.append("address", data?.address);
                formData.append("gender", data?.gender);
                formData.append("date_of_birth", data?.date_of_birth);
                formData.append("standard_id", data?.standard_id)
                formData.append("file", file);
                formData.append("status", data?.status);
                let response = await userUpdateApi(formData);
                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'primary',
                        isOpen: true
                    });
                    setUserData(response?.data?.data?.userReturnData)
                    navigate("/pages/userprofile");
                } else {
                    showNotification({
                        title: "Error",
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true
                    });
                }
            }
            else {
                formData.append("first_name", data?.first_name);
                formData.append("last_name", data?.last_name);
                formData.append("role_id", data?.role_id);
                formData.append("username", data?.username);
                formData.append("email", data?.email);
                formData.append("password", data?.password);
                formData.append("confirm_password", data?.confirm_password);
                formData.append("phone_no", data?.phone_no);
                formData.append("address", data?.address);
                formData.append("gender", data?.gender);
                formData.append("date_of_birth", data?.date_of_birth);
                formData.append("standard_id", data?.standard_id)
                formData.append("file", file);
                formData.append("status", data?.status);
                let response = await addUserApi(formData);
                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'primary',
                        isOpen: true
                    });
                    navigate("/pages/users");
                } else {
                    showNotification({
                        title: "Error",
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true
                    });
                }
            }
        }
        setValidated(true);
    };

    const handleBirthDate = (date) => {
        if (date) {
            setdata({ ...data, date_of_birth: moment(date).format('YYYY-MM-DD') || "" });
            setStartDate(date);

        } else {
            setdata({ ...data, date_of_birth: '' });
            setStartDate('');
        }
    }

    useEffect(() => {
        getStandardData();
        if (IsEdit) {
            getUserData();
        }
    }, [IsEdit, IsEditid]);

    const getUserData = async () => {
        let response = await getUserByid(IsEditid);
        if (response && response?.status === 200) {
            const userData = response?.data?.data;
            setdata(userData);
            setimage(userData?.image);

            if (userData?.date_of_birth) {
                setStartDate(moment(userData?.date_of_birth).toDate() || "");
            }

        }
    };

    const navigate = useNavigate();

    const handleForm = () => {
        if (userprofileData == "userProfile") {
            navigate("/pages/userprofile")
        }
        else {
            navigate("/pages/users")
        }
    }

    const getStandardData = async () => {
        let response = await getStandardListApi();
        if (response && response?.status === 200) {
            setstandardData(response?.data?.data?.rows)
        }
    }

    return (
        <>
            <CCard className="mb-4">
                <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", paddingLeft: "35px" }}>
                    {IsEdit ? "Edit User" : "Add User"}
                </CCardHeader>
                <CCardBody>
                    <CRow className="m-2 d-flex align-items-center justify-content-center">
                        <CForm noValidate
                            validated={validated}
                            onSubmit={handleSubmit}>

                            <CRow>
                                <CCol className='col-md-6 col-sm-12 col-xs-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>First Name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        placeholder="First Name"
                                        autoComplete="First Name"
                                        feedbackInvalid="Please enter first name."
                                        name="first_name"
                                        value={data?.first_name}
                                        onChange={(event) => setdata({ ...data, first_name: event.target.value })}
                                        id="validationCustomUser"
                                        required />
                                </CCol>

                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Last Name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        placeholder="Last Name"
                                        autoComplete="Last Name"
                                        feedbackInvalid="Please enter last name."
                                        name="last_name"
                                        value={data?.last_name}
                                        onChange={(event) => setdata({ ...data, last_name: event.target.value })}
                                        id="validationCustomUser"
                                        required />
                                </CCol>

                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>User Name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        placeholder="User Name"
                                        autoComplete="User Name"
                                        feedbackInvalid="Please enter user name ."
                                        name="user_name"
                                        value={data?.username}
                                        onChange={(event) => setdata({ ...data, username: event.target.value })}
                                        id="validationCustomUser"
                                        required />
                                </CCol>

                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Role Name</CFormLabel>
                                    <CFormSelect
                                        name="role_id"
                                        value={data?.role_id}
                                        aria-describedby="validationCustom03Feedback"
                                        onChange={(event) => setdata({ ...data, role_id: event.target.value })}
                                        id="validationStatus"
                                        required
                                        className={`form-control ${data.role_id === "" && validated ? 'is-invalid' : ''}`}>

                                        <option value="">Please select a role</option>
                                        <option value="1">Admin</option>
                                        <option value="2">Teacher</option>
                                        <option value="3">Student</option>
                                    </CFormSelect>
                                    {data.role_id === "" && validated && <div className="invalid-feedback">Please select a role.</div>}
                                </CCol>

                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="email" style={{ fontWeight: "500", fontSize: "15px" }}>Email</CFormLabel>
                                    <CFormInput
                                        type="email"
                                        placeholder="Email Address"
                                        autoComplete="Email Address"
                                        feedbackInvalid="Please enter email in valid format."
                                        name="email"
                                        value={data?.email}
                                        onChange={(event) => setdata({ ...data, email: event.target.value })}
                                        id="validationCustomEmail"
                                        required />
                                </CCol>
                                {
                                    !IsEdit ?
                                        <CCol className='col-md-6 col-sm-12 col-12'>
                                            <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Password</CFormLabel>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                feedbackInvalid="Please enter password."
                                                name="password"
                                                onChange={(event) => setdata({ ...data, password: event.target.value })}
                                                id="validationCustomPassword"
                                                required
                                            />
                                        </CCol> : <></>
                                }
                                {
                                    !IsEdit ?
                                        <CCol className='col-md-6 col-sm-12 col-12'>
                                            <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Confirm Password</CFormLabel>
                                            <CFormInput
                                                type="password"
                                                placeholder="Confirm Password"
                                                autoComplete="confirm-password"
                                                feedbackInvalid="Please enter confirm password."
                                                name="password"
                                                onChange={(event) => setdata({ ...data, confirm_password: event.target.value })}
                                                id="validationCustomPassword"
                                                required
                                            />
                                        </CCol> : <></>
                                }

                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Phone Number</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        placeholder="Phone Number"
                                        autoComplete="Phone Number"
                                        feedbackInvalid="Please enter a phone number."
                                        name="phone_no"
                                        value={data?.phone_no}
                                        onChange={(event) => setdata({ ...data, phone_no: event.target.value })}
                                        id="validationCustomPhoneno"
                                        required
                                        minLength={10}
                                    />
                                </CCol>
                                <CCol className='col-3'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Gender</CFormLabel>
                                    {
                                        genderData.map((d) => (
                                            <CFormCheck
                                                type="radio"
                                                label={d.label}
                                                name="gender"
                                                id={d.id}
                                                checked={(parseInt(d?.value) === data?.gender) === true ? d?.value : d?.default}
                                                onChange={() => setdata({ ...data, gender: d?.value })} />)
                                        )
                                    }
                                </CCol>
                                <CCol className='col-md-3 col-sm-6 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Birth Date:</CFormLabel><br></br>
                                    <DatePicker
                                        showIcon
                                        selected={startDate}
                                        id="inlineCheckbox2"
                                        onChange={(date) => handleBirthDate(date)}
                                        feedbackInvalid="Please select date."
                                        required
                                        className={`form-control ${!data.date_of_birth && validated ? 'is-invalid' : ''}`}
                                    />
                                    {!data.date_of_birth && validated && <div className="invalid-feedback">Please select date.</div>}
                                </CCol>
                                {
                                    data?.role_id == "3" &&
                                    <CCol className='col-md-3 col-sm-12 col-12'>
                                        <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Standard</CFormLabel>
                                        <CFormSelect
                                            name=""
                                            value={data?.standard_id}
                                            aria-describedby="validationCustom03Feedback"
                                            onChange={(event) => setdata({ ...data, standard_id: event.target.value })}
                                            id="validationsubject"
                                            required
                                            className={`form-control ${data.standard_id === "" && validated ? 'is-invalid' : ''}`}>

                                            <option value="">Please select standard</option>
                                            {
                                                standardData?.map((data) => (
                                                    <option value={data?.id}>{data?.name}</option>

                                                ))
                                            }
                                        </CFormSelect>
                                        {data.exam_type_id === "" && validated && <div className="invalid-feedback">Please select standard.</div>}
                                    </CCol>

                                }

                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Address</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        placeholder="Address"
                                        autoComplete="Address"
                                        feedbackInvalid="Please enter address."
                                        name="address"
                                        value={data?.address}
                                        onChange={(event) => setdata({ ...data, address: event.target.value })}
                                        id="validationCustomAddress"
                                        required
                                    />
                                </CCol>


                                <CCol className='col-md-3 col-6'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Status</CFormLabel>
                                    <CFormSelect
                                        name="status"
                                        value={data?.status}
                                        aria-describedby="validationCustom03Feedback"
                                        onChange={(event) => setdata({ ...data, status: event.target.value })}
                                        id="validationStatus"
                                        required
                                        className={`form-control ${data.status === "" && validated ? 'is-invalid' : ''}`}>

                                        <option value="">Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </CFormSelect>
                                    {data.status === "" && validated && <div className="invalid-feedback">Please select a status.</div>}
                                </CCol>
                                <CCol className='col-md-6 col-sm-12 col-12'>
                                    <CFormLabel className="mt-3" htmlFor="name" style={{ fontWeight: "500", fontSize: "15px" }}>Image</CFormLabel>

                                    <CFormInput
                                        type="file"
                                        id="formFile"
                                        feedbackInvalid="Please select image."
                                        name="image"
                                        // value={IsEdit ? "data1.jpg" : ""}
                                        // value={data.image}
                                        onChange={handleChange}
                                        required={!image ? true : false}
                                    />
                                    <div className='mt-2'>
                                        <img style={{ height: "150px", width: "150px" }} src={image} />
                                    </div>

                                </CCol>

                            </CRow>
                            <div className='button d-flex gap-3 mt-3 align-items-center justify-content-center'>
                                <AddButton label={"Submit"}
                                    width={"100px"}
                                    height={"40px"}
                                    margin={"15px"}
                                    background={"#5856d6"}
                                    hoverBack={"#4b49b6"}
                                    type="submit"
                                />

                                <AddButton
                                    label={"Cancel"}
                                    width={"100px"}
                                    height={"40px"}
                                    margin={"15px"}
                                    background={"rgb(33, 38, 49)"}
                                    hoverBack={"#000000"}
                                    // activeColor={"rgb(110 101 213 / 32%)"}
                                    // navigate={"/pages/role"}
                                    // hoverColor={"white"}
                                    onClick={handleForm}
                                />
                            </div>
                        </CForm>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}


export default UserForm



