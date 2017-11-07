using Incanto.Domain;
using Microsoft.EntityFrameworkCore;

namespace Incanto.DataAccess.Context
{
	public class IncantoDataContext : DbContext
	{
		public IncantoDataContext()
		{

		}
		public IncantoDataContext(DbContextOptions<IncantoDataContext> contextOptions) : base((DbContextOptions) contextOptions)
		{
			
		}
		public DbSet<Brand> Brands { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Country> Countries { get; set; }
		public DbSet<Detail> Details { get; set; }
		public DbSet<DetailType> DetailTypes { get; set; }
		public DbSet<DetailTypeValue> DetailTypeValues { get; set; }
		public DbSet<Gender> Genders { get; set; }
		public DbSet<Item> Items { get; set; }
		public DbSet<Type> Types { get; set; }
		public DbSet<Picture> Photos { get; set; }
		public DbSet<Discount> Discounts { get; set; }
		public DbSet<Price> Prices { get; set; }
		public DbSet<ExistingItem> ExistingItems { get; set; }
		public DbSet<Size> Sizes { get; set; }
		public DbSet<Transaction> Transactions { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer("Server = (localdb)\\mssqllocaldb; Database = IncantoData; Trusted_Connection = True;");
			base.OnConfiguring(optionsBuilder);
		}
	}
}