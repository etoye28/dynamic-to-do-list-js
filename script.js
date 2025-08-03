// Run when the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from localStorage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save tasks to localStorage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add a new task to the list
    function addTask(taskText, save = true) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        // Remove task from UI and localStorage
        removeButton.onclick = function () {
            taskList.removeChild(li);

            // Remove from localStorage
            let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            storedTasks = storedTasks.filter(task => task !== taskText);
            saveTasksToLocalStorage(storedTasks);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to localStorage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            storedTasks.push(taskText);
            saveTasksToLocalStorage(storedTasks);
        }
    }

    // Handle Add button click
    addButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        addTask(taskText);
        taskInput.value = "";
    });

    // Handle Enter key press
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim();

            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }

            addTask(taskText);
            taskInput.value = "";
        }
    });

    // Load tasks on page load
    loadTasks();
});

