using System.ComponentModel.DataAnnotations.Schema;

namespace InterApi.Models
{
  public class UserModel
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required string Name { get; set; }

    public required string Email { get; set; }

    public required string Password { get; set; }

    public required string Role { get; set; }
  }
}
