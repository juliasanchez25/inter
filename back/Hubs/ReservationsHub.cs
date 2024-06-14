using Microsoft.AspNetCore.SignalR;

namespace InterApi.Hubs
{
  public class ReservationsHub : Hub
  {
    public async Task Message(MessageModel message)
    {
      await Clients.Others.SendAsync("message", message);
    }
  }

  public class MessageModel
  {
    public required string Message { get; set; }
  }

}
