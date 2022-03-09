export const numberToRupiah = bilangan => {
  let separator = '';
  let number_string = bilangan;
  if (typeof bilangan === 'number') {
    number_string = bilangan.toString();
  }
  let sisa = number_string.length % 3,
    rupiah = number_string.substr(0, sisa),
    ribuan = number_string.substr(sisa).match(/\d{3}/g);

  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  return rupiah;
};

export const getToday = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return (today = yyyy + '-' + mm + '-' + dd);
};

export const addDate = (date, number) => {
  const currentDate = new Date(date);
  let newDate = new Date();
  newDate.setDate(currentDate.getDate() + number);

  let dd = newDate.getDate();
  let mm = newDate.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  const yyyy = newDate.getFullYear();
  console.log(dd, mm, yyyy, number);
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  return yyyy + '-' + mm + '-' + dd;
};

export const generatePaymentCode = () => {
  return Math.floor(100 * 1000 * 1000 + Math.random() * 100 * 1000 * 1000);
};
export const generateBookingCode = (vehicleName = 'VHC') => {
  const randomNumber = Math.floor(100 * 1000 + Math.random() * 100 * 1000);
  const vocal = ['a', 'i', 'u', 'e', 'o'];
  let codeStart = vehicleName[0];
  for (let i = 1; i < vehicleName.length; i++) {
    let isVocal = false;
    const str = vehicleName[i];
    vocal.forEach(element => {
      if (element === str.toLowerCase()) {
        isVocal = true;
      }
    });
    if (!isVocal) {
      codeStart += str.toUpperCase();
    }
    if (codeStart.length === 3) {
      break;
    }
  }
  return codeStart + randomNumber;
};
