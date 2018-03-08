using System.ComponentModel.DataAnnotations;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;
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

		public string Other { get; set; }

		[Required(ErrorMessage = "Category is a required field")]
		public CategoryModel Category { get; set; }

		public override IBaseModel ConvertFromEntity(Size size)
		{
			base.ConvertFromEntity(size);
			if (size.Category == null) return this;
			Category = new CategoryModel(size.Category);
			Other = size.Other;
			return this;
		}

		public override Size ConvertToEntity()
		{
			var size = base.ConvertToEntity();
			size.Category = Category?.ConvertToEntity();
			size.Other = Other;
			return size;
		}
	}
}
