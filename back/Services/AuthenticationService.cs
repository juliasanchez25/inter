using InterApi.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace InterApi.Services
{
  public class AuthenticationService
  {
    private IConfiguration _configuration;


    public AuthenticationService(
      IConfiguration configuration
    )
    {
      _configuration = configuration;
    }

    public string CreateToken(UserModel user)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
          {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
          }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }

    public int? GetUserIdByToken(string token)
    {
      string? id = DecodeToken(token);
      System.Console.WriteLine(id);
      if (id == null)
      {
        return null;
      }

      if (int.TryParse(id, out int userId))
      {
        return userId;
      }
      else
      {
        return null;
      }
    }

    private string? DecodeToken(string token)
    {
      var handler = new JwtSecurityTokenHandler();
      try
      {
        var jsonToken = handler.ReadToken(token);
        var tokenS = handler.ReadToken(token) as JwtSecurityToken;
        var claim = tokenS?.Claims.FirstOrDefault(claim => claim.Type == "nameid");
        return claim?.Value;
      }
      catch (Exception ex)
      {
        return null;
      }
    }
  }
}
