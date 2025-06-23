# ✅ TaskManagerWeb

Sistema web simples para gerenciamento de tarefas, desenvolvido com ASP.NET Core MVC, Entity Framework Core e SQLite.

## 📌 Funcionalidades

- Adicionar tarefas
- Listar tarefas
- Marcar tarefas como concluídas
- Remover tarefas
- Armazenamento com banco de dados SQLite

## 🛠️ Tecnologias utilizadas

- ASP.NET Core MVC
- Entity Framework Core
- SQLite
- C#
- Razor Pages

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- [.NET SDK 8+](https://dotnet.microsoft.com/download)
- Editor de código como [Visual Studio Code](https://code.visualstudio.com/) ou [Visual Studio]

### Passos

```bash
1. Clone o repositório:

git clone https://github.com/seu-usuario/TaskManagerWeb.git
cd TaskManagerWeb
Restaure os pacotes:

dotnet restore
(Se for a primeira vez) Crie o banco de dados:

dotnet ef database update
Execute o projeto:

dotnet run
Acesse no navegador:

http://localhost:xxxx

```

### 🧩 Estrutura do Projeto

```bash
TaskManagerWeb/
│
├── Controllers/       # Controladores MVC
├── Models/            # Modelos de dados
├── Views/             # Páginas .cshtml (Razor)
├── Data/              # DbContext (EF Core)
├── Migrations/        # Histórico do banco de dados
├── wwwroot/           # Arquivos estáticos (CSS, JS)
├── appsettings.json   # Configurações do app
├── Program.cs         # Ponto de entrada do app
└── .gitignore
```

### 🧠 Sobre o Projeto

Esse projeto foi criado como exercício de aprendizado prático sobre desenvolvimento web com ASP.NET Core, MVC, Entity Framework Core e banco de dados local com SQLite.