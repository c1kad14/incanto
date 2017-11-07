using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Incanto.BusinessLogic.Models.Base.Interfaces
{
	public interface IBaseModel
	{
		int Id { get; set; }
		bool Validate(ICollection<ValidationResult> results);
	}
}
