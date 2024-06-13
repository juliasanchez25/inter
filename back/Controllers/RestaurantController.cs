using InterApi.Data;
using InterApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InterApi.Controllers
{
  [ApiController]
  [Route("restaurant/configuration")]
  public class RestaurantController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public RestaurantController(DatabaseContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<RestaurantModel>>> Get()
    {
      return await _context.Restaurant.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<RestaurantModel>> Add(RestaurantModel request)
    {
      _context.Restaurant.Add(request);
      await _context.SaveChangesAsync();
      return request;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<RestaurantModel>> Update(RestaurantModel request, int id)
    {
      var restaurant = await _context.Restaurant.FindAsync(id);
      if (restaurant == null)
        return NotFound();

      restaurant.Address = request.Address;
      restaurant.Capacity = request.Capacity;
      restaurant.DaysOpen = request.DaysOpen;
      restaurant.Phone = request.Phone;
      restaurant.Website = request.Website;
      restaurant.WorkingHours = request.WorkingHours;

      await _context.SaveChangesAsync();
      return restaurant;
    }
  }
}
