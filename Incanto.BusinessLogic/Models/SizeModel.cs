using Incanto.BusinessLogic.Models.Base;
using Incanto.Domain;

namespace Incanto.BusinessLogic.Models
{
	public class SizeModel : BaseModelWithName<Size>
	{
		public SizeModel()
		{
		}

		public SizeModel(Size size) : base(size)
		{
		}
	}
}
