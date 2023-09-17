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

    }
}