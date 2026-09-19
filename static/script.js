const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");

async function loadTasks() {
  const res = await fetch("/tasks");
  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  list.innerHTML = "";
  if (tasks.length === 0) {
    list.innerHTML = `<li class="empty">The queue is empty. Add your first task.</li>`;
  }
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " done" : "");
    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""} data-id="${task.id}">
      <span class="task-title"></span>
      <button class="delete-btn" data-id="${task.id}">✕</button>
    `;
    li.querySelector(".task-title").textContent = task.title;
    list.appendChild(li);
  });
  const done = tasks.filter(t => t.done).length;
  counter.textContent = `${done} / ${tasks.length} done`;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  input.value = "";
  loadTasks();
});

list.addEventListener("change", async (e) => {
  if (e.target.matches('input[type="checkbox"]')) {
    const id = e.target.dataset.id;
    await fetch(`/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: e.target.checked })
    });
    loadTasks();
  }
});

list.addEventListener("click", async (e) => {
  if (e.target.matches(".delete-btn")) {
    const id = e.target.dataset.id;
    await fetch(`/tasks/${id}`, { method: "DELETE" });
    loadTasks();
  }
});

function spawnBubbles() {
  const container = document.getElementById("bubbles");
  for (let i = 0; i < 18; i++) {
    const b = document.createElement("div");
    b.className = "bubble";
    const size = 4 + Math.random() * 10;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${Math.random() * 100}%`;
    b.style.animationDuration = `${8 + Math.random() * 12}s`;
    b.style.animationDelay = `${Math.random() * 12}s`;
    container.appendChild(b);
  }
}

spawnBubbles();
loadTasks();