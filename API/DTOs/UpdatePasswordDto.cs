namespace API.DTOs
{
    public class UpdatePasswordDto
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfNewPassword { get; set; }
        public string Username { get; set; }
    }
}