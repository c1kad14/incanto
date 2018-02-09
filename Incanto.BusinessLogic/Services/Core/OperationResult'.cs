using Incanto.BusinessLogic.Models.Base.Interfaces;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.BusinessLogic.Services.Core
{
	public class OperationResult<TModel, TEntity>
		where TModel : class, IBaseModel<TEntity>, new()
		where TEntity : class, IBaseEntity, new()
	{
		public OperationResult(TModel model, OperationType operationType, bool isSuccesful, string message)
		{
			Model = model;
			OperationType = operationType;
			IsSuccesful = isSuccesful;
			Message = message;
		}

		public TModel Model { get; set; }
		public OperationType OperationType { get; set; }
		public bool IsSuccesful { get; set; }
		public string Message { get; set; }
	}
}
