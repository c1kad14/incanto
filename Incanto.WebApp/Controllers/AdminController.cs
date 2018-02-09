using Microsoft.AspNetCore.Mvc;

namespace Incanto.WebApp.Controllers
{
	[Route("/[controller]")]
	public class AdminController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}