using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Incanto.BusinessLogic.Models.Base.Interfaces;
using Incanto.BusinessLogic.Services;
using Incanto.BusinessLogic.Services.Core;
using Incanto.DataAccess.Interfaces;
using Incanto.DataAccess.Repository;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.WebApp.Controllers
{
	public abstract class CRUDController<TModel, TEntity> : Controller
		where TModel : class, IBaseModel<TEntity>, new()
		where TEntity : class, IBaseEntity, new()
	{
		protected readonly ReadWriteDataService<TModel, TEntity> ReadWriteDataService;

		protected CRUDController(IDataRepository<TEntity> dataRepository, Func<IQueryable<TEntity>, IQueryable<TEntity>> includeFunc)
		{
			dataRepository.IncludeFunc = includeFunc;
			ReadWriteDataService = new ReadWriteDataService<TModel, TEntity>(dataRepository);
		}

		[HttpGet("{id}")]
		[Route("Get")]
		public virtual ActionResult GetObject(int id)
		{
			var operationResult = ReadWriteDataService.Get(id);
			return Json(operationResult);
		}

		[HttpGet]
		[Route("GetList")]
		public ActionResult GetCollection()
		{
			var operationResult = ReadWriteDataService.Get();
			return Json(operationResult);
		}

		[HttpPost]
		[Route("Add")]
		public ActionResult AddObject([FromBody]TModel model)
		{
			var operationResult = PerformOperation(model, OperationType.Add);
			return Json(operationResult);
		}

		[HttpPut]
		[Route("Update")]
		public ActionResult UpdateObject([FromBody]TModel model)
		{
			var operationResult = PerformOperation(model, OperationType.Update);
			return Json(operationResult);
		}

		[HttpDelete("{id}")]
		[Route("Delete")]
		public ActionResult DeleteObject(int id)
		{
			var operationResult = PerformOperation(new TModel { Id = id }, OperationType.Delete);
			return Json(operationResult);
		}

		protected OperationResult<TModel, TEntity> PerformOperation(TModel model, OperationType operation)
		{
			BeforeStartCRUDOperation(model, operation);
			var operationResult = ReadWriteDataService.Action(model, operation);
			CRUDOperationCompleted(operationResult.Model, operation, operationResult.IsSuccesful);
			return operationResult;
		}

		protected virtual void BeforeStartCRUDOperation(TModel model, OperationType operation)
		{
		}
		protected virtual void CRUDOperationCompleted(TModel model, OperationType operation, bool isSuccessful)
		{
		}
	}
}