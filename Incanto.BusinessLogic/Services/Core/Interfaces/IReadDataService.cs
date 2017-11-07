using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Incanto.BusinessLogic.Models.Base.Interfaces;
using Incanto.Domain.Base.Interfaces;


namespace Incanto.BusinessLogic.Services.Core.Interfaces
{
	interface IReadDataService<TModel, TEntity>
		where TModel : class, IBaseModel<TEntity>, new()
		where TEntity : class, IBaseEntity, new()
	{
		OperationResult<TModel, TEntity> Get(int id);

		List<OperationResult<TModel, TEntity>> Get(Expression<Func<TEntity, bool>> predicate = null);
	}
}
