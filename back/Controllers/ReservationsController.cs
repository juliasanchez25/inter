namespace InterApi.Controllers
{

  using Microsoft.AspNetCore.Mvc;
  using InterApi.Models;
  using InterApi.Data;
  using Microsoft.EntityFrameworkCore;
  using InterApi.Services;
  using InterApi.Dtos;

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
    public async Task<ActionResult<List<ReservationDto>>> Get()
    {
      var reservations = await (from reservation in _context.Reservation
                                join user in _context.User
                                on reservation.UserId equals user.Id
                                select new ReservationDto
                                {
                                  Id = reservation.Id,
                                  UserId = reservation.UserId,
                                  UserName = user.Name,
                                  Day = reservation.Day,
                                  Phone = reservation.Phone,
                                  Quantity = reservation.Quantity
                                }).ToListAsync();

      return reservations;
    }

    [HttpGet]
    [Route("/reservations/me/{userId}")]
    public async Task<ActionResult<List<ReservationModel>>> Get(int userId)
    {
      var reservations = await _context.Reservation.Where(x => x.UserId == userId).ToListAsync();
      return reservations;
    }

    [HttpPost]
    [Route("/reservations")]
    public async Task<ActionResult<List<ReservationModel>>> AddReservation(ReservationModel reservation)
    {
      _context.Reservation.Add(reservation);
      await _context.SaveChangesAsync();
      await _context.Reservation.ToListAsync();

      _context.Notification.Add(new NotificationModel
      {
        Message = "Reserva criada para " + reservation.Quantity + " pessoa(s), no dia " + FormatIsoStringToDateTime(reservation.Day),
        Title = "Nova reserva criada!",
        IsRead = false,
        CreatedAt = DateTime.UtcNow
      });
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

      _context.Notification.Add(new NotificationModel
      {
        Message = "Reserva de " + reservation.Quantity + " pessoa(s) cancelada, no dia " + FormatIsoStringToDateTime(reservation.Day),
        Title = "Reserva número " + id + " cancelada!",
        IsRead = false,
        CreatedAt = DateTime.UtcNow
      });
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

    public static DateTime FormatIsoStringToDateTime(string isoDateString)
    {
      DateTimeOffset dateTimeOffset = DateTimeOffset.Parse(isoDateString, null, System.Globalization.DateTimeStyles.RoundtripKind);
      TimeSpan utcOffset = TimeSpan.FromHours(-3);
      DateTimeOffset adjustedDateTimeOffset = dateTimeOffset.ToOffset(utcOffset);
      return adjustedDateTimeOffset.Date;
    }
  }
}
