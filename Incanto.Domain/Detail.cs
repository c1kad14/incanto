using Incanto.Domain.Base.Interfaces;

namespace Incanto.Domain
{
	public class Detail : IBaseEntity
	{
		public int Id { get; set; }
		public Item Item { get; set; }
		public DetailTypeValue DetailValue { get; set; }
	}
}