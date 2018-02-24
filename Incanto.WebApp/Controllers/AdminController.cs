using System.Threading.Tasks;
using Incanto.WebApp.Identity.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Incanto.WebApp.Controllers
{
	[Route("/admin")]
	public class AdminController : Controller
	{
		public UserManager<ApplicationUser> UserManager { get; }
		private readonly SignInManager<ApplicationUser> _signInManager;
		
		public AdminController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)

		{
			UserManager = userManager;
			_signInManager = signInManager;
		}

		[HttpGet]
		public IActionResult Index()
		{
			if (!User.Identity.IsAuthenticated)
			{
				return View("Authentication");
			}
			return View();
		}
		//[HttpGet]
		//[AllowAnonymous]
		//public IActionResult Login()
		//{
		//	return View("Authentication");
		//}

		[HttpPost("login")]
		[AllowAnonymous]
		public async Task<IActionResult> Login(ApplicationUser model)
		{
			if (ModelState.IsValid && !string.IsNullOrEmpty(model.Password))
			{
				// This doesn't count login failures towards account lockout
				// To enable password failures to trigger account lockout, set lockoutOnFailure: true
				var user = await UserManager.FindByNameAsync("incantoadmin");
				var result = await _signInManager.PasswordSignInAsync(user, model.Password, true, true);
				if (result.IsLockedOut)
				{
					return RedirectToAction("AccessDenied", "admin");
				}
			}
			return RedirectToAction("Index", "admin");
		}
		[HttpPost("logout")]
		public async Task<IActionResult> Logout()
		{
			await _signInManager.SignOutAsync();
			return RedirectToAction("Index", "admin");
		}

		[HttpGet("AccessDenied")]
		public IActionResult AccessDenied()
		{
			return View("AccessDenied");
		}
	}
}