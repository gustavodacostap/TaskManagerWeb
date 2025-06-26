# ✅ TaskManagerWeb

**TaskManagerWeb** é um sistema web para gerenciamento de tarefas, desenvolvido com **ASP.NET Core**, que evolui de um modelo tradicional MVC para uma **SPA (Single Page Application)** moderna com **API REST**, **AJAX** e **JavaScript modularizado**.

---

## 📌 Funcionalidades

- ✅ Listar tarefas
- ➕ Criar novas tarefas (com formulário dinâmico)
- ✏️ Editar tarefas existentes (inline, sem recarregar)
- ☑️ Marcar tarefas como concluídas
- ❌ Remover tarefas
- 🧩 Apenas um formulário de edição ou criação pode estar aberto por vez
- 💾 Persistência com banco de dados SQLite
- ⚡ Atualizações dinâmicas via AJAX
- ✅ Validação client-side com jQuery Validation

---

## 🧱 Arquitetura do Projeto

O projeto foi estruturado em **etapas progressivas de aprendizado**:

1. 🔹 Início com **ASP.NET Core MVC** + **Razor Pages**
2. 🔹 Integração com **Entity Framework Core** e banco de dados **SQLite**
3. 🔹 Evolução para arquitetura **SPA**, com:
   - API REST utilizando `ApiController`
   - Requisições assíncronas com **AJAX (jQuery)**
   - Interface dinâmica que **não recarrega a página**
   - **JavaScript modularizado** com ES Modules (`import/export`)
4. 🔹 Validações client-side integradas com **jQuery Validation** e data annotations

---

## 🛠️ Tecnologias Utilizadas

- 💻 ASP.NET Core 9 (MVC + API Controller)
- 🧩 Entity Framework Core
- 🗃️ SQLite
- 🧠 C#
- 🖥️ Razor Pages
- 🔄 AJAX com jQuery (ES Modules + código modular)
- 📦 ES Modules (`import` / `export`)
- 🧪 jQuery Validation
- 🎨 Bootstrap 5

---

## 🚀 Como rodar o projeto localmente

### ⚙️ Pré-requisitos

- [.NET SDK 9+](https://dotnet.microsoft.com/download)
- Editor de código como [Visual Studio Code](https://code.visualstudio.com/) ou [Visual Studio](https://visualstudio.microsoft.com/)

### 🧾 Passos:

```bash
# Clone o repositório
git clone https://github.com/gustavodacostap/TaskManagerWeb.git
cd TaskManagerWeb

# Restaura as dependências
dotnet restore

# Instala a ferramenta de migrations, se necessário
dotnet tool install --global dotnet-ef

# Aplica as migrations e cria o banco de dados local SQLite
dotnet ef database update

# Executa o projeto
dotnet run
```