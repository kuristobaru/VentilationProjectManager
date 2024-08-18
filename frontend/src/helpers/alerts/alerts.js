import sw2 from 'sweetalert2'

export const simpleSuccessAlert = (titleAlert, message) => {
  sw2.fire({
    title: titleAlert,
    text: message,
    icon: 'success',
    showConfirmButton: false,
    timer: 2000,
  })
}
export const simpleErrorAlert = (titleAlert, message) => {
  sw2.fire({
    title: titleAlert,
    text: message,
    icon: 'error',
    showConfirmButton: false,
    timer: 2000,
  })
}
