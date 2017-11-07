using System;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.Domain
{
	public class Price : IBaseEntity
	{
		public int Id { get; set; }
		public Item Item { get; set; }
		public double Value { get; set; }
		public DateTime Updated { get; set; }
	}
}
