using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class DetailTypeModel : BaseModelWithName<DetailType>
	{
		public DetailTypeModel()
		{
		}

		public DetailTypeModel(DetailType detailType) : base(detailType)
		{
			if(detailType.Category != null) Category = new CategoryModel(detailType.Category);
		}

		[Required(ErrorMessage = "Category is a required field")]
		public CategoryModel Category { get; set; }

		public override IBaseModel ConvertFromEntity(DetailType detailType)
		{
			base.ConvertFromEntity(detailType);
			if (detailType.Category == null) return this;
			Category = new CategoryModel(detailType.Category);
			return this;
		}

		public override DetailType ConvertToEntity()
		{
			var detailType = base.ConvertToEntity();
			detailType.Category = Category.ConvertToEntity();
			return detailType;
		}
	}
}
