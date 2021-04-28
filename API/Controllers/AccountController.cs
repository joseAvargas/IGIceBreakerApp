using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!result.Succeeded) return BadRequest(result);            

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("update-password")]
        public async Task<ActionResult> UpdatePassword(UpdatePasswordDto passwordDto)
        {
            if (string.IsNullOrEmpty(passwordDto.Username)) return BadRequest("Action not allowed");
            if (string.IsNullOrEmpty(passwordDto.OldPassword)) return BadRequest("Old password must be entered for this action");
            if (string.IsNullOrEmpty(passwordDto.NewPassword)) return BadRequest("New password must be entered for this action");
            
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.UserName == passwordDto.Username.ToLower());

            if (user == null) return BadRequest("Action not allowed");

            if (!await CheckPasswordAsync(user, passwordDto.OldPassword)) return BadRequest("Incorrect old password");

            var validator = new PasswordValidator<AppUser>();
            var result = await validator.ValidateAsync(_userManager, user, passwordDto.NewPassword);

            if (!result.Succeeded) return BadRequest(result);

            var changed = await ChangePassword(user, passwordDto.NewPassword);
            
            if (changed) return Ok();

            return BadRequest("Failed to change password. Try again.");
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        private async Task<bool> CheckPasswordAsync(AppUser user, string password)
        {
            if (await _userManager.CheckPasswordAsync(user, password))
                return true;

            return false;
        }

        private async Task<bool> ChangePassword(AppUser user, string newPassword)
        {
            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, newPassword);
            var updatedResult = await _userManager.UpdateAsync(user);
            return updatedResult.Succeeded;

        }
    }
}