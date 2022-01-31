﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Universities.Data.Models;
using Universities.Models.Identity;

namespace Universities.Controllers
{
    public class IdentityController : ApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly AppSettings _appSettings;

        public IdentityController(
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings)
        {
            this._userManager = userManager;
            this._appSettings = appSettings.Value;
        }

        [Route(nameof(Register))]
        public async Task<IActionResult> Register(RegisterRequestModel model)
        {
            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await this._userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return this.Ok("Successfully created user");
            }

            return this.BadRequest(result.Errors);
        }

        [Route(nameof(Login))]
        public async Task<ActionResult<string>> Login(LoginRequestModel model)
        {
            var user = await this._userManager.FindByNameAsync(model.UserName);

            if (user == null)
            {
                return this.BadRequest("User not found");
            }

            var isPasswordValid = await this._userManager.CheckPasswordAsync(user, model.Password);

            if (!isPasswordValid)
            {
                return this.Unauthorized("The entered password doesn't correspond with the given username");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this._appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }
    }
}
