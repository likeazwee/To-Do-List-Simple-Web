const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Anda harus menulis sesuatu!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let iconsContainer = document.createElement("div");
    iconsContainer.className = "task-icons";
    
    let editSpan = document.createElement("span");
    editSpan.className = "edit-container";
    editSpan.innerHTML = '<img src="editing.png" alt="Edit" class="edit-icon">';
    iconsContainer.appendChild(editSpan);
    
    let deleteSpan = document.createElement("span");
    deleteSpan.className = "delete-container";
    deleteSpan.innerHTML = '<img src="recyclebin.png" alt="Delete" class="delete-icon">';
    iconsContainer.appendChild(deleteSpan);
    
    li.appendChild(iconsContainer);
    li.appendChild(editSpan);
    li.appendChild(deleteSpan);

    listContainer.appendChild(li);
    inputBox.value = "";

    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains('delete-icon') || e.target.parentElement.classList.contains('delete-icon')) {
        const taskItem = e.target.closest('li');
        if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
            taskItem.remove();
            saveData();
        }
    } else if (e.target.classList.contains('edit-icon') || e.target.parentElement.classList.contains('edit-icon')) {
        const taskItem = e.target.closest('li');
        const taskText = taskItem.firstChild.textContent;
        const newText = prompt("Edit task:", taskText);
        if (newText && newText.trim() !== "") {
            taskItem.firstChild.textContent = newText;
            saveData();
        }
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

showTask();
