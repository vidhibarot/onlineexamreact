import { CButton, CRow } from '@coreui/react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AddButton = ({ size = 'large', type = 'submit', variant = 'contained', color = 'primary', label = 'Button', disabled = false, ...props }) => {

    // Define a styled button component using styled-components
    const StyledButton1 = styled(CButton)`
        cursor: pointer;
        width: ${props?.width};
        height:${props?.height};
        margin-left:${props?.margin};
        float:${props?.float};
        background: ${props?.background};
        font-weight:500;
        color:white;
        border:none !important;
        &:hover {
            background: ${props?.hoverBack} !important;
            transition: 0.6s;
            color:white;
            font-weight:500;
        };
        &:active {
            background:  ${props?.activeColor} !important; 
        }
         &:disabled {
            cursor: not-allowed !important;
            background: ${props?.disabledBackground || '#cccccc'} !important;
            color: ${props?.disabledColor || '#666666'} !important;
        }`;

    return (
        <CRow sx={{ ...props?.boxSx }}>
            <StyledButton1 onClick={props?.onClick}
                type={type} disabled={props?.disable}>
                {label}
            </StyledButton1>
        </CRow>
    );
};

export default AddButton;



