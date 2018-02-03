using Incanto.BusinessLogic.Models;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Incanto.WebApp.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class CountriesController : CRUDController<CountryModel, Country>
	{
		public CountriesController(IDataRepository<Country> dataRepository) : base(dataRepository, null)
		{
		}
	}
}
