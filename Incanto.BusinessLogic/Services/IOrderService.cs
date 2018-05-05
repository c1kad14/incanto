using System;
using System.Collections.Generic;
using System.Text;
using Incanto.Domain;
using Newtonsoft.Json.Linq;

namespace Incanto.BusinessLogic.Services
{
    public interface IOrderService
    {
	    bool ValidateInputOrder(JObject order);
	    Order TransformAndProcess(JObject order);
	    List<Order> GetOrders();
	    Order GetOrder(int id);
	    Order UpdateOrder(Order order);

    }
}
