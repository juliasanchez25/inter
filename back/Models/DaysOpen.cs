using System.ComponentModel.DataAnnotations.Schema;

namespace InterApi.Models
{
  public class DaysOpenModel
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public required string Day { get; set; }

    public required int RestaurantId { get; set; }
  }
}
