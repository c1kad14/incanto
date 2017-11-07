using Incanto.BusinessLogic.Models.Base;
using Incanto.Domain;

namespace Incanto.BusinessLogic.Models
{
	public class CountryModel : BaseModelWithName<Country>
	{
		public CountryModel()
		{
		}

		public CountryModel(Country country) : base(country)
		{
		}

	}
	
}
