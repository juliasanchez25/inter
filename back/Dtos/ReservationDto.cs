namespace InterApi.Dtos
{
  public class ReservationDto
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Phone { get; set; }
    public int Quantity { get; set; }
    public string Day { get; set; }
  }
}
