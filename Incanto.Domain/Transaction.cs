using System;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.Domain
{
    public class Transaction : IBaseEntity
    {
	    public int Id { get; set; }
	    public ExistingItem ExistingItem { get; set; }
		public double Price { get; set; }
		public int Amount { get; set; }
		public DateTime TransactionTime { get; set; }
		public double Total { get; set; }
		public bool Finished { get; set; }

    }
}
