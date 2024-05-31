using Microsoft.EntityFrameworkCore;
namespace InterApi.Data;
public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<Pessoas> Pessoas { get; set; }
    public DbSet<Clientes> Clientes { get; set; }
    public DbSet<Restaurante> Restaurantes { get; set; }
    public DbSet<Horarios> Horarios { get; set; }
    public DbSet<Reservas> Reservas { get; set; }
}