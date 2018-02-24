﻿using System.Collections.Generic;
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

		[HttpPost]
		[Route("AddList")]
		public ActionResult AddCollection([FromBody]List<ExistingItemModel> existingItems)
		{
			var operationResult = new List<OperationResult<ExistingItemModel, ExistingItem>>();
			existingItems.ForEach(existingItem => operationResult.Add(PerformOperation(existingItem, OperationType.Add)));
			return Json(operationResult);
		}
	}
}
