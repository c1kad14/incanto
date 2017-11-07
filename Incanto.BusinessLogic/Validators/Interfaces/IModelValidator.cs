using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Validators.Interfaces
{
	public interface IModelValidator<TModel>
		where TModel : class, IBaseModel, new()
	{
		IEnumerable<ValidationResult> Validate(TModel model);
	}
}