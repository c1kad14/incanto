using Incanto.BusinessLogic.Models;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Incanto.WebApp.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class GendersController : CRUDController<GenderModel, Gender>
    {
	    public GendersController(IDataRepository<Gender> dataRepository) : base(dataRepository, null)
	    {
		    
	    }
    }
}
