using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.DataAccess.Interfaces
{
	public interface IDataRepository<TEntity>
		where TEntity : IBaseEntity
	{
		Func<IQueryable<TEntity>, IQueryable<TEntity>> IncludeFunc { get; set; }
		void Add(TEntity entity);
		void Update(TEntity entity);
		void Delete(TEntity entity);
		void Delete(int id);
		List<TEntity> GetList(Expression<Func<TEntity, bool>> predicate = null);
		TEntity Get(Expression<Func<TEntity, bool>> predicate = null);
	}
}
