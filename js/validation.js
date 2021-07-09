const getEle = (id) => document.getElementById(id);

export default class Validation {
  kiemTraRong =  (input, divId, mess) => {
    if (input.trim() === "") {
      
      getEle(divId).innerHTML = mess;
      getEle(divId).className = "alert alert-danger";
      return false;
    } else {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
  };
  kiemTraMaSVTrung =  (input, divId, mess, arr) => {
    var status = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].active === input) {
        status = false;
        break;
      }
    }

    if (status) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }
    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
  kiemTraKyTuChuoi = function (input, divId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (input.match(letter)) {
      getEle(divId).innerHTML = "";
      getEle(divId).className = "";
      return true;
    }

    getEle(divId).innerHTML = mess;
    getEle(divId).className = "alert alert-danger";
    return false;
  };
}
