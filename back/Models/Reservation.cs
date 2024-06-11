using System.ComponentModel.DataAnnotations.Schema;

namespace InterApi.Models
{
  public class ReservationModel
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required string Phone { get; set; }

    public required string Day { get; set; }

    public required int Quantity { get; set; }
    public required int UserId { get; set; }
  }
}
