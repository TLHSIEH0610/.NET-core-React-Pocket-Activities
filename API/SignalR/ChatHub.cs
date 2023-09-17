//clients in the same activity will make connection to this hub and be able to invole methods inside the hub
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command);
            //receive new comments
            await Clients.Group(command.ActivityId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        //when a client connects to the hub, join them to a group.
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"]; //get param from querystring
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId); //add to group
            //send list of comments
            var result = await _mediator.Send(new List.Query { ActivityId = Guid.Parse(activityId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}



