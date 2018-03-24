using System;
using System.Collections.Generic;
using System.Linq;
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
		private readonly ReadDataService<ItemModel, Item> _itemReadDataService;
		public CatalogItemsController(IDataRepository<ExistingItem> existingItemDataRepository, IDataRepository<Item> itemDataRepository)
		{
			itemDataRepository.IncludeFunc = q =>
				q.Include(i => i.Brand).ThenInclude(b => b.Country).Include(i => i.Category).ThenInclude(c => c.Type)
					.ThenInclude(t => t.Gender).Include(i => i.Details).ThenInclude(d => d.DetailValue)
					.ThenInclude(dv => dv.DetailType).ThenInclude(dt => dt.Category).Include(i => i.Photos);
			_itemReadDataService = new ReadDataService<ItemModel, Item>(itemDataRepository);

		}

		[HttpGet]
		[Route("GetList")]
		public ActionResult GetCollection(string gender, string type, string category, string brand, bool sale, bool newArrivals)
		{
			var operationResult = _itemReadDataService.Get(item =>
				(brand == null || item.Brand.Name == brand) && (category == null || item.Category.Name == category) &&
				(type == null || item.Category.Type.Name == type) && (gender == null || item.Category.Type.Gender.Name == gender) && (sale == false || item.Discount > 0) && (newArrivals == false || (DateTime.Today - item.Updated).TotalDays < 31));
			var orderByDescending = operationResult.OrderByDescending(item => item.Model.Updated);
			return Json(orderByDescending);
		}

		[HttpPost]
		[Route("GetFilteredList")]
		public ActionResult GetCollectionByFilter(List<int> categories, List<int> brands, List<int> sizes, string gender, bool sale, bool newArrivals)
		{
			var operationResult = _itemReadDataService.Get(item => (
			categories.Count == 0 && !string.IsNullOrEmpty(gender) && gender == item.Category.Type.Gender.Name 
			|| string.IsNullOrEmpty(gender)  && categories.Any(category => category == item.Category.Id)
			|| categories.Count == 0 && string.IsNullOrEmpty(gender))
			&& (brands.Count == 0 || brands.Any(brand => brand == item.Brand.Id))
			&& (sizes.Count == 0 || sizes.Any(size => item.ExistingItems.Any(ex => ex.Size.Id == size))) && (sale == false || item.Discount > 0) && (newArrivals == false || (DateTime.Today - item.Updated).TotalDays < 31));
			var orderByDescending = operationResult.OrderByDescending(item => item.Model.Updated);
			return Json(orderByDescending);
		}
	}
}
