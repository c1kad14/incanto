using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class ItemModel : BaseModelWithName<Item>
	{
		public ItemModel()
		{
		}

		public ItemModel(Item item) : base(item)
		{
		}

		[Required(ErrorMessage = "Brand is a required field")]
		public BrandModel Brand { get; set; }
		[Required(ErrorMessage = "Category is a required field")]
		public CategoryModel Category { get; set; }
		public string Description { get; set; }
		public DateTime Updated { get; set; }
		public double Discount { get; set; }
		public double Price { get; set; }
		public string Remote { get; set; }
		public string Identifier { get; set; }
		public double OldPrice { get; set; }
		public double DisplayPrice { get; set; }
		public List<PhotoModel> Photos { get; set; }
		public List<DetailModel> Details { get; set; }
		public List<ExistingItemModel> ExistingItems { get; set; }

		public override IBaseModel ConvertFromEntity(Item item)
		{
			base.ConvertFromEntity(item);
			Photos = new List<PhotoModel>();
			Identifier = item.Identifier;
			Details = new List<DetailModel>();
			ExistingItems = new List<ExistingItemModel>();
			Brand = item?.Brand != null? new BrandModel(item.Brand) : null;
			Category = item?.Category != null ? new CategoryModel(item.Category) : null;
			Remote = item?.Remote;
			Discount = item?.Discount ?? 0;
			Price = item?.Price ?? 0;
			DisplayPrice = item?.Price > 0 ? (Math.Abs(Discount) > 0 ? Math.Round(item.Price - item.Price / 100 * Discount, 2, MidpointRounding.AwayFromZero) : item.Price) : 0;
			item?.Photos?.ForEach(p => Photos.Add(new PhotoModel(p)));
			item?.Details?.ForEach(d => Details.Add(new DetailModel(d)));
			item?.ExistingItems?.ForEach(e=> ExistingItems.Add(new ExistingItemModel(e)));
			Description = item?.Description;
			Updated = item?.Updated ?? DateTime.Now;
			OldPrice = Math.Abs(Discount) > 0 ? item?.Price ?? 0 : 0;
			return this;
		}

		public override Item ConvertToEntity()
		{
			var item = base.ConvertToEntity();
			item.Updated = Id == 0 ? DateTime.Now : Updated;
			item.Brand = Brand?.ConvertToEntity();
			item.Category = Category?.ConvertToEntity();
			item.Discount = Discount;
			item.Description = Description;
			item.Price = Price;
			item.Identifier = (string.IsNullOrEmpty(Remote) ? "IN" : Remote) + Updated.Month + (Updated.Year - 2000) + Category?.Id + "-" + Id;
			item.Remote = Remote;
			item.Photos = new List<Photo>();
			Photos?.ForEach(p => item.Photos.Add(p.ConvertToEntity()));
			item.Details = new List<Detail>();
			Details?.ForEach(d => item.Details.Add(d.ConvertToEntity()));
			item.ExistingItems = new List<ExistingItem>();
			ExistingItems?.ForEach(e => item.ExistingItems.Add(e.ConvertToEntity()));
			return item;
		}
	}
}
