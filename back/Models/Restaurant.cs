using System.ComponentModel.DataAnnotations.Schema;

namespace InterApi.Models
{
  public class RestaurantModel
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int Capacity { get; set; }

  }
}
