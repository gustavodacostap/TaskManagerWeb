import { initAddTaskForm } from "./addTask.js";
import { loadTasks } from "./taskList.js";

document.addEventListener("DOMContentLoaded", () => {
  initAddTaskForm(); // Ativa o botão "+ Nova Tarefa" e prepara o formulário de criação
  loadTasks(); // Carrega as tarefas existentes do backend e exibe na interface
});