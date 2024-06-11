using Microsoft.AspNetCore.Mvc;
using InterApi.Models;
using InterApi.Data;
using InterApi.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel;

namespace InterApi.Controllers
{
  [ApiController]
  public class UsersController : ControllerBase
  {

    private readonly DatabaseContext _context;

    public UsersController(DatabaseContext context)
    {
      _context = context;
    }

    [HttpPost]
    [Route("/users/login")]
    public async Task<ActionResult<String>> Login(UserModel user)
    {
      UserModel? existentUser = await _context.User.FirstOrDefaultAsync(x => x.Email == user.Email);
      if (existentUser == null)
      {
        return NotFound();
      }
      if (user.Password != existentUser.Password) return Unauthorized();

      UserTokenEntity token = BuildToken(user);
      return new OkObjectResult(new
      {
        token = token.Token,
        user = existentUser
      });
    }

    private UserTokenEntity BuildToken(AuthenticateUserParams user)
    {
      var claims = new[]
      {
        new Claim(JwtRegisteredClaimNames.UniqueName, user.Email),
        new Claim("meuValor", "oque voce quiser"),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
      };
      SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
      SigningCredentials signingCredentials = new(key, SecurityAlgorithms.HmacSha256);
      DateTime expiration = DateTime.UtcNow.AddHours(1);
      JwtSecurityToken token = new(
        issuer: null,
        audience: null,
        claims: claims,
        expires: expiration,
        signingCredentials: signingCredentials
      );
      return new UserTokenEntity()
      {
        Token = new JwtSecurityTokenHandler().WriteToken(token),
      };
    }
  }
}
