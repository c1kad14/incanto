using Incanto.BusinessLogic.Models;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain;
using Microsoft.AspNetCore.Authorization;
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

		[Authorize]
	    [HttpGet("{detailTypeId}")]
	    [Route("GetObjectsByDetailTypeId")]
	    public virtual ActionResult GetObjectsByDetailTypeId(int detailTypeId)
	    {
		    var operationResult = ReadWriteDataService.Get(detailTypeValue => detailTypeValue.DetailType.Id == detailTypeId);
		    return Json(operationResult);
	    }
	}
}