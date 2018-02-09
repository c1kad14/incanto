using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Incanto.DataAccess.Context;
using Incanto.Domain;
using Incanto.Domain.Base.Interfaces;
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

		public override void Delete(Item entity)
	    {
		    using (var context = new IncantoDataContext(_dbContextOptions))
		    {
				var item = context.Items.Where(i => i.Id == entity.Id).Include(i => i.Photos).Include(i => i.Details).First();
			    item?.Photos.ForEach(p => context.Photos.Remove(p));
			    item?.Details.ForEach(d => context.Details.Remove(d));
			    context.Items.Remove(item);
			    context.SaveChanges();
		    }
	    }
	}
}
