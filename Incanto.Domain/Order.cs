using System;
using System.Collections.Generic;
using System.Text;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.Domain
{
	public class Order : IBaseEntity
	{
		public int Id { get; set; }
		public Customer Customer { get; set; }
		public IList<OrderItem> OrderItems { get; set; }
		public double Total { get; set; }
		public string Status { get; set; }
		public string Comments { get; set; }
		public DateTime OrderTime { get; set; }

	}
}
