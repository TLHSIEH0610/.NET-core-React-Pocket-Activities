using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseAPIController
    {
        [HttpPost("{id}")]
        public async Task<IActionResult> Follow(string id)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetId = id }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFollowings(string id, string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query { UserId = id, Predicate = predicate }));
        }

    }
}