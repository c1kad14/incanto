using Incanto.Domain.Base.Interfaces;

namespace Incanto.Domain
{
	public class Photo : IBaseEntity
	{
		public int Id { get; set; }
		public Item Item { get; set; }
		public string Path { get; set; }
		public int Priority { get; set; }

	}
}
