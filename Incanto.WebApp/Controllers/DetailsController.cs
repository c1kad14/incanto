using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Incanto.BusinessLogic.Models;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Incanto.WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DetailsController : CRUDController<DetailModel, Detail>
	{
		public DetailsController(IDataRepository<Detail> dataRepository) : base(dataRepository, q => q.Include(d => d.DetailValue).ThenInclude(dv => dv.DetailType).ThenInclude(dt => dt.Category))
		{
			
		}
    }
}