using Incanto.Domain;
using Microsoft.EntityFrameworkCore;

namespace Incanto.DataAccess.Context
{
	public class IncantoDataContext : DbContext
	{
		public IncantoDataContext(DbContextOptions contextOptions) : base(contextOptions)
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
		public DbSet<Photo> Photos { get; set; }
		public DbSet<ExistingItem> ExistingItems { get; set; }
		public DbSet<Size> Sizes { get; set; }
		public DbSet<Transaction> Transactions { get; set; }
		public DbSet<Order> Orders { get; set; }
		public DbSet<Customer> Customers { get; set; }
		public DbSet<OrderItem> OrderItems { get; set; }

		//protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		//{
		//	optionsBuilder.UseSqlServer("Server = (localdb)\\mssqllocaldb; Database = IncantoData; Trusted_Connection = True;");
		//}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Brand>().HasIndex(e => e.Name).IsUnique();
			modelBuilder.Entity<Country>().HasIndex(e => e.Name).IsUnique();
			modelBuilder.Entity<Gender>().HasIndex(e => e.Name).IsUnique();
		}
	}
}