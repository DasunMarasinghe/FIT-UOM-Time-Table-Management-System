using Microsoft.AspNetCore.Identity;

namespace Timetable.Api.Models;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
}