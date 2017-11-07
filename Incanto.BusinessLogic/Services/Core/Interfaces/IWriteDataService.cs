using Incanto.BusinessLogic.Models.Base.Interfaces;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.BusinessLogic.Services.Core.Interfaces
{
	interface IWriteDataService<TModel, TEntity>
		where TModel : class, IBaseModel<TEntity>, new()
		where TEntity : class, IBaseEntity, new()
	{
		OperationResult<TModel, TEntity> Add(TModel model);
		OperationResult<TModel, TEntity> Update(TModel model);
		OperationResult<TModel, TEntity> Delete(TModel model);
	}
}
