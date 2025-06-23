using System.ComponentModel.DataAnnotations;

namespace TaskManagerWeb.Models;

public class TaskItem
{
    public int Id { get; set; }
    [Required(ErrorMessage = "A descrição é obrigatória")]
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; } = false;
}
