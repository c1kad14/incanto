using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Incanto.BusinessLogic.Models.Base.Interfaces;
using Incanto.BusinessLogic.Services.Core;
using Incanto.BusinessLogic.Services.Core.Interfaces;
using Incanto.BusinessLogic.Validators;
using Incanto.BusinessLogic.Validators.Interfaces;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.BusinessLogic.Services
{
	public class ReadWriteDataService<TModel, TEntity> : ReadDataService<TModel, TEntity>, IWriteDataService<TModel, TEntity>
		where TModel : class, IBaseModel<TEntity>, new()
		where TEntity : class, IBaseEntity, new()
	{
		public IModelValidator<TModel> ModelValidator { get; set; }
		public ReadWriteDataService(IDataRepository<TEntity> dataRepository) : base(dataRepository)
		{
			ModelValidator = new DefaultModelValidator<TModel>();
		}

		public OperationResult<TModel, TEntity> Action(TModel model, OperationType operationType)
		{
			try
			{
				var validationResult = ModelValidator.Validate(model);

				if (validationResult.Any())
				{
					return new OperationResult<TModel, TEntity>(model, operationType, false, String.Format("{0} {1}", OperationResultConsants.VALIDATION_FAIL, validationResult));
				}
				var entity = model.ConvertToEntity();
				switch (operationType)
				{
					case OperationType.Add:
						DataRepository.Add(entity);
						break;
					case OperationType.Update:
						DataRepository.Update(entity);
						break;
					case OperationType.Read:
						break;
					case OperationType.Delete:
						DataRepository.Detele(entity);
						break;
					default:
						throw new IndexOutOfRangeException();
				}
				return new OperationResult<TModel, TEntity>(model, operationType, true, OperationResultConsants.ACTION_SUCCESS[operationType]);
			}
			catch (Exception e)
			{
				return new OperationResult<TModel, TEntity>(model, operationType, false, String.Format("{0} Reason: {1}", OperationResultConsants.ACTION_FAIL[operationType], e.Message));
			}
		}

		public OperationResult<TModel, TEntity> Add(TModel model)
		{
			return Action(model, OperationType.Add);
		}

		public OperationResult<TModel, TEntity> Update(TModel model)
		{
			return Action(model, OperationType.Update);
		}

		public OperationResult<TModel, TEntity> Delete(TModel model)
		{
			return Action(model, OperationType.Delete);
		}
	}
}
