using BackEnd.DTOs;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MyShoppingContext _contex;

        public LoginController(MyShoppingContext context)
        {
                _contex = context;
        }

        [HttpPost]
        public async Task<IActionResult> login(signInDTO obj)
        {
                var users = await _contex.Users.ToListAsync();

            try
            {
                if(obj == null) {
                    return BadRequest("Invaild object");
                }

                var userExitflag = users.Find(u => u.Username == obj.username);

                if(userExitflag == null)
                {
                    return NotFound("Incorrect username or password");
                }

               

                if(HashPasswordClass.VerifyPassword(obj.password,userExitflag.PasswordHash)) {
                    Token token = new Token();

                    var Token = token.createToken(userExitflag.Username);
                return Ok(new { Token });
                       
                }
                    return NotFound("Incorrect username or password");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
