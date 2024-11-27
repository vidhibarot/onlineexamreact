import { CButton, CRow } from '@coreui/react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'; // Import styled-components

const FormButton = ({ size = 'large', type = 'submit', variant = 'contained', color = 'primary', label = 'Button', ...props }) => {
    const customization = useSelector((state) => state?.customization);
   
    // Define a styled button component using styled-components
    const StyledButton = styled(CButton)`
        cursor: pointer;
        width: ${props.width};
        height:${props.height};
        border:${props.status === 1 ? '1.5px solid blue' : props.className == "active-permission" ? 'none': props.className == "permi-button" ? '0.5px solid black': props.status === 0 ? '1.5px solid red' : '1.5px solid black'};
        font-weight:${props?.fontWeight ? props?.fontWeight : 700};
        color:${props.status === 1 ? '#1d4ed8' : props.status === 0 ? '#f44336' : props?.color};
        background:${props.className == "active-permission" && "#eccccc"};
        
         &:hover {
            background: ${props.status === 1 ? "#1d4ed8" :  props.className == "active-permission" ? '#eccccc':  props.className == "permi-button" ? '#F8F8F9':props.status === 0 ? '#f44336' : "red"};
            color: ${props.className == "active-permission" ? 'black': props.className == "permi-button" ? 'none': "white"};
            transition: 0.6s;
            border:${props.status === 1 ? '1.5px solid #1d4ed8' :props.className == "active-permission" ? 'none': props.className == "permi-button" ? '0.5px solid black': '1.5px solid #f44336'};
            font-weight:${props?.fontWeight ? props?.fontWeight : 700};
              }`;


    return (
        <CRow sx={{ ...props?.boxSx }}>
            <StyledButton onClick={props?.onClick}>
                {label}
            </StyledButton>
        </CRow>
    );
};

export default FormButton;



