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
	public class SizesController : CRUDController<SizeModel, Size>
	{
		public SizesController(IDataRepository<Size> dataRepository) : base(dataRepository, q => q.Include(c => c.Category).ThenInclude(c => c.Type).ThenInclude(t => t.Gender))
		{
		}
		[Authorize]
		[HttpGet("{categoryId}")]
		[Route("GetObjectsByCategoryId")]
		public virtual ActionResult GetObjectsByDetailTypeId(int categoryId)
		{
			var operationResult = ReadWriteDataService.Get(size => size.Category.Id == categoryId);
			return Json(operationResult);
		}
	}
}