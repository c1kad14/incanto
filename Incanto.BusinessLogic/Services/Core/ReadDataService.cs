using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Incanto.BusinessLogic.Models.Base.Interfaces;
using Incanto.BusinessLogic.Services.Core.Interfaces;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.BusinessLogic.Services.Core
{
    public class ReadDataService<TModel, TEntity> : DataService<TEntity>, IReadDataService<TModel, TEntity>
		where TModel : class, IBaseModel<TEntity>, new()
	    where TEntity : class, IBaseEntity, new()
	{
		public ReadDataService(IDataRepository<TEntity> dataRepository)
		{
			DataRepository = dataRepository;
		}

		public OperationResult<TModel, TEntity> Get(int id)
		{
			return Get(e => e.Id == id).FirstOrDefault();
		}

		public List<OperationResult<TModel, TEntity>> Get(Expression<Func<TEntity, bool>> predicate = null)
		{
			try
			{
				var resultEntities = DataRepository.GetList(predicate);
				var resultModels = resultEntities.Select(e => new TModel().ConvertFromEntity(e) as TModel).ToList();
				return resultModels.Select(m => new OperationResult<TModel, TEntity>(m, OperationType.Read, true, OperationResultConsants.READ_SUCCESS)).ToList();
			}
			catch (Exception e)
			{
				return new List<OperationResult<TModel,TEntity>>() { new OperationResult<TModel, TEntity>(null, OperationType.Read, false, String.Format("{0} Reason: {1}", OperationResultConsants.READ_FAIL, e.Message)) };
			}
		
			
		}
	}
}
