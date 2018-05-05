using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Incanto.BusinessLogic.Services;
using Incanto.Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace Incanto.WebApp.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class OrderController : Controller
	{
		private IOrderService _service;
		private string template;
	    public OrderController(IOrderService service, IHostingEnvironment hostingEnvironment)
	    {
			template = $"{hostingEnvironment.WebRootPath}" + "\\Templates\\order.html";
			_service = service;

	    }
	    [HttpPost]
	    [Route("MakeOrder")]
		public async Task<IActionResult> MakeOrder([FromBody]JObject order)
	    {
		    var validationResult = _service.ValidateInputOrder(order);
		    Order orderResult = null;
			JObject result = new JObject();
		    if (validationResult)
		    {
			    try
			    {
				    orderResult = _service.TransformAndProcess(order);
				}
			    catch (ArgumentException e)
			    {
				    result["error"] = e.Message;

			    }

		    }
		    result["success"] = orderResult != null;
		    if (orderResult != null)
		    {
			    var email = new EmailService(order["orderInfo"]["email"].ToString(), "Ваш заказ обрабатывается", template, orderResult.Total.ToString());
			    await email.Send();
		    }
			return new JsonResult(result);
	    }

		[HttpGet]
		[Route("GetList")]
		public IActionResult GetOrders()
		{
			var result = _service.GetOrders();
			return new JsonResult(result);
		}

		[HttpPut]
		[Route("Update")]
		public IActionResult UpdateOrder([FromBody]Order order)
		{
			if (order != null)
			{

				var result = _service.GetOrder(order.Id);
				if (result != null && result.Status != order.Status)
				{
					result.Status = order.Status;
					_service.UpdateOrder(result);
				}
				return new JsonResult(result);
			}
			return new EmptyResult();
		}
	}
}
