using System.Collections.Generic;
using System.Linq;
using Incanto.BusinessLogic.Models;
using Incanto.BusinessLogic.Services.Core;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Incanto.WebApp.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class ExistingItemsController : CRUDController<ExistingItemModel, ExistingItem>
	{
		public ExistingItemsController(IDataRepository<ExistingItem> dataRepository) : base(dataRepository, q => q.Include(e => e.Item).Include(e => e.Size).ThenInclude(s => s.Category))
		{
		}

		[HttpGet("{itemId}")]
		[Route("GetListByItemId")]
		public ActionResult GetObjectsByItemId(int itemId)
		{
			var operationResult = ReadWriteDataService.Get(existingItem => existingItem.Item.Id == itemId);
			return Json(operationResult);
		}

		[Authorize]
		[HttpPost]
		[Route("AddList")]
		public ActionResult AddCollection([FromBody]List<ExistingItemModel> existingItems)
		{
			var existingRecords = ReadWriteDataService.Get();
			var operationResult = new List<OperationResult<ExistingItemModel, ExistingItem>>();
			existingItems.ForEach(existingItem =>
			{
				var recordExist = existingRecords.FirstOrDefault(
					e => e.Model.ItemId == existingItem.ItemId && e.Model.Size.Id == existingItem.Size.Id);
				if (recordExist != null)
				{
					recordExist.Model.Amount = existingItem.Amount;
					operationResult.Add(
						PerformOperation(recordExist.Model, OperationType.Update));
				}
				else
				{
					operationResult.Add(
						PerformOperation(existingItem, OperationType.Add));
				}
			});
			return Json(operationResult);
		}
	}
}
