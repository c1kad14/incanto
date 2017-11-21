using Incanto.BusinessLogic.Models;
using Incanto.DataAccess.Interfaces;
using Incanto.DataAccess.Repository;
using Incanto.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Incanto.WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class BrandsController : CRUDController<BrandModel, Brand>
    {
	    public BrandsController(IDataRepository<Brand> dataRepository) : base(dataRepository, (q => q.Include(b => b.Country)))
	    {

	    }
    }
}