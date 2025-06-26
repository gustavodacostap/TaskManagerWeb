// Estado compartilhado que representa o modo atual do formulário (create ou edit)
// e a função que deve ser chamada para restaurar a interface original

export const formState = {
    type: null, // null | "create" | "edit"
    reset: () => {} // Função que será executada para reverter a interface
};
