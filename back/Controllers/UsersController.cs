using Microsoft.AspNetCore.Mvc;
using InterApi.Models;
using InterApi.Entities;
using InterApi.Data;
using InterApi.Services;
using Microsoft.EntityFrameworkCore;

namespace InterApi.Controllers
{
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly DatabaseContext _context;
    private readonly IConfiguration _configuration;
    private readonly AuthenticationService _authenticationService;

    public UsersController(
        DatabaseContext context,
        IConfiguration configuration,
        AuthenticationService authenticationService
    )
    {
      _context = context;
      _configuration = configuration;
      _authenticationService = authenticationService;
    }

    [HttpPost]
    [Route("/users/login")]
    public async Task<ActionResult<string>> Login(AuthenticateUserParams loginParams)
    {
      UserModel? existentUser = await _context.User.FirstOrDefaultAsync(x => x.Email == loginParams.Email);
      if (existentUser == null)
      {
        return NotFound();
      }

      if (loginParams.Password != existentUser.Password)
      {
        return Unauthorized();
      }
      existentUser.Password = "";
      string token = _authenticationService.CreateToken(existentUser);
      return new OkObjectResult(new
      {
        token = token,
        user = existentUser
      });
    }

    [HttpPost]
    [Route("/users")]
    public async Task<ActionResult<UserModel>> AddUser(UserModel user)
    {
      UserModel? existentUser = await _context.User.FirstOrDefaultAsync(x => x.Email == user.Email);
      if (existentUser != null)
      {
        return BadRequest("User already exists");
      }

      _context.User.Add(user);
      await _context.SaveChangesAsync();
      return user;
    }

    [HttpGet]
    [Route("/users/me/{token}")]
    public async Task<ActionResult<UserModel?>> GetMe(string token)
    {
      int? userId = _authenticationService.GetUserIdByToken(token);
      if (userId == null)
      {
        return NotFound();
      }
      return await _context.User.FirstOrDefaultAsync(x => x.Id == userId);
    }
  }
}
