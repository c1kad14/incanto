using Incanto.BusinessLogic.Models.Base;
using Incanto.Domain;

namespace Incanto.BusinessLogic.Models
{
	public class GenderModel : BaseModelWithName<Gender>
	{
		public GenderModel()
		{
		}

		public GenderModel(Gender gender) : base(gender)
		{
		}
	}
}
