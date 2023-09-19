//properties that will sned back to client after logining in

namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }
        public string AppUserId { get; set; }
    }
}