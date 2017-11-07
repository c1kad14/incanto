
using Incanto.DataAccess.Interfaces;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.BusinessLogic.Services.Core
{
    public abstract class DataService<TEntity>
		where TEntity : class, IBaseEntity, new()
    {
	    protected IDataRepository<TEntity> DataRepository { get; set; }
    }
}
