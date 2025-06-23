using Microsoft.AspNetCore.Mvc;
using TaskManagerWeb.Models;
using TaskManagerWeb.Data;

namespace TaskManagerWeb.Controllers;

public class TasksController : Controller
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var tasks = _context.Tasks.ToList();
        return View(tasks);
    }

    // GET: Exibe o formulário para criar nova tarefa
    public IActionResult Create()
    {   
        return View();
    }

    // POST: Recebe os dados do formulário e cria a tarefa
    [HttpPost]
    public IActionResult Create(TaskItem task)
    {
        if (ModelState.IsValid)
        {
            // Salvar no banco
            return RedirectToAction("Index");
        }
        return View(task);
    }

    // GET: Exibe o formulário para editar a tarefa existente
    public IActionResult Edit(int id)
    {
        // Buscar tarefa por id e passar para a View
        return View();
    }

    // POST: Recebe os dados do formulário e atualiza a tarefa
    [HttpPost]
    public IActionResult Edit(TaskItem task)
    {
        if (ModelState.IsValid)
        {
            // Atualizar no banco
            return RedirectToAction("Index");
        }
        return View(task);
    }

    // GET: Confirma exclusão da tarefa
    public IActionResult Delete(int id)
    {
        // Buscar tarefa por id para confirmar
        return View();
    }

    // POST: Executa exclusão da tarefa
    [HttpPost, ActionName("Delete")]
    public IActionResult DeleteConfirmed(int id)
    {
        // Remover do banco
        return RedirectToAction("Index");
    }
}