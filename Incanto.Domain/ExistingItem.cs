using Incanto.Domain.Base.Interfaces;

namespace Incanto.Domain
{
	public class ExistingItem : IBaseEntity
	{
		public int Id { get; set; }
		public Item Item { get; set; }
		public Size Size { get; set; }
		public int Amount { get; set; }
	}
}
