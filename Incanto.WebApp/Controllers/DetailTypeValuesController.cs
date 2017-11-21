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
    public class DetailTypeValuesController : CRUDController<DetailTypeValueModel, DetailTypeValue>
    {
	    public DetailTypeValuesController(IDataRepository<DetailTypeValue> dataRepository) : base(dataRepository, q => q.Include(dtv => dtv.DetailType).ThenInclude(c => c.Category).ThenInclude(c => c.Type).ThenInclude(t => t.Gender))
		{
		    
	    }
    }
}