using Microsoft.AspNetCore.Mvc;
using InterApi.Models;
using InterApi.Data;
using Microsoft.EntityFrameworkCore;
using InterApi.Services;
using InterApi.Dtos;

namespace InterApi.Controllers
{

  [ApiController]
  public class NotificationsController : ControllerBase
  {

    private readonly DatabaseContext _context;

    public NotificationsController(DatabaseContext context)
    {
      _context = context;
    }

    [HttpGet]
    [Route("/notifications")]
    public async Task<ActionResult<List<NotificationModel>>> Get()
    {
      return await _context.Notification.ToListAsync();
    }

    [HttpPatch]
    [Route("/notifications/read/{id}")]
    public async Task<ActionResult<NotificationModel>> ToggleRead(int id)
    {
      var notification = await _context.Notification.FindAsync(id);
      if (notification == null)
        return NotFound();
      notification.IsRead = !notification.IsRead;
      await _context.SaveChangesAsync();
      return notification;
    }

    [HttpDelete]
    [Route("/notifications/{id}")]
    public async Task<ActionResult<List<NotificationModel>>> Delete(int id)
    {
      var notification = await _context.Notification.FindAsync(id);
      if (notification == null)
        return NotFound();
      _context.Notification.Remove(notification);
      await _context.SaveChangesAsync();
      return await _context.Notification.ToListAsync();
    }
  }
}
