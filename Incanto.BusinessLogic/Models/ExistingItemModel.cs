using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class ExistingItemModel : BaseModel<ExistingItem>
	{
		public ExistingItemModel()
		{
		}

		public ExistingItemModel(ExistingItem existingItem) : base(existingItem)
		{
		}

		[Required(ErrorMessage = "Item is a required field")]
		public int ItemId { get; set; }
		[Required(ErrorMessage = "Amount is a required field")]
		public int Amount { get; set; }
		[Required(ErrorMessage = "Size is a required field")]
		public SizeModel Size { get; set; }

		public override IBaseModel ConvertFromEntity(ExistingItem existingItem)
		{
			base.ConvertFromEntity(existingItem);
			if (existingItem != null)
			{
				if (existingItem.Item?.Id != null) ItemId = existingItem.Item.Id;
				Size = new SizeModel(existingItem.Size);
				Amount = existingItem.Amount;
			}
			return this;
		}

		public override ExistingItem ConvertToEntity()
		{
			var existingItem = base.ConvertToEntity();
			if(ItemId != 0) existingItem.Item = new Item() {Id = ItemId};
			existingItem.Size = Size?.ConvertToEntity();
			existingItem.Amount = Amount;
			return existingItem;
		}
	}
}
