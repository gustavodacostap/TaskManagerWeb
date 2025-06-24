using Microsoft.AspNetCore.Mvc;
using TaskManagerWeb.Models;
using TaskManagerWeb.Data;

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
    public IActionResult UpdateTask(int id, TaskItem task)
    {
        var existing = _context.Tasks.Find(id);
        if (existing == null)
            return NotFound();

        existing.Description = task.Description;
        existing.IsCompleted = task.IsCompleted;

        _context.SaveChanges();

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