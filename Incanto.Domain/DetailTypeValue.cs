using Incanto.Domain.Base.Interfaces;

namespace Incanto.Domain
{
	public class DetailTypeValue : IBaseEntity
	{
		public int Id { get; set; }
		public DetailType DetailType { get; set; }
		public string Value { get; set; }
	}
}