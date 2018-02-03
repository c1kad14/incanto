using Incanto.Domain.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models.Base
{
	public abstract class BaseModelWithName<TEntity> : BaseModel<TEntity> where TEntity : BaseEntity, new()
	{
		public string Name { get; set; }

		protected BaseModelWithName()
		{
		}

		protected BaseModelWithName(TEntity entity) : base(entity)
		{
		}

		public override IBaseModel ConvertFromEntity(TEntity entity)
		{
			base.ConvertFromEntity(entity);
			Name = entity.Name;
			return this;
		}

		public override TEntity ConvertToEntity()
		{
			var entity = base.ConvertToEntity();
			entity.Name = Name;
			return entity;
		}
	}
}
