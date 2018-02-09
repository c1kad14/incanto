using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Incanto.DataAccess.Context;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain.Base.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Incanto.DataAccess.Repository
{
	public class DataRepository<TEntity> : IDataRepository<TEntity>
		where TEntity : class, IBaseEntity, new()
	{
		public Func<IQueryable<TEntity>, IQueryable<TEntity>> IncludeFunc { get; set; }
		protected readonly DbContextOptions _dbContextOptions;

		public DataRepository()
		{
		}

		public DataRepository(DbContextOptions dbContextOptions)
		{
			_dbContextOptions = dbContextOptions;
		}
		public void Add(TEntity entity)
		{
			using (var context = new IncantoDataContext(_dbContextOptions))
			{
				context.Set<TEntity>().Attach(entity);
				context.Set<TEntity>().Add(entity);
				context.SaveChanges();
			}
		}

		public void Update(TEntity entity)
		{
			using (var context = new IncantoDataContext(_dbContextOptions))
			{
				context.Entry(entity).State = EntityState.Detached;
				context.Set<TEntity>().Attach(entity);
				context.Update(entity);
				context.SaveChanges();
			}
		}

		public virtual void Delete(TEntity entity)
		{
			using (var context = new IncantoDataContext(_dbContextOptions))
			{
				context.Set<TEntity>().Attach(entity);
				context.Remove(entity);
				context.SaveChanges();
			}
		}

		public void Delete(int id)
		{
			using (var context = new IncantoDataContext(_dbContextOptions))
			{
				var entity = context.Set<TEntity>().Find(id);
				context.Set<TEntity>().Attach(entity);
				context.Remove(entity);
				context.SaveChanges();
			}
		}

		public List<TEntity> GetList(Expression<Func<TEntity, bool>> predicate = null)
		{
			using (var context = new IncantoDataContext(_dbContextOptions))
			{
				IQueryable<TEntity> query = context.Set<TEntity>();
				if (predicate != null)
					query = query.Where(predicate);
				if (IncludeFunc != null)
					query = IncludeFunc(query);
				return query.ToList();
			}
		}

		public TEntity Get(Expression<Func<TEntity, bool>> predicate = null)
		{
			return GetList(predicate).FirstOrDefault();
		}
	}
}
