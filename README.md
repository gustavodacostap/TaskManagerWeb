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

1. Clone o repositório:

```bash
git clone https://github.com/gustavodacostap/TaskManagerWeb.git
cd TaskManagerWeb
```

2. Restaure os pacotes:

```bash
dotnet restore
```

3. (Se for a primeira vez) Crie o banco de dados:

```bash
dotnet ef database update
```

4. Execute o projeto:

```bash
dotnet run
```

5. Acesse no navegador:

```bash
http://localhost:xxxx
```

## 🧠 Sobre o Projeto

Esse projeto foi criado como exercício de aprendizado prático sobre desenvolvimento web com ASP.NET Core, MVC, Entity Framework Core e banco de dados local com SQLite.
