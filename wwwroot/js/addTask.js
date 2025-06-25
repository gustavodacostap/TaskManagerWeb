document.addEventListener("DOMContentLoaded", function () {
    const addTaskContainer = document.getElementById("add-task-container");

    function attachShowFormHandler() {
        const showFormBtn = document.getElementById("btn-show-form");
        if (!showFormBtn) return;

        showFormBtn.addEventListener("click", function () {
            const formHtml = `
                <div id="task-form" class="card p-3">
                    <input type="text" id="new-task-desc" class="form-control mb-3" placeholder="Descrição da tarefa" />
                    <div class="d-flex justify-content-end gap-2">
                        <button id="btn-cancel" class="btn btn-secondary">Cancelar</button>
                        <button id="btn-add-task" class="btn btn-primary">Adicionar</button>
                    </div>
                </div>
            `;

            addTaskContainer.innerHTML = formHtml;

            document.getElementById("btn-cancel").addEventListener("click", function () {
                restoreAddButton();
            });

            document.getElementById("btn-add-task").addEventListener("click", async function () {
                const description = document.getElementById("new-task-desc").value.trim();
                if (!description) return;

                await fetch("/api/tasks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ description, isCompleted: false })
                });

                loadTasks();

                restoreAddButton();
            });
        });
    }

    function restoreAddButton() {
        addTaskContainer.innerHTML = '<button id="btn-show-form" class="btn btn-primary">+ Nova Tarefa</button>';
        attachShowFormHandler();
    }

    attachShowFormHandler();
});