let tasks = []

document.getElementById("date").innerText = new Date().toDateString()

function addTask() {
  let text = document.getElementById("taskInput").value
  let time = document.getElementById("timeInput").value

  if (text === "") return

  let task = {
    text: text,
    time: time,
    done: false
  }

  tasks.push(task)
  saveTasks()
  showTasks()

  document.getElementById("taskInput").value = ""
  document.getElementById("timeInput").value = ""
}

function showTasks() {
  let list = document.getElementById("tasklist")
  let empty = document.getElementById("empty")
  let fill = document.getElementById("progressfill")

  list.innerHTML = ""
  let doneCount = 0

  if (tasks.length === 0) {
    empty.innerText = "No tasks yet 🌿 Start small. Stay focused."
  } else {
    empty.innerText = ""
  }

  tasks.forEach((task, i) => {
    let li = document.createElement("li")

    let span = document.createElement("span")
    span.className = "task-text"
    span.innerText = task.text + (task.time ? " - " + task.time : "")

    if (task.done) {
      span.classList.add("completed")
      doneCount++
    }

    span.onclick = () => toggleTask(i)

    let del = document.createElement("button")
    del.innerText = "x"
    del.className = "delete-btn"
    del.onclick = () => deleteTask(i)

    li.appendChild(span)
    li.appendChild(del)

    list.appendChild(li)
  })

  document.getElementById("progress").innerText =
    `You’ve completed ${doneCount} of ${tasks.length} tasks today 🌱`

  fill.style.width =
    tasks.length === 0 ? "0%" : (doneCount / tasks.length) * 100 + "%"
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done
  saveTasks()
  showTasks()
}

function deleteTask(i) {
  tasks.splice(i, 1)
  saveTasks()
  showTasks()
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks() {
  let data = localStorage.getItem("tasks")
  if (data) {
    tasks = JSON.parse(data)
  }
  showTasks()
}

loadTasks()

let toggle = document.getElementById("toggle")
toggle.onclick = () => {
  document.documentElement.classList.toggle("dark")
}