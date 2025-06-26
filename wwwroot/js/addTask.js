import { formState } from "./formState.js";
import { loadTasks } from "./taskList.js";

// Função principal responsável por configurar o botão "+ Nova Tarefa" e o formulário de criação
export function initAddTaskForm() {
    const addTaskContainer = document.getElementById("add-task-container");

    // Função que restaura o botão "+ Nova Tarefa" após cancelar ou adicionar uma tarefa
    function restoreAddButton() {
        addTaskContainer.innerHTML = '<button id="btn-show-form" class="btn btn-primary">+ Nova Tarefa</button>';
        initAddTaskForm();
        formState.type = null;
        formState.reset = () => { };
    }

    const showFormBtn = document.getElementById("btn-show-form");
    if (!showFormBtn) return;

    showFormBtn.addEventListener("click", function () {
        // Se estiver em modo edição, reseta o formulário atual antes de abrir o de criação
        if (formState.type === "edit" && typeof formState.reset === "function") {
            formState.reset();
        }

        // Define que o tipo atual do formulário é "create"
        formState.type = "create";
        formState.reset = restoreAddButton;

        // Define o HTML do formulário de criação
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

        // Insere o formulário na interface
        addTaskContainer.innerHTML = formHtml;
        // Ativa a validação com jQuery Unobtrusive Validation
        $.validator.unobtrusive.parse("#create-form");

        // Evento de clique no botão "Cancelar"
        document.getElementById("btn-cancel").addEventListener("click", function () {
            restoreAddButton(); // Volta para o botão "+ Nova Tarefa"
        });

        // Evento de clique no botão "Adicionar"
        document.getElementById("btn-add-task").addEventListener("click", async function () {
            const form = document.getElementById("create-form");

            // Se o formulário for inválido, interrompe a execução
            if (!$(form).valid()) return;

            // Pega o valor do input
            const description = document.getElementById("new-task-desc").value;

            // Envia a nova tarefa para o backend via API
            await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description, isCompleted: false })
            });

            // Recarrega a lista de tarefas e volta para o botão inicial
            loadTasks();
            restoreAddButton();
        });
    });
}