document.addEventListener("DOMContentLoaded", () => loadTasks());

let taskToDelete = null;

function loadTasks() {
  fetch("/api/tasks")
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao buscar tarefas");
      return res.json();
    })
    .then((tasks) => renderTasks(tasks))
    .catch((err) => {
      console.error(err);
      document.getElementById(
        "tasks-container"
      ).innerHTML = `<div class="alert alert-danger">Erro ao carregar tarefas.</div>`;
    });
}

function renderTaskItem(task) {
  const li = document.createElement("li");
  li.className =
    "task-item p-2 d-flex align-items-center justify-content-between position-relative";
  li.dataset.taskId = task.id;

  li.innerHTML = `
    <div class="form-check d-flex align-items-center gap-2" style="min-height: 38px;">
      <input class="form-check-input mt-0 rounded-circle" type="checkbox"
        id="task-${task.id}" ${task.isCompleted ? "checked" : ""}>
      <label class="form-check-label ${task.isCompleted ? "text-decoration-line-through" : ""
    }"
        for="task-${task.id}">${task.description}</label>
    </div>
    <div class="d-none d-md-flex gap-2 position-absolute end-0 me-3">
      <button class="btn btn-sm btn-outline-primary btn-edit" title="Editar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
        </svg>
      </button>
      <button class="btn btn-sm btn-outline-danger btn-delete" title="Excluir">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
        </svg>
      </button>
    </div>
  `;

  li.querySelector(".btn-edit").addEventListener("click", () =>
    enterEditMode(li, task)
  );
  setupDeleteButton(li, task);
  li.querySelector("input[type='checkbox']").addEventListener("change", (e) => {
    const checked = e.target.checked;

    li.querySelector("label").classList.toggle(
      "text-decoration-line-through",
      checked
    );

    toggleTaskCompletion(task.id, checked);
  });
  return li;
}

function renderTasks(tasks) {
  const container = document.getElementById("tasks-container");
  container.innerHTML = "";

  if (tasks.length === 0) {
    container.innerHTML = `<div class="alert alert-info text-center">Nenhuma tarefa cadastrada.</div>`;
    return;
  }

  const ul = document.createElement("ul");
  ul.id = "task-list";
  ul.className = "list-unstyled task-list";

  tasks.forEach((task) => ul.appendChild(renderTaskItem(task)));
  container.appendChild(ul);
}

function enterEditMode(li, task) {
  li.innerHTML = `
    <form id="edit-form" class="w-100">
      <div class="card p-3">
        <input type="text" name="Description" class="form-control edit-input"
          value="${task.description}" placeholder="Descrição da tarefa" data-val="true" data-val-required="A descrição é obrigatória." />
        <span class="text-danger field-validation-valid mt-2" data-valmsg-for="Description" data-valmsg-replace="true"></span>
        <div class="d-flex justify-content-end gap-2 mt-3">
            <button class="btn btn-secondary btn-cancel-edit">Cancelar</button>
            <button class="btn btn-primary btn-save-edit">Salvar</button>
        </div>
      </div>
    </form>
  `;

  $.validator.unobtrusive.parse("#edit-form");

  li.querySelector(".btn-cancel-edit").addEventListener("click", () => {
    const newLi = renderTaskItem(task);
    li.replaceWith(newLi);
  });

  li.querySelector(".btn-save-edit").addEventListener("click", () => {
    const form = document.getElementById("edit-form");

    if (!$(form).valid()) {
      return;
    }

    const newDesc = li.querySelector(".edit-input").value;

    // Caso a descrição não tenha mudado, volta ao estado original
    if (newDesc === task.description.trim()) {
      const originalLi = renderTaskItem(task);
      li.replaceWith(originalLi);
      return;
    }

    fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: task.id,
        description: newDesc,
        isCompleted: task.isCompleted,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar.");
        return res.json();
      })
      .then((updatedTask) => {
        const newLi = renderTaskItem(updatedTask);
        li.replaceWith(newLi);
      })
      .catch((err) => console.error(err));
  });
}

function setupDeleteButton(li, task) {
  li.querySelector(".btn-delete").addEventListener("click", () => {
    taskToDelete = task;

    document.getElementById("confirmDeleteLabel").textContent =
      "Excluir tarefa?";
    document.getElementById("confirmDeleteBody").innerHTML = `
      A tarefa <strong>${task.description}</strong> será permanentemente excluída.
    `;

    const modal = new bootstrap.Modal(
      document.getElementById("confirmDeleteModal")
    );
    modal.show();
  });
}

document.getElementById("btnConfirmDelete").addEventListener("click", () => {
  if (!taskToDelete) return;

  fetch(`/api/tasks/${taskToDelete.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao excluir tarefa.");
      const li = document.querySelector(
        `li[data-task-id="${taskToDelete.id}"]`
      );
      if (li) li.remove();
      taskToDelete = null;

      const modalElement = document.getElementById("confirmDeleteModal");
      bootstrap.Modal.getInstance(modalElement).hide();
    })
    .catch((err) => console.error(err));
});

function toggleTaskCompletion(taskId, isCompleted) {
  fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isCompleted }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao atualizar tarefa.");
    })
    .catch((err) => console.error(err));
}
