using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseAPIController
    {
        [HttpPost("{email}")]
        public async Task<IActionResult> Follow(string email)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetEmail = email }));
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetFollowings(string email, string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query { UserEmail = email, Predicate = predicate }));
        }

    }
}