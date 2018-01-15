﻿using System;
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
		public DiscountModel Discount { get; set; }
		public List<PriceModel> Prices { get; set; }
		public List<PhotoModel> Photos { get; set; }
		public List<DetailModel> Details { get; set; }

		public override IBaseModel ConvertFromEntity(Item item)
		{
			base.ConvertFromEntity(item);
			Photos = new List<PhotoModel>();
			Prices = new List<PriceModel>();
			Details = new List<DetailModel>();
			Brand = new BrandModel(item.Brand);
			Category = new CategoryModel(item.Category);
			if(item.Discount != null) Discount = new DiscountModel(item.Discount);
			item.Price?.ForEach(p => Prices.Add(new PriceModel(p)));
			item.Photos?.ForEach(p => Photos.Add(new PhotoModel(p)));
			item.Details?.ForEach(d => Details.Add(new DetailModel(d)));
			Description = item.Description;
			Updated = item.Updated;
			return this;
		}

		public override Item ConvertToEntity()
		{
			var item = base.ConvertToEntity();
			item.Brand = Brand?.ConvertToEntity();
			item.Category = Category.ConvertToEntity();
			item.Discount = Discount?.ConvertToEntity();
			item.Description = Description;
			item.Updated = Updated;
			Prices?.ForEach(p => item.Price.Add(p.ConvertToEntity()));
			Photos?.ForEach(p => item.Photos.Add(p.ConvertToEntity()));
			item.Details = new List<Detail>();
			Details?.ForEach(d => item.Details.Add(d.ConvertToEntity()));
			return item;
		}
	}
}
