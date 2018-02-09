using Incanto.BusinessLogic.Models;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Incanto.WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DetailTypesController : CRUDController<DetailTypeModel, DetailType>
    {
	    public DetailTypesController(IDataRepository<DetailType> dataRepository) : base(dataRepository, q => q.Include(c => c.Category).ThenInclude(c => c.Type).ThenInclude(t => t.Gender))
	    {
		    
	    }

	    [HttpGet("{categoryId}")]
	    [Route("GetObjectsByCategoryId")]
	    public virtual ActionResult GetObjectsByCategoryId(int categoryId)
	    {
		    var operationResult = ReadWriteDataService.Get(detailType => detailType.Category.Id == categoryId);
		    return Json(operationResult);
	    }
	}
}