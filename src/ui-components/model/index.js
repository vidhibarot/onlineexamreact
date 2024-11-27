
import React, { useState } from 'react';
import { AddButton } from '../form';
import { CAlert, CModal, CButton, CModalTitle, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'
import "../../style.css"

const Cmodel = ({ props, children }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            {/* <img
                src={props?.src} alt="Profile Photo"
                style={{ cursor: 'pointer', height: `${props?.profile ? "200px" : "85px"}`, width: `${props?.profile ? "200px" : "85px"}`, borderRadius: '10px', objectFit: "fill" }}
                onClick={() => setVisible(!visible)}
            /> */}
                 <img src={props?.src} className="user-pic" alt="Profile Photo" onClick={() => setVisible(!visible)}/>
            <CModal
                scrollable
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="ScrollingLongContentExampleLabel2"
            >
                <CModalBody>
                    <img
                        src={props?.src} alt="Profile Photo"
                        style={{ cursor: 'pointer', height: 'auto', width: '100%', borderRadius: '10px', objectFit: "fill" }}
                    />
                </CModalBody>
            </CModal>
        </>
    )


}

export default Cmodel;



