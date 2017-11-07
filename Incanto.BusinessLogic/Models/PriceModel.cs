using System;
using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class PriceModel : BaseModel<Price>
	{
		public PriceModel()
		{
		}

		public PriceModel(Price price) : base(price)
		{
			ItemId = price.Item?.Id;
			Value = price.Value;
			Updated = price.Updated;
		}

		[Required(ErrorMessage = "Value is a required field")]
		public double Value { get; set; }

		public int?  ItemId { get; set; }
		public DateTime Updated { get; set; }

		public override IBaseModel ConvertFromEntity(Price price)
		{
			base.ConvertFromEntity(price);
			ItemId = price.Item?.Id;
			Value = price.Value;
			Updated = price.Updated;
			return this;
		}

		public override Price ConvertToEntity()
		{
			var price = base.ConvertToEntity();
			price.Updated = Updated;
			price.Value = Value;
			if (ItemId != null) price.Item = new Item() {Id = ItemId.Value};
			return price;
		}
	}
}
