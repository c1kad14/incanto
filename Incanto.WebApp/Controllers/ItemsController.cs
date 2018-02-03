using Incanto.BusinessLogic.Models;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Incanto.WebApp.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class ItemsController : CRUDController<ItemModel, Item>
	{
		public ItemsController(IDataRepository<Item> dataRepository) : base(dataRepository, q => q.Include(i => i.Brand).ThenInclude(b => b.Country).Include(i => i.Category).ThenInclude(c => c.Type).ThenInclude(t => t.Gender).Include(i => i.Details).ThenInclude(d => d.DetailValue).ThenInclude(dv => dv.DetailType).ThenInclude(dt => dt.Category).Include(i => i.Photos))
		{
		}
	}
}