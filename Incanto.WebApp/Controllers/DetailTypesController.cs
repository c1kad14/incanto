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
using Type = Incanto.Domain.Type;

namespace Incanto.WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DetailTypesController : CRUDController<DetailTypeModel, DetailType>
    {
	    public DetailTypesController(IDataRepository<DetailType> dataRepository) : base(dataRepository, q => q.Include(c => c.Category).ThenInclude(c => c.Type).ThenInclude(t => t.Gender))
	    {
		    
	    }
    }
}