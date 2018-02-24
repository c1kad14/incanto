using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Incanto.WebApp.Identity.Core
{
    public class UserContext : DbContext
    {
	    public UserContext(DbContextOptions<UserContext> options) : base(options)
	    {
		    
	    }

	    protected override void OnModelCreating(ModelBuilder modelBuilder)
	    {
		    base.OnModelCreating(modelBuilder);
		    modelBuilder.Ignore<IdentityUserLogin<string>>();
		    modelBuilder.Ignore<IdentityUserToken<string>>();
			modelBuilder.Entity<IdentityUserRole<string>>().HasKey(p => new { p.UserId, p.RoleId });
		}

		public DbSet<ApplicationUser> Users { get; set; }
		public DbSet<IdentityRole> Roles { get; set; }
		public DbSet<IdentityUserClaim<string>> UserClaims { get; set; }
	    public DbSet<IdentityUserRole<string>> UserRoles { get; set; }
	    public DbSet<IdentityUserLogin<string>> UserLogins { get; set; }
    }
}
