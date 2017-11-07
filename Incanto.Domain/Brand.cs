using Incanto.Domain.Base;

namespace Incanto.Domain
{
	public class Brand : BaseEntity
	{
		public Country Country { get; set; }
	}
}