using Microsoft.AspNetCore.Mvc;

namespace InterApi.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
  public WeatherForecastController()
  {
    System.Diagnostics.Debug.WriteLine("This is a log");
  }
}
