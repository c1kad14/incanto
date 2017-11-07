using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Incanto.BusinessLogic.Models.Base.Interfaces;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.BusinessLogic.Models.Base
{
	public abstract class BaseModel<TEntity> : IBaseModel<TEntity> where TEntity : IBaseEntity, new()
	{
		[Required(ErrorMessage = "Id is a required field")]
		public virtual int Id { get; set; }
		protected BaseModel()
		{
		}
		protected BaseModel(TEntity entity)
		{
			GetModelFromEntity(entity);
		}
		private void GetModelFromEntity(TEntity entity)
		{
			ConvertFromEntity(entity);
		}
		public bool Validate(ICollection<ValidationResult> results)
		{
			var ctx = new ValidationContext(this, null, null);
			return Validator.TryValidateObject(this, ctx, results, true);
		}
		public virtual IBaseModel ConvertFromEntity(TEntity entity)
		{
			Id = entity.Id;
			return this;
		}
		public virtual TEntity ConvertToEntity()
		{
			return new TEntity() { Id = Id };
		}
	}
}
