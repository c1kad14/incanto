using System;
using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class DiscountModel : BaseModel<Discount>
	{
		public DiscountModel()
		{
		}

		public DiscountModel(Discount discount) : base(discount)
		{
			Value = discount.Value;
			Active = discount.Active;
			ItemId = discount.Item?.Id;
			Updated = discount.Updated;
		}

		[Required(ErrorMessage = "Value is a required field")]
		public double Value { get; set; }
		[Required(ErrorMessage = "Value is a required field")]
		public bool Active { get; set; }
		public int? ItemId { get; set; }
		public DateTime Updated { get; set; }

		public override IBaseModel ConvertFromEntity(Discount discount)
		{
			base.ConvertFromEntity(discount);
			Value = discount.Value;
			Active = discount.Active;
			ItemId = discount.Item?.Id;
			Updated = discount.Updated;
			return this;
		}

		public override Discount ConvertToEntity()
		{
			var discount = base.ConvertToEntity();
			discount.Value = Value;
			discount.Active = Active;
			discount.Updated = Updated;
			if(ItemId != null) discount.Item = new Item(){ Id = ItemId.Value };
			return discount;
		}
	}
}
