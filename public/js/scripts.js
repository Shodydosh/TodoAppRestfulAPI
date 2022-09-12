// //! Chức năng
// //! 1. Thêm công việc + loại công việc 
// //! 2. Xóa công việc
// //! 3. Thay đổi trạng thái công việc

// SIDENAV OPEN&CLOSE



let todos;

console.log("scripts.js is now available".bgYellow);

function openNav() {
    // mySidenav.style.display = "block";
    document.getElementById("mySidenav").style.width = "100%";
}

/* Set the width of the mySidenav to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}

//
// OVERLAY ADDING BUTTON

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

// Toast msg
const toastAdd = document.querySelector('.toast')
const closeAddToastBtn = document.querySelector('.close')

const toastDelete = document.querySelector('.toast-delete')
const closeDeleteToastBtn = document.querySelector('.delete-close')

function toastDeleteMsg() {
    toastDelete.classList.add('active');

    setTimeout(() => {
        toastDelete.classList.remove('active');
    }, 3000)

    closeDeleteToastBtn.addEventListener('click', () => {
        toastDelete.classList.remove('active');
    })
}

function toastAddMsg() {
    toastAdd.classList.add('active');

    setTimeout(() => {
        toastAdd.classList.remove('active');
    }, 3000)

    closeAddToastBtn.addEventListener('click', () => {
        toastAdd.classList.remove('active');
    })
}


// //! Truy cập 
let btnAddTask = document.getElementById("add-btn")
let todoInputEl = document.getElementById("text-input");
// let todoListEl = document.querySelector(".tasks")

// //! Process bar
let PTAmount = document.getElementById("PTnum");
let BTAmount = document.getElementById("BTnum");
let PTtip = document.querySelector(".PTtooltip");
let BTtip = document.querySelector(".BTtooltip");

// // API lấy danh sách công việc
let getTodos = async () => {
    try {
        let res = getAllTask();
        todos = res.data;
        console.log(todos);

        // renderTasks(todos);
    } catch (error) {
        console.log(error);
    }
}

getTodos();

const renderTasks = arr => {

    // count amount of task of each type
    let personalTasks = 0, completePT = 0;
    let businessTasks = 0, completeBT = 0;
    if (arr.length != 0) {
        arr.forEach(task => {
            if (task.type == "business") {
                businessTasks += 1;
                if (task.status == true) completeBT++;
            }
            else {
                personalTasks += 1;
                if (task.status == true) completePT++;
            }
        });
    }
    let BTpercent = 0, PTpercent = 0;

    BTpercent = (businessTasks != 0) ? (completeBT / businessTasks) : 1;
    PTpercent = (personalTasks != 0) ? (completePT / personalTasks) : 1;

    // console.log(BTpercent + " " + PTpercent);

    var BTprocess = document.querySelector(".BT-process-per");
    BTprocess.style.maxWidth = BTpercent * 100 + "%";
    var PTprocess = document.querySelector(".PT-process-per");
    PTprocess.style.maxWidth = PTpercent * 100 + "%";

    PTAmount.innerText = personalTasks;
    BTAmount.innerText = businessTasks;
    PTtip.innerText = Math.round(PTpercent * 100) + "%";
    BTtip.innerText = Math.round(BTpercent * 100) + "%";

    todoListEl.innerHTML = "";

    // Kiểm tra danh sách công việc có trống hay không
    if (arr.length == 0) {
        todoListEl.innerHTML = `<p class="todos-empty">Không có công việc nào trong danh sách</p>`;
        return;
    }

    // hien thi danh sach
    let content = "";
    arr.forEach(task => {
        content += `
                    <div alt="You created this task at ${task.time}" class="taskItem ${task.status ? "active-task" : ""} ${task.type == "personal" ? "PT-task" : "BT-task"}">
                        <div class="task-content" id="task-line">
                            <input 
                                class = "check-btn"
                                type="checkbox" ${task.status ? "checked" : ""}
                                onclick="toggleStatus(${task.id})"
                            />
                            ${task.title}
                        </div>
                        <div class="actions">
                            <div>
                                <button class="delete-btn ${task.type == "personal" ? "PT-delete-btn" : "BT-delete-btn"}" onclick="deleteTask(${task.id})">
                                    <i class="fas fa-xmark">&times</i>
                                </button>
                            </div>
                        </div>
                    </div>
            `
    }
    )

    todoListEl.innerHTML = content;
}

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
