using Microsoft.AspNetCore.Mvc;

namespace Incanto.WebApp.Controllers
{
	[Route(""),
	 Route("{gender}/"),
	 Route("{gender}/type/{typeId}"),
	 Route("{gender}/type/{typeId}/category/{categoryId}"),
	 Route("item/{id}"),]
	public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}