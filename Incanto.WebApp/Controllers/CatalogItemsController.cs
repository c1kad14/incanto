using Incanto.BusinessLogic.Models;
using Incanto.BusinessLogic.Services.Core;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Incanto.WebApp.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class CatalogItemsController : Controller
	{
		private readonly ReadDataService<ExistingItemModel, ExistingItem> _existingItemReadDataService;
		private readonly ReadDataService<ItemModel, Item> _itemReadDataService;
		public CatalogItemsController(IDataRepository<ExistingItem> existingItemDataRepository, IDataRepository<Item> itemDataRepository)
		{
			itemDataRepository.IncludeFunc = q =>
				q.Include(i => i.Brand).ThenInclude(b => b.Country).Include(i => i.Category).ThenInclude(c => c.Type)
					.ThenInclude(t => t.Gender).Include(i => i.Details).ThenInclude(d => d.DetailValue)
					.ThenInclude(dv => dv.DetailType).ThenInclude(dt => dt.Category).Include(i => i.Photos);
			_existingItemReadDataService = new ReadDataService<ExistingItemModel, ExistingItem>(existingItemDataRepository);
		    _itemReadDataService = new ReadDataService<ItemModel, Item>(itemDataRepository);
		
		}

		[HttpGet("{id}")]
		[Route("Get")]
		public virtual ActionResult GetObject(int id)
		{
			var operationResult = _existingItemReadDataService.Get(id);
			return Json(operationResult);
		}

		[HttpGet]
		[Route("GetList")]
		public ActionResult GetCollection(string gender, string type, string category, string brand)
		{
			var operationResult = _itemReadDataService.Get(item => (brand == null || item.Brand.Name == brand) && (category == null || item.Category.Name == category) && (type == null || item.Category.Type.Name == type) && (gender == null || item.Category.Type.Gender.Name == gender));

			return Json(operationResult);
		}
	}
}
