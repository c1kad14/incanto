using System.Linq;
using Incanto.DataAccess.Context;
using Incanto.Domain;
using Microsoft.EntityFrameworkCore;

namespace Incanto.DataAccess.Repository
{
    public class ItemsDataRepository : DataRepository<Item>
    {
	    public ItemsDataRepository()
	    {
	    }

	    public ItemsDataRepository(DbContextOptions dbContextOptions) : base(dbContextOptions)
	    {
	    }

	    public override void Update(Item entity)
	    {
		    using (var context = new IncantoDataContext(_dbContextOptions))
		    {
				entity.Details.ForEach(d => context.Entry(d).State = EntityState.Unchanged);
			    entity.ExistingItems.ForEach(d => context.Entry(d).State = EntityState.Unchanged);
				context.Entry(entity).State = EntityState.Detached;
				context.Set<Item>().Attach(entity);
				context.Update(entity);
			    context.SaveChanges();
		    }
	    }

		public override void Delete(Item entity)
	    {
		    using (var context = new IncantoDataContext(_dbContextOptions))
			{
				var item = context.Items.Where(i => i.Id == entity.Id).Include(i => i.Photos).Include(i => i.Details).Include(i => i.ExistingItems).First();
			    item?.Photos.ForEach(p => context.Photos.Remove(p));
			    item?.Details.ForEach(d => context.Details.Remove(d));
				item?.ExistingItems.ForEach(d => context.ExistingItems.Remove(d));
				context.Items.Remove(item);
			    context.SaveChanges();
		    }
	    }
	}
}
