import swal from "sweetalert2";

export const swalSuccess = (title, text) => {
  swal.fire({
    position: "top-end",
    title,
    text,
    icon: "success",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    toast: true,
    customClass: {
      timerProgressBar: "bg-green-500",
    },
  });
};

export const swalError = (title, text) => {
  swal.fire({
    position: "top-end",
    title,
    text,
    icon: "error",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    toast: true,
    customClass: {
      timerProgressBar: "bg-red-500",
    },
  });
};

export const swalWarning = (title, text) => {
  swal.fire({
    position: "top-end",
    title,
    text,
    icon: "warning",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    toast: true,
    customClass: {
      timerProgressBar: "bg-orange-500",
    },
  });
};
