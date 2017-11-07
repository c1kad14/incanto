
using Incanto.Domain.Base.Interfaces;

namespace Incanto.Domain.Base
{
	public abstract class BaseEntity : IBaseEntity
	{
		public int Id { get; set; }

		public string Name { get; set; }
	}
}