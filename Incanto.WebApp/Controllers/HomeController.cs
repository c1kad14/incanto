using Incanto.BusinessLogic.Services;
using Incanto.Domain;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Remotion.Linq.Clauses;

namespace Incanto.WebApp.Controllers
{
	[Route(""),
	 Route("brands/"),
	 Route("{gender}/"),
	 Route("{gender}/type/{typeId}"),
	 Route("{gender}/type/{typeId}/category/{categoryId}"),
	 Route("item/{id}"),
	 Route("cart/"),
	 Route("contacts/"),
	 Route("help/"),]
	public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    }
}