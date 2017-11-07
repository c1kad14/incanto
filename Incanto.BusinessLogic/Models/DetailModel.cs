using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class DetailModel : BaseModel<Detail>
	{
		public DetailModel()
		{
		}

		public DetailModel(Detail detail) : base(detail)
		{
			if (detail.DetailValue != null) DetailValue = new DetailTypeValueModel(detail.DetailValue);
			ItemId = detail.Item?.Id;
		}

		[Required(ErrorMessage = "DetailValue is a required field")]
		public DetailTypeValueModel DetailValue { get; set; }
		public int? ItemId { get; set; }

		public override IBaseModel ConvertFromEntity(Detail detail)
		{
			base.ConvertFromEntity(detail);
			if (detail.DetailValue != null) DetailValue = new DetailTypeValueModel(detail.DetailValue);
			ItemId = detail.Item?.Id;
			return this;
		}

		public override Detail ConvertToEntity()
		{
			var detail = base.ConvertToEntity();
			detail.DetailValue = DetailValue.ConvertToEntity();
			if (ItemId != null) detail.Item = new Item() { Id = ItemId.Value };
			return detail;
		}
	}
}
