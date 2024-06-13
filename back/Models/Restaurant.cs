using System.ComponentModel.DataAnnotations.Schema;

namespace InterApi.Models
{
  public class RestaurantModel
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int? Capacity { get; set; }
    public string[]? DaysOpen { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Website { get; set; }
    public string? WorkingHours { get; set; }
  }
}
