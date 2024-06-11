using InterApi.Data;
using Microsoft.EntityFrameworkCore;

namespace InterApi
{

  internal class Program
  {
    public static void Main(string[] args)
    {

      var builder = WebApplication.CreateBuilder(args);
      builder.Services.AddControllers();
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();
      builder.Services.AddCors(options =>
      {
        options.AddPolicy("CorsPolicy", builder => builder
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader()
        );
      });
      builder.Services.AddDbContextPool<DatabaseContext>(
        options => options.UseNpgsql(builder.Configuration
          .GetConnectionString("DataBase")
        )
      );

      var app = builder.Build();
      app.UseSwagger();
      app.UseSwaggerUI();
      app.UseCors("CorsPolicy");
      app.UseAuthorization();
      app.MapControllers();
      app.UseAuthorization();
      app.Run();
    }
  }
}
