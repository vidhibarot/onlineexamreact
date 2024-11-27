import Swal from 'sweetalert2';

export const ConformationAlert = (msg) => {
    return Swal.fire({
        title: msg.title,
        text: msg.text,
        icon: msg.icon,
        showCancelButton: msg.showCancelButton,
        confirmButtonColor: msg.confirmButtonColor,
        cancelButtonColor: msg.cancelButtonColor,
        confirmButtonText: msg.confirmButtonText,
        denyButtonText: msg.denyButtonText,
    });
}


