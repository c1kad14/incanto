using System;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using System.Web.Helpers;
using Incanto.BusinessLogic.Services.Core;
using Incanto.BusinessLogic.Services.Core.Interfaces;
using Incanto.DataAccess.Context;
using Incanto.DataAccess.Interfaces;
using Incanto.DataAccess.Repository;
using Incanto.Domain;
using Incanto.WebApp.Identity.Core;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.WebEncoders;

namespace Incanto.WebApp
{
	public class Startup
	{
		public IConfiguration Configuration { get; }

		//public Startup(IConfiguration configuration)
		//{
		//	Configuration = configuration;
		//}

		public Startup(IHostingEnvironment env)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables();

			Configuration = builder.Build();
		}


		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			services.Configure<WebEncoderOptions>(options => new TextEncoderSettings(UnicodeRanges.All));
			services.AddTransient<IPhotoUploadService, PhotoUploadService>();
			services.AddTransient(typeof(IDataRepository<>), typeof(DataRepository<>));
			services.AddTransient<IDataRepository<Item>, ItemsDataRepository>();
			services.Configure<PasswordHasherOptions>(options =>
				options.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2
			);

			var lockoutOptions = new LockoutOptions
			{
				AllowedForNewUsers = true,
				DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15),
				MaxFailedAccessAttempts = 3
			};

			services.AddEntityFrameworkInMemoryDatabase().AddDbContext<UserContext>((serviceProvider, options) => options.UseInMemoryDatabase("Users").UseInternalServiceProvider(serviceProvider));
			services.AddDbContext<IncantoDataContext>(optionsAction =>
				optionsAction.UseSqlServer(Configuration.GetConnectionString("DevelopersConnection")));
			services.AddIdentity<ApplicationUser, IdentityRole>(options =>
			{
				// Lockout settings
				options.Lockout = lockoutOptions;
			})
				.AddEntityFrameworkStores<UserContext>()
				.AddDefaultTokenProviders();

			services.AddMvc();

			services.ConfigureApplicationCookie(options =>
			{
				// Cookie settings
				options.Cookie.HttpOnly = true;
				options.Cookie.Expiration = TimeSpan.FromDays(60);
				options.LoginPath = "/admin/login";
				options.LogoutPath = "/admin/logout";
				options.AccessDeniedPath = "/admin/AccessDenied";
				options.SlidingExpiration = true;
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
		{
			loggerFactory.AddConsole();
			var context = app.ApplicationServices.GetService<UserContext>();
			AddUser(context);
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseStaticFiles();
			app.UseAuthentication();
			app.UseMvc();

			//app.UseMvc(routes =>
			//{
			//	routes.MapRoute(
			//		name: "default",
			//		template: "{controller=Home}/{action=Index}/{id?}");
			//});

			//app.Run(async (context) =>
			//{
			//    await context.Response.WriteAsync("Hello World!");
			//});
		}
		private static void AddUser(UserContext context)
		{
			var user = new ApplicationUser
			{
				Id = "1",
				UserName = "incantoadmin",
				NormalizedUserName = "INCANTOADMIN",
				Email = "incantoadmin",
				Password = "IncpswdSUPER!1",
				PasswordHash = Crypto.HashPassword("IncpswdSUPER!1"),
				EmailConfirmed = true,
				PhoneNumberConfirmed = true,
				SecurityStamp = Guid.NewGuid().ToString(),
				LockoutEnabled = true
			};

			var role = new IdentityRole
			{
				Id = "1",
				Name = "admin"

			};

			var userClaim = new IdentityUserClaim<string>
			{
				Id = 1,
				UserId = "1",
				ClaimType = "role",
				ClaimValue = role.Name,

			};

			context.Users.Add(user);
			context.Roles.Add(role);
			context.UserClaims.Add(userClaim);
			context.SaveChanges();
		}
	}
}
