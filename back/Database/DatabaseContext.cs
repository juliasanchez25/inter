using InterApi.Models;
using Microsoft.EntityFrameworkCore;
namespace InterApi.Data;
public class DatabaseContext : DbContext
{
  public DatabaseContext(DbContextOptions<DatabaseContext> options)
      : base(options)
  {
  }

  public DbSet<DaysOpenModel> DaysOpen { get; set; }
  public DbSet<ReservationModel> Reservation { get; set; }
  public DbSet<RestaurantModel> Restaurant { get; set; }
  public DbSet<UserModel> User { get; set; }
}
