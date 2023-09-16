using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseAPIController
    {
        //add photo
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.Command command) //to allow controller get the file
        {
            return HandleResult(await Mediator.Send(command));
        }

        //delete photo
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        //put main flag on a photo
        [HttpPut("{id}")]
        public async Task<IActionResult> SetMain(string id)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command { Id = id }));
        }

    }
}