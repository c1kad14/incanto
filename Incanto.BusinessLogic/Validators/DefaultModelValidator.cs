using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Incanto.BusinessLogic.Models.Base.Interfaces;
using Incanto.BusinessLogic.Validators.Interfaces;

namespace Incanto.BusinessLogic.Validators
{
	public class DefaultModelValidator<TModel> : IModelValidator<TModel>
		where TModel : class, IBaseModel, new()
	{
		public IEnumerable<ValidationResult> Validate(TModel model)
		{
			var errors = new List<ValidationResult>();
			model.Validate(errors);
			return errors;
		}
	}
}