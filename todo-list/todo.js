let tasks = JSON.parse(localStorage.getItem('tasks')) || []

const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')

function renderTasks() {
    taskList.innerHTML = ''
    tasks.forEach((task, index) => {
        const li = document.createElement('li')
        li.className = 'flex items-start justify-between gap-x-1 p-2 bg-gray-50 shadow rounded'
        if (task.completed) {
            li.classList.add('line-through', 'text-gray-500')
        }
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleComplete(${index})" class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="removeTask(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
            </div>
        `
        taskList.appendChild(li)
    })
}

function addTask() {
    const text = taskInput.value.trim()
    if (text) {
        tasks.push({ text, completed: false })
        taskInput.value = ''
        saveTasks()
        renderTasks()
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed
    saveTasks()
    renderTasks()
}

function removeTask(index) {
    tasks.splice(index, 1)
    saveTasks()
    renderTasks()
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

addBtn.addEventListener('click', addTask)
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask()
})

renderTasks()
