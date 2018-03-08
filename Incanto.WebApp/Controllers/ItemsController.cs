using System;
using System.IO;
using System.Linq;
using Incanto.BusinessLogic.Models;
using Incanto.BusinessLogic.Services.Core;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Incanto.WebApp.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class ItemsController : CRUDController<ItemModel, Item>
	{
		private readonly string _photoUploadPath;

		public ItemsController(IDataRepository<Item> dataRepository, IHostingEnvironment hostingEnvironment) : base(dataRepository, q => q.Include(i => i.Brand).ThenInclude(b => b.Country).Include(i => i.Category).ThenInclude(c => c.Type).ThenInclude(t => t.Gender).Include(i => i.Details).ThenInclude(d => d.DetailValue).ThenInclude(dv => dv.DetailType).ThenInclude(dt => dt.Category).Include(i => i.Photos).Include(i => i.ExistingItems).ThenInclude(e => e.Size))
		{
			_photoUploadPath = $"{hostingEnvironment.WebRootPath}";
		}

		[HttpGet]
		[Route("GetList")]
		public override ActionResult GetCollection()
		{
			var operationResult = ReadWriteDataService.Get();
			var orderByDescending = operationResult.OrderByDescending(item => item.Model.Updated);
			return Json(orderByDescending);
		}
		[Authorize]
		[HttpDelete("{id}")]
		[Route("Delete")]
		public override ActionResult DeleteObject(int id)
		{
			var idToRemove = id;
			var operationResult = PerformOperation(new ItemModel { Id = id }, OperationType.Delete);
			if (operationResult.IsSuccesful)
			{
				var filePath = String.Concat(_photoUploadPath, $"\\itemPhotos\\{idToRemove}");
				if (Directory.Exists(filePath))
				{
					Directory.Delete(filePath, true);
				}
			}
			return Json(operationResult);
		}
	}
}