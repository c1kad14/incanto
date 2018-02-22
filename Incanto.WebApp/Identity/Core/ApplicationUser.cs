using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Incanto.WebApp.Identity.Core
{
	public class ApplicationUser : IdentityUser
	{
		public ApplicationUser() { }
		public ApplicationUser(string userName, string password)
		{
			UserName = userName;
			Password = password;
		}

		public sealed override string UserName { get; set; }
		public string Password { get; set; }
		public int LoginTry { get; set; }
	}
}
