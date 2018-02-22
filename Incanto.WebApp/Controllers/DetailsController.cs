using System.Collections.Generic;
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
    public class DetailsController : CRUDController<DetailModel, Detail>
	{
		public DetailsController(IDataRepository<Detail> dataRepository) : base(dataRepository, q => q.Include(d => d.DetailValue).ThenInclude(dv => dv.DetailType).ThenInclude(dt => dt.Category).Include(d => d.Item))
		{
			
		}

		[HttpGet("{itemId}")]
		[Route("GetListByItemId")]
		public ActionResult GetObjectsByItemId(int itemId)
		{
			var operationResult = ReadWriteDataService.Get(detail => detail.Item.Id == itemId);
			return Json(operationResult);
		}

		[HttpPost]
		[Route("AddList")]
		public ActionResult AddCollection([FromBody]List<DetailModel> details)
		{
			var operationResult = new List<OperationResult<DetailModel, Detail>>();
			details.ForEach(detail => operationResult.Add(PerformOperation(detail, OperationType.Add)));
			return Json(operationResult);
		}
	}
}