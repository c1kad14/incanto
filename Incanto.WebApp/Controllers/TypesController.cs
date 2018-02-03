using Incanto.BusinessLogic.Models;
using Incanto.DataAccess.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Type = Incanto.Domain.Type;

namespace Incanto.WebApp.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class TypesController : CRUDController<TypeModel, Type>
	{
		public TypesController(IDataRepository<Type> dataRepository) : base(dataRepository, q => q.Include(t => t.Gender))
		{
		}
	}
}