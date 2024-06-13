namespace InterApi.Controllers
{

  using Microsoft.AspNetCore.Mvc;
  using InterApi.Models;
  using InterApi.Data;
  using Microsoft.EntityFrameworkCore;
  using InterApi.Services;

  [ApiController]
  public class ReservationsController : ControllerBase
  {

    private readonly DatabaseContext _context;
    private readonly AuthenticationService _authenticationService;

    public ReservationsController(
      DatabaseContext context,
      AuthenticationService authenticationService
    )
    {
      _context = context;
      _authenticationService = authenticationService;
    }

    [HttpGet]
    [Route("/reservations")]
    public async Task<ActionResult<List<ReservationModel>>> Get()
    {
      return await _context.Reservation.ToListAsync();
    }

    [HttpPost]
    [Route("/reservations")]
    public async Task<ActionResult<List<ReservationModel>>> AddReservation(ReservationModel reservation)
    {
      _context.Reservation.Add(reservation);
      await _context.SaveChangesAsync();
      return await _context.Reservation.ToListAsync();
    }

    [HttpDelete]
    [Route("/reservations/{id}")]
    public async Task<ActionResult<List<ReservationModel>>> Delete(int id)
    {
      var reservation = await _context.Reservation.FindAsync(id);
      if (reservation == null)
        return NotFound();
      _context.Reservation.Remove(reservation);
      await _context.SaveChangesAsync();
      return await _context.Reservation.ToListAsync();
    }

    [HttpPut]
    [Route("/reservations/{id}")]
    public async Task<ActionResult<List<ReservationModel>>> Update(ReservationModel request, int id)
    {
      var reservation = await _context.Reservation.FindAsync(id);
      if (reservation == null)
        return NotFound();
      reservation.Day = request.Day;
      reservation.Quantity = request.Quantity;
      reservation.UserId = request.UserId;
      await _context.SaveChangesAsync();
      return await _context.Reservation.ToListAsync();
    }

    private async Task<ActionResult<UserModel>> GetUserByToken(string token)
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
