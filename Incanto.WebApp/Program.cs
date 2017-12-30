﻿using System.IO;
using System.Reflection;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Incanto.WebApp
{
	public class Program
	{
		public static void Main(string[] args)
		{
			BuildWebHost(args).Run();
			//var host = new WebHostBuilder()
			//	.UseKestrel()
			//	.UseContentRoot(Directory.GetCurrentDirectory())
			//	.UseIISIntegration()
			//	.UseStartup<Startup>()
			//	.UseApplicationInsights()
			//	.Build();

			//host.Run();
		}

		public static IWebHost BuildWebHost(string[] args) =>
			new WebHostBuilder()
				.UseKestrel()
				.UseContentRoot(Directory.GetCurrentDirectory())
				.UseIISIntegration()
				.UseStartup<Startup>()
				.UseApplicationInsights()
				.Build();
	}
}
