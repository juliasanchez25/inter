using System.ComponentModel.DataAnnotations.Schema;

namespace InterApi.Models
{
  public class NotificationModel
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public required string Message { get; set; }

    public required string Title { get; set; }

    public required bool IsRead { get; set; }
    public required DateTime CreatedAt { get; set; }
  }
}
