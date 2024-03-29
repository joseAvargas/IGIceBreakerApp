using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _contex;
        public BuggyController(DataContext context)
        {
            _contex = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }
    
        [HttpGet("not-foud")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _contex.Users.Find(-1);

            if (thing == null) return NotFound();

            return Ok(thing);
        }
    
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
             var thing = _contex.Users.Find(-1);

             var thingToReturn = thing.ToString();

             return thingToReturn;
        }
    
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("this was not a good request");
        }

        [HttpGet("no-content")]
        public ActionResult<string> GetNoContent()
        {
            return NoContent();
        }
    }
}