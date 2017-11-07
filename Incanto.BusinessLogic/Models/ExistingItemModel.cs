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
			Item = new ItemModel(existingItem.Item);
			Size = new SizeModel(existingItem.Size);
			Amount = existingItem.Amount;
		}

		[Required(ErrorMessage = "Item is a required field")]
		public ItemModel Item { get; set; }
		[Required(ErrorMessage = "Amount is a required field")]
		public int Amount { get; set; }
		[Required(ErrorMessage = "Size is a required field")]
		public SizeModel Size { get; set; }

		public override IBaseModel ConvertFromEntity(ExistingItem existingItem)
		{
			base.ConvertFromEntity(existingItem);
			Item = new ItemModel(existingItem.Item);
			Size = new SizeModel(existingItem.Size);
			Amount = existingItem.Amount;
			return this;
		}

		public override ExistingItem ConvertToEntity()
		{
			var existingItem = base.ConvertToEntity();
			existingItem.Item = Item.ConvertToEntity();
			existingItem.Size = Size.ConvertToEntity();
			existingItem.Amount = Amount;
			return existingItem;
		}
	}
}
