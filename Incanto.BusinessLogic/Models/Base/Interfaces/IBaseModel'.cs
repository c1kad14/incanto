using Incanto.Domain.Base.Interfaces;

namespace Incanto.BusinessLogic.Models.Base.Interfaces
{
	public interface IBaseModel<TEntity> : IBaseModel where TEntity : IBaseEntity
	{
		IBaseModel ConvertFromEntity(TEntity entity);

		TEntity ConvertToEntity();
	}
}