using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        public string GenerateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };

            //sign token using a symmetric key and specific which signature algorithm to apply
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1b4e4aaba96740598e9930e8be63ea6632cf126c7654d7c2bc7a8313bd0e2b78bfd612189124ca1871be8e344578a063ce8717161f14368de70d3ce3419abe36"));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(3),
                SigningCredentials = cred
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            //Create and serialize token

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }

    }
}