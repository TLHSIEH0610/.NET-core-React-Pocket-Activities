
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseAPIController
    {
        [HttpGet("{id}")]

        public async Task<IActionResult> GetProfile(string id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("activities/{id}")]
        public async Task<IActionResult> GetUserActivities(string id,
            string predicate)
        {
            return HandleResult(await Mediator.Send(new ListActivities.Query
            { Id = id, Predicate = predicate }));
        }

    }
}