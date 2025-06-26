using Microsoft.AspNetCore.Mvc;
using TaskManagerWeb.Models;
using TaskManagerWeb.Data;
using System.Text.Json;

namespace TaskManagerWeb.Controllers;

[ApiController]
[Route("api/tasks")]
public class TasksApiController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksApiController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/tasks
    [HttpGet]
    public IActionResult GetTasks()
    {
        var tasks = _context.Tasks.ToList();
        return Ok(tasks);
    }

    // GET /api/tasks/{id}
    [HttpGet("{id}")] 
    public IActionResult GetTask(int id)
    {
        var task = _context.Tasks.Find(id);
        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    // POST /api/tasks
    [HttpPost]
    public IActionResult CreateTask([FromBody] TaskItem task)
    {
        if (ModelState.IsValid)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        return BadRequest(ModelState);
    }

    // PUT /api/tasks/{id}
    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, [FromBody] TaskItem task)
    {
        var existing = _context.Tasks.Find(id);
        if (existing == null)
            return NotFound();

        existing.Description = task.Description;
        existing.IsCompleted = task.IsCompleted;

        _context.SaveChanges();

        return Ok(existing);
    }

    // PATCH /api/tasks/{id}
    [HttpPatch("{id}")]
    public IActionResult UpdateTaskStatus(int id, [FromBody] JsonElement data)
    {
        var task = _context.Tasks.Find(id);
        if (task == null) return NotFound();

        if (data.TryGetProperty("isCompleted", out var isCompleted))
        {
            task.IsCompleted = isCompleted.GetBoolean();
            _context.SaveChanges();
        }

        return NoContent();
    }

    // DELETE /api/tasks/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var task = _context.Tasks.Find(id);
        if (task == null)
        {
            return NotFound();
        }

        _context.Tasks.Remove(task);
        _context.SaveChanges();
        return NoContent();
    }

}