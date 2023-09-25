using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Models;
using System.Security.Cryptography;
using BackEnd.DTOs;
using BackEnd.Services;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyShoppingContext _context;

        public UsersController(MyShoppingContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult> PostUser(userDto user)
        {
            try
            {
                if (_context.Users == null)
                {
                    return Problem("Entity set 'MyShoppingContext.Users'  is null.");
                }
                var users = await _context.Users.ToListAsync();

                if(users.Find(u=>u.Username == user.Username) != null)
                {
                    return BadRequest("That username is taken.Try another");
                }

                user.PasswordHash = HashPasswordClass.HashPassword(user.PasswordHash);
                var newUser = new User()
                {
                    Username = user.Username,
                    PasswordHash = user.PasswordHash,
                    Email = user.Email,
                    RegistrationDate = user.RegistrationDate,
                    LastLogin = DateTime.Now,
                    
                };
                await _context.Users.AddAsync(newUser);
                await _context.SaveChangesAsync();
                var listUsers = await _context.Users.ToListAsync();
                var usermappin = new UserRoleMapping
                {
                    UserId = newUser.UserId,
                    RoleId =  listUsers.ToList().Count()>1 ? 2 : 1
                };
                await _context.UserRoleMappings.AddAsync(usermappin);
                await _context.SaveChangesAsync();

                return Ok("User added");
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }
          
          
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.UserId == id)).GetValueOrDefault();
        }

        

    }
}
