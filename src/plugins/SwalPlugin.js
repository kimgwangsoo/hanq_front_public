import Swal from 'sweetalert2'

export default {
  install: (app) => {
    app.config.globalProperties.$swalLoading = () => {
      Swal.fire({
        allowOutsideClick: false,
        showConfirmButton: false,
        width: '110px',
        padding: '15px',
        background: '#fff',
        backdrop: 'rgba(255, 255, 255, 0)'
      });
      Swal.showLoading();
    };

    app.config.globalProperties.$swalClose = () => {
      Swal.close();
    };

    app.config.globalProperties.$swal = Swal;
  }
}