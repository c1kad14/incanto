using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class CategoryModel : BaseModelWithName<Category>
	{
		public CategoryModel()
		{
		}
		public CategoryModel(Category category) : base(category)
		{
		}

		[Required(ErrorMessage = "Type is a required field")]
		public TypeModel Type { get; set; }

		public override IBaseModel ConvertFromEntity(Category category)
		{
			base.ConvertFromEntity(category);
			if (category.Type == null) return this;
			Type = new TypeModel(category.Type);
			return this;
		}

		public override Category ConvertToEntity()
		{
			var category = base.ConvertToEntity();
			category.Type = Type?.ConvertToEntity();
			return category;
		}
	}
}
