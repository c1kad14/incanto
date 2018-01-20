using System;
using System.Collections.Generic;
using Incanto.Domain.Base;

namespace Incanto.Domain
{
	public class Item : BaseEntity
	{
		public Brand Brand { get; set; }
		public Category Category { get; set; }
		public string Description { get; set; }
		public List<Detail> Details { get; set; }
		public double Price { get; set; }
		public double Discount { get; set; }
		public DateTime Updated { get; set; }
		public List<Photo> Photos { get; set; }

	}
}