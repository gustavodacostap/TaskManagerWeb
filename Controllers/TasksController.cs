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
    [ValidateAntiForgeryToken]
    public IActionResult Create(TaskItem task)
    {
        if (ModelState.IsValid)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }
        return View(task);
    }

    // GET: Exibe o formulário para editar a tarefa existente
    public IActionResult Edit(int id)
    {
        // Buscar tarefa por id e passar para a View
        var task = _context.Tasks.Find(id);

        if (task == null)
        {
            return NotFound();
        }
        return View(task);
    }

    // POST: Recebe os dados do formulário e atualiza a tarefa
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Edit(TaskItem task)
    {
        if (ModelState.IsValid)
        {
            _context.Tasks.Update(task);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }
        return View(task);
    }

    // GET: Confirma exclusão da tarefa
    public IActionResult Delete(int id)
    {
        var task = _context.Tasks.Find(id);

        if (task == null)
        {
            return NotFound();
        }
        return View(task);
    }

    // POST: Executa exclusão da tarefa
    [HttpPost, ActionName("Delete")]
    public IActionResult DeleteConfirmed(int id)
    {
        var task = _context.Tasks.Find(id);
        if (task == null)
        {
            return NotFound();
        }

        _context.Tasks.Remove(task);
        _context.SaveChanges();

        return RedirectToAction("Index");
    }

    // POST: Marca a tarefa como concluída
    [HttpPost]
    public IActionResult ToggleComplete(int id)
    {
        var task = _context.Tasks.Find(id);
        if (task == null)
        {
            return NotFound();
        }

        task.IsCompleted = !task.IsCompleted;
        _context.SaveChanges();

        return RedirectToAction("Index");
    }
}