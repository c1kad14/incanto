using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.DataAccess.Interfaces
{
	interface IDataRepository<TEntity>
		where TEntity : IBaseEntity
	{
		void Add(TEntity entity);
		void Update(TEntity entity);
		void Detele(TEntity entity);
		void Detele(int id);
		List<TEntity> GetList(Expression<Func<TEntity, bool>> predicate = null);
		TEntity Get(Expression<Func<TEntity, bool>> predicate = null);
	}
}
