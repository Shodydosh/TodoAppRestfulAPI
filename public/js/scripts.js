//! Chức năng
//! 1. Hiển thị màu, trạng thái công việc dựa trên data lấy được từ database
//! 2. Thêm công việc + loại công việc 
//! 3. Xóa công việc
//! 4. Thay đổi trạng thái công việc

// SIDENAV OPEN&CLOSE
function openNav() {
    // mySidenav.style.display = "block";
    document.getElementById("mySidenav").style.width = "100%";
}

/* Set the width of the mySidenav to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}

// OVERLAY ADDING BUTTON
function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

// ADD BUTTON
const newTaskAddingButton = document.querySelector('.add-btn');

// Toast msg
const toastAdd = document.querySelector('.toast')
const closeAddToastBtn = document.querySelector('.close')

const toastDelete = document.querySelector('.toast-delete')
const closeDeleteToastBtn = document.querySelector('.delete-close')


function toastDeleteMsg() {
    console.log('toastDelete');
    toastDelete.classList.add('active');

    setTimeout(() => {
        toastDelete.classList.remove('active');
    }, 3000)

    closeDeleteToastBtn.addEventListener('click', () => {
        toastDelete.classList.remove('active');
    })
}

function toastAddMsg() {
    console.log('toastAdd');
    toastAdd.classList.add('active');

    setTimeout(() => {
        toastAdd.classList.remove('active');
    }, 3000)

    closeAddToastBtn.addEventListener('click', () => {
        toastAdd.classList.remove('active');
    })
}

newTaskAddingButton.addEventListener('click', () => {
    toastAddMsg();
})

//! Truy cập 
let btnAddTask = document.getElementById("add-btn")
let todoInputEl = document.getElementById("text-input");
// let todoListEl = document.querySelector(".tasks")

//! Process bar
let PTAmount = document.getElementById("PTnum");
let BTAmount = document.getElementById("BTnum");
let PTtip = document.querySelector(".PTtooltip");
let BTtip = document.querySelector(".BTtooltip");

let getTaskTypeData = async () => {
    let res = await fetch('./taskTypeData');
    const text = await res.text();
    let businessTasks = JSON.parse(text).BTtask;
    let personalTasks = JSON.parse(text).PTtask;
    let completeBTtask = JSON.parse(text).BTtaskCompleted;
    let completePTtask = JSON.parse(text).PTtaskCompleted;

    //* SET THE AMOUNT OF TASKS
    if (PTAmount) PTAmount.innerText = personalTasks;
    if (BTAmount) BTAmount.innerText = businessTasks;

    //* CALCULATE THE PERCENTAGE OF DONE TASKS
    let BTpercent = (businessTasks != 0) ? (completeBTtask / businessTasks) : 1;
    let PTpercent = (personalTasks != 0) ? (completePTtask / personalTasks) : 1;

    var BTprocess = document.querySelector(".BT-process-per");
    if (BTprocess) BTprocess.style.maxWidth = BTpercent * 100 + "%";
    var PTprocess = document.querySelector(".PT-process-per");
    if (PTprocess) PTprocess.style.maxWidth = PTpercent * 100 + "%";

    if (PTtip) PTtip.innerText = Math.round(PTpercent * 100) + "%";
    if (BTtip) BTtip.innerText = Math.round(BTpercent * 100) + "%";
}

getTaskTypeData();

function validateForm() {
    var type = document.forms["myForm"]["type"].value;
    var title = document.forms["myForm"]["title"].value;

    if (type == "hide") {
        alert('Hãy chọn loại công việc')
        return false;
    }

    if (title == "") {
        alert("Tiêu đề công việc không được để trống");
        return false;
    };
}
