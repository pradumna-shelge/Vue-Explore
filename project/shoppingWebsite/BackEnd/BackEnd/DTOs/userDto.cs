namespace BackEnd.DTOs
{
    public class userDto
    {
   

        public string Username { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;

        public string Email { get; set; } = null!;

        public DateTime RegistrationDate { get; set; } = DateTime.Now;
    }
}
