import React, { useEffect, useState } from "react"
import {
    CCard, CCardHeader, CCardBody,
    CModal,
    CButton,
    CModalHeader,
    CModalTitle,
    CModalBody,
} from '@coreui/react'
import { useSelector } from "react-redux"
import "../../../style.css"
import { MdEditNote } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import ChangePassword from "../change_password/changepassword";
import Cmodel from "../../../ui-components/model";
import moment from "moment";

const UserProfile = () => {
    const navigate = useNavigate()
    const userProfileData = useSelector((state) => state.user)
    const [visible, setVisible] = useState(false);
    const modalData = useLocation();
    useEffect(() => {
        if (modalData?.state?.modal == false || modalData?.state?.modal == true) {
            setVisible(modalData.state.modal);
        }
    }, [modalData]);

    const Pagenavigate = (value, id, userProfile) => {
        navigate("/userForm", {
            state: { value, id, userProfile },
        });
    }

    return (
        <>
            <CCard className="mb-4">
                <CCardHeader style={{ fontWeight: "700", fontSize: "20px", padding: "25px", paddingLeft: "35px" }}>
                    User Profile
                </CCardHeader>
                <CCardBody>

                    <div className="main">
                        <div className="cover"></div>
                        <Cmodel
                            props={{
                                src: userProfileData?.userData?.image,
                                alt: "Profile Photo",
                                btnText: 'Add Event',
                                profile: true,
                                modelWidth: '50%',
                                btnSX: { marginBottom: "15px" }
                            }}
                        >
                        </Cmodel>

                        <div className="user-main-details">
                            <h1>{userProfileData?.userData?.full_name}</h1>
                            <b>{userProfileData?.userData?.role?.name}</b>
                            <div className="user-stats">
                                <span> <b>Gender  </b>:  {userProfileData?.userData?.gender == 0 ? "Male" : "Female"}</span>
                                <span> <b>Username  </b>:  {userProfileData?.userData?.gender == 0 ? "Male" : "Female"}</span>
                                <div className='edit' style={{
                                    color: "#080a0c",
                                    height: "25px",
                                    width: "25px",
                                    textAlign: "center",
                                }}>
                                    <MdEditNote
                                        size={30}
                                        color="#1D4ED8"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => Pagenavigate(true, userProfileData?.userData?.id, "userProfile")}
                                    /></div>

                            </div>
                        </div>

                        <div className="user-complete-details">
                            <div className="user-meta-details">
                                <div className="user-social">
                                    <p>Location: {userProfileData?.userData?.address}</p>
                                    <p>Joined on: {moment(userProfileData?.userData?.date_of_birth,).format("MMMM Do YYYY")}</p>
                                </div>

                                <div className="user-data">
                                    <p>Email: {userProfileData?.userData?.email}</p>
                                    <p>Phone no: {userProfileData?.userData?.phone_no}</p>
                                </div>
                            </div>
                        </div>

                        <div className="change-password">
                            <CButton color="primary" onClick={() => setVisible(!visible)}>ChangePassword</CButton>
                            <CModal
                                visible={visible}
                                onClose={() => setVisible(false)}
                                aria-labelledby="LiveDemoExampleLabel"
                            >
                                <CModalHeader>
                                    <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <ChangePassword></ChangePassword>
                                </CModalBody>
                            </CModal>
                        </div>
                    </div>
                </CCardBody>
            </CCard>
        </>
    )
}

export default UserProfile