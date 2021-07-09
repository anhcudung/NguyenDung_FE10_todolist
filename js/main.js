import Active from "./active.js";
import ListApi from "./activenews.js";
import Validation from "./validation.js";
let crr = [];

// const arr = [];

const validation = new Validation();

const listApi = new ListApi();

const getEle = (id) => document.getElementById(id);

const renderTable = (arr) => {
  return arr.reduce((contentHTML, item) => {
    return (contentHTML += `
            <li>
                
                <span><input type="checkbox" onclick="checkbox(${item.id})" id="checkbox"></input></span>
                
                <span class="loading" id="loading(${item.id})">
                    <span class="loader" id="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </span>
                
                <span>${item.active}</span> 

                <span>
                    <button class="btn btn-danger" onclick="btnDelete(${item.id})">Delete</button>
                    <span><i class="far fa-edit"></i></span>
                </span>
            </li>
    
            `);
  }, "");
};

const fetchData = () => {
  listApi
    .getActiveApi()
    .then((result) => {
      let todo = [];
      let complete = [];
      crr = result.data;

      result.data.forEach((active) => {
        if (active.check === false) {
          todo.push(active);
        } else {
          complete.push(active);
        }
      });

      getEle("todo").innerHTML = renderTable(todo);
      // console.log(result.data)
      getEle("completed").innerHTML = renderTable(complete);
      // getEle("newtask").innerHTML = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

fetchData();

getEle("addItem").addEventListener("click", () => {
  addActive();
});

//thêm mới.

const addActive = () => {
  const active = getEle("newTask").value;
  const actives = new Active("", active, false);
  let isValid = true;
  isValid &=
    validation.kiemTraKyTuChuoi(active, "errTask", "chỉ viết chữ") &&
    validation.kiemTraMaSVTrung(active, "errTask", "đã trùng", crr) &&
    validation.kiemTraRong(active, "errTask", "ko duoc rong");

  if (isValid) {
    listApi
      .addActiveApi(actives)
      .then((result) => {
        alert("add Success");
        fetchData();

        // getEle("load").disabled = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

window.addActive = addActive;

//btn cập nhật
////

///
const btnDelete = (id) => {
  listApi
    .deleteActiveApi(id)
    .then((result) => {
      alert("delete success");
      fetchData();
      //   getEle("load").disabled = true;
    })
    .catch((err) => {
      console.log(err);
    });
};

window.btnDelete = btnDelete;

//uncheck.
// const unComplete = (id, content) => {
//   // getEle(`success${id}`).style.display="none";
//   // getEle(`complete-circle${id}`).style.display="flex";
//   // getEle(`contentTask${id}`).style.textDecorationLine = "none";
//   // getEle(`contentTask${id}`).style.color="#000";

//   listApi
//     .getActiveApi(id)
//     .then((result) => {
//       let isCheck = true;
//       if (isCheck === result.data.check) {
//         isCheck = false;
//       }
//       const active = new Active(id, content, isCheck);
//       listApi
//         .u(tasks)
//         .then(() => {
//           fetchData();
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// window.unComplete = unComplete;

///
const checkbox = (id, active) => {
  getEle(`loading(${id})`).style.display = "block";

  listApi
    .getActiveById(id)
    .then((result) => {
      let check = false;
      if (check === result.data.check) {
        check = true;
      }
      const actives = new Active(id, active, check);
      listApi
        .updateActive(actives)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
window.checkbox = checkbox;

//sap xep A=>Z

getEle("two").addEventListener("click", () => {
  listApi.getActiveApi().then((rs) => {
    let brr = [];
    rs.data.sort(function (a, b) {
      // console.log(a.active)
      // console.log(b.active)
      let x = a.active.toLowerCase();
      let y = b.active.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }

      return 0;
    });
    brr = rs.data;
    console.log(brr);

    getEle("todo").innerHTML = renderTable(brr);
    console.log(rs.data);
  });
});

//sắp xếp theo chiều ngược lại.

getEle("three").addEventListener("click", () => {
  listApi.getActiveApi().then((rs) => {
    let brr = [];

    rs.data.sort(function (a, b) {
      let x = a.active.toLowerCase();
      let y = b.active.toLowerCase();
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }

      return 0;
    });

    brr = rs.data;
    getEle("todo").innerHTML = renderTable(brr);

    console.log(rs.data);
  });
});
