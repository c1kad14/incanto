using System;
using System.Collections.Generic;
using System.Text;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.Domain
{
    public class OrderItem : IBaseEntity
    {
	    public int Id { get; set; }
	    public ExistingItem ExistingItem { get; set; }
	    public int Count { get; set; }
		public double OrderPrice { get; set; }
	}
}
