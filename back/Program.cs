using InterApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.OpenApi.Models;
using InterApi.Services;
using InterApi.Hubs;
using Microsoft.AspNetCore.Http.Connections;

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
      builder.Services.AddSignalR();
      builder.Services.AddDbContextPool<DatabaseContext>(
        options => options.UseNpgsql(builder.Configuration
          .GetConnectionString("DataBase")
        )
      );

      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddScoped<AuthenticationService>();

      builder.Services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new() { Title = "Pappa´s API", Version = "v1" });

        // Define the OAuth2.0 scheme that's in use (i.e., Implicit Flow)
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
          Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
          Name = "Authorization",
          In = ParameterLocation.Header,
          Type = SecuritySchemeType.ApiKey,
          Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement()
          {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
          });
      });
      builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateLifetime = true,
          ValidateIssuerSigningKey = true,
          ValidIssuer = builder.Configuration["Jwt:Issuer"],
          ValidAudience = builder.Configuration["Jwt:Audience"],
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
          ClockSkew = TimeSpan.Zero
        };
      });
      var app = builder.Build();
      app.UseCors("CorsPolicy");
      app.UseAuthorization();
      app.MapControllers();

      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }
      app.UseHttpsRedirection();
      app.UseRouting();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapHub<ReservationsHub>("/reservationsHub", options =>
          {
            options.Transports = HttpTransportType.WebSockets;
          });
      });
      app.Run();
    }
  }
}
