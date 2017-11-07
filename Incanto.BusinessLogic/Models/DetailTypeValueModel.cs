using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base.Interfaces;
using Incanto.BusinessLogic.Models.Base;

namespace Incanto.BusinessLogic.Models
{
	public class DetailTypeValueModel : BaseModel<DetailTypeValue>
	{
		public DetailTypeValueModel()
		{
		}

		public DetailTypeValueModel(DetailTypeValue detailTypeValue) : base(detailTypeValue)
		{
			Value = detailTypeValue.Value;
			if(detailTypeValue.DetailType != null) DetailType = new DetailTypeModel(detailTypeValue.DetailType);
		}

		[Required(ErrorMessage = "Value is a required field")]
		public string  Value { get; set; }
		[Required(ErrorMessage = "DetailType is a required field")]
		public DetailTypeModel DetailType { get; set; }

		public override IBaseModel ConvertFromEntity(DetailTypeValue detailTypeValue)
		{
			base.ConvertFromEntity(detailTypeValue);
			Value = detailTypeValue.Value;
			if (detailTypeValue.DetailType != null) DetailType = new DetailTypeModel(detailTypeValue.DetailType);
			return this;
		}

		public override DetailTypeValue ConvertToEntity()
		{
			var detailTypeValue = base.ConvertToEntity();
			detailTypeValue.DetailType = DetailType.ConvertToEntity();
			detailTypeValue.Value = Value;
			return detailTypeValue;
		}
	}
}
