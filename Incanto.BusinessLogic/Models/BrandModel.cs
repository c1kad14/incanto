using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class BrandModel : BaseModelWithName<Brand>
	{
		public BrandModel()
		{
		}

		public BrandModel(Brand brand) : base(brand)
		{
		}

		[Required(ErrorMessage = "Country is a required field")]
		public CountryModel Country { get; set; }

		public override IBaseModel ConvertFromEntity(Brand brand)
		{
			base.ConvertFromEntity(brand);
			if (brand.Country == null) return this;
			Country = new CountryModel(brand.Country);
			return this;
		}

		public override Brand ConvertToEntity()
		{
			var brand = base.ConvertToEntity();
			brand.Country = Country?.ConvertToEntity();
			return brand;
		}
	}
}
