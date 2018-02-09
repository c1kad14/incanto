using Microsoft.AspNetCore.Mvc;

namespace Incanto.WebApp.Controllers
{
	[Route("/[controller]"), Route("")]
	public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}