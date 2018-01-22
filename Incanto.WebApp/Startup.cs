using System;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using Incanto.BusinessLogic.Services.Core;
using Incanto.BusinessLogic.Services.Core.Interfaces;
using Incanto.DataAccess;
using Incanto.DataAccess.Context;
using Incanto.DataAccess.Interfaces;
using Incanto.DataAccess.Repository;
using Incanto.Domain.Base.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
			//services.Configure<WebEncoderOptions>(options =>
			//{
			//	options.TextEncoderSettings = new TextEncoderSettings(UnicodeRanges.All);
			//})
			services.Configure<WebEncoderOptions>(options => new TextEncoderSettings(UnicodeRanges.All));
			services.AddDbContext<IncantoDataContext>(optionsAction => optionsAction.UseSqlServer(Configuration.GetConnectionString("DevelopersAzureConnection")));
			services.AddTransient<IPhotoUploadService, PhotoUploadService>();
			services.AddTransient(typeof(IDataRepository<>), typeof(DataRepository<>));
			services.AddMvc();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
		{
			loggerFactory.AddConsole();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseStaticFiles();

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
	}
}
