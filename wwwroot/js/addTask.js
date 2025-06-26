document.addEventListener("DOMContentLoaded", function () {
    const addTaskContainer = document.getElementById("add-task-container");

    function attachShowFormHandler() {
        const showFormBtn = document.getElementById("btn-show-form");
        if (!showFormBtn) return;

        showFormBtn.addEventListener("click", function () {
            
            const formHtml = `
                <form id="create-form" class="w-100">
                    <div id="task-form" class="card p-3">
                        <input type="text" id="new-task-desc" name="Description" class="form-control"
                            placeholder="Descrição da tarefa" data-val="true" data-val-required="A descrição é obrigatória." />
                        <span class="text-danger field-validation-valid mt-2" data-valmsg-for="Description" data-valmsg-replace="true"></span>
                        <div class="d-flex justify-content-end gap-2 mt-3">
                            <button id="btn-cancel" type="button" class="btn btn-secondary">Cancelar</button>
                            <button id="btn-add-task" type="button" class="btn btn-primary">Adicionar</button>
                        </div>
                    </div>
                </form>
            `;

            addTaskContainer.innerHTML = formHtml;
            
            $.validator.unobtrusive.parse("#create-form");

            document.getElementById("btn-cancel").addEventListener("click", function () {
                restoreAddButton();
            });

            document.getElementById("btn-add-task").addEventListener("click", async function () {
                const form = document.getElementById("create-form");

                if (!$(form).valid()) {
                    return;
                }

                const description = document.getElementById("new-task-desc").value;

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