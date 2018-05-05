using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Incanto.DataAccess.Repository;
using Incanto.Domain;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace Incanto.BusinessLogic.Services
{
	public class OrderService : IOrderService
	{
		private DataRepository<OrderItem> _orderItemDataRepository;
		private DataRepository<Customer> _customerDataRepository;
		private DataRepository<Order> _orderDataRepository;
		private readonly DataRepository<ExistingItem> _existingItemDataRepository;

		public OrderService(DbContextOptions dbContextOptions)
		{
			_orderItemDataRepository = new DataRepository<OrderItem>(dbContextOptions);
			_customerDataRepository = new DataRepository<Customer>(dbContextOptions);

			_orderDataRepository = new DataRepository<Order>(dbContextOptions);

			_existingItemDataRepository = new DataRepository<ExistingItem>(dbContextOptions)
			{
				IncludeFunc = q =>
					q.Include(i => i.Item).ThenInclude(i => i.Photos).Include(i => i.Size)
			};
		}

		public bool ValidateInputOrder(JObject order)
		{
			if (order["orderInfo"]?["firstName"] == null || order["orderInfo"]["lastName"] == null || order["orderInfo"]["middleName"] == null || order["orderInfo"]["email"] == null || order["orderInfo"]["phone"] == null || order["orderInfo"]["delivery"] == null || order["orderInfo"]["payment"] == null || order["orderInfo"]["region"] == null || order["orderInfo"]["city"] == null)
			{
				return false;
			}

			if (string.IsNullOrEmpty(order["orderInfo"]["firstName"].ToString()) || string.IsNullOrEmpty(order["orderInfo"]["lastName"].ToString()) || string.IsNullOrEmpty(order["orderInfo"]["middleName"].ToString()) || string.IsNullOrEmpty(order["orderInfo"]["email"].ToString()) || string.IsNullOrEmpty(order["orderInfo"]["phone"].ToString()) || string.IsNullOrEmpty(order["orderInfo"]["delivery"].ToString()) || string.IsNullOrEmpty(order["orderInfo"]["payment"].ToString()) || string.IsNullOrEmpty(order["orderInfo"]["region"].ToString()) || string.IsNullOrEmpty(order["orderInfo"]["city"].ToString()) || (string.IsNullOrEmpty(order["orderInfo"]["warehouse"].ToString()) && string.IsNullOrEmpty(order["orderInfo"]["street"].ToString())))
			{
				return false;
			}

			if (order["items"] == null || order["items"].ToList().Count < 1)
			{
				return false;
			}

			foreach (var item in order["items"].ToList())
			{
				if (item["id"] == null || string.IsNullOrEmpty(item["id"].ToString()) || item["identifier"] == null || string.IsNullOrEmpty(item["identifier"].ToString()) || item["size"] == null || string.IsNullOrEmpty(item["size"].ToString()) || Convert.ToInt32(item["count"]) < 1)
				{
					return false;
				}
			}

			return true;
		}

		public Order TransformAndProcess(JObject order)
		{
			var newOrder = new Order
			{
				Customer = new Customer
				{
					FirstName = order["orderInfo"]["firstName"].ToString(),
					LastName = order["orderInfo"]["lastName"].ToString(),
					MiddleName = order["orderInfo"]["middleName"].ToString(),
					Email = order["orderInfo"]["email"].ToString(),
					Phone = order["orderInfo"]["phone"].ToString(),
					Region = order["orderInfo"]["region"].ToString(),
					City = order["orderInfo"]["city"].ToString(),
					DeliveryType = order["orderInfo"]["delivery"].ToString(),
					PaymentType = order["orderInfo"]["payment"].ToString()
				},
				Comments = order["orderInfo"]["comments"].ToString(),
				OrderTime = Convert.ToDateTime(DateTime.Now.ToString("MM/dd/yyyy hh:mm"))
			};

			newOrder.Customer.DeliveryAddress = newOrder.Customer.DeliveryType == "Самовывоз" ? order["orderInfo"]["warehouse"].ToString() : order["orderInfo"]["street"].ToString();

			newOrder.OrderItems = new List<OrderItem>();
			var existingItems = new List<ExistingItem>();

			foreach (var item in order["items"].ToList())
			{
				var existingItem = _existingItemDataRepository.Get(ei =>
					ei.Item.Id == Convert.ToInt32(item["id"]) && ei.Size.Name == item["size"].ToString());

				if (existingItem.Amount < Convert.ToInt32(item["count"]))
				{
					throw new ArgumentException("Amount of available items is less then ordered item count");
				}

				//reduce amount of available items of particular size
				existingItem.Amount -= Convert.ToInt32(item["count"]);

				//creating and adding new order item to list

				var newOrderItem = new OrderItem
				{
					ExistingItem = new ExistingItem()
					{
						Id = existingItem.Id
					},
					Count = Convert.ToInt32(item["count"]),
					OrderPrice = existingItem.Item?.Price > 0
						? (Math.Abs(existingItem.Item.Discount) > 0
							? Math.Round(existingItem.Item.Price - existingItem.Item.Price / 100 * existingItem.Item.Discount, 2,
								MidpointRounding.AwayFromZero)
							: existingItem.Item.Price)
						: 0
				};

				if (Math.Abs(newOrderItem.OrderPrice) < 0)
				{
					throw new ArgumentException("Price can not be null");
				}

				newOrder.Total += newOrderItem.Count * newOrderItem.OrderPrice;

				//adding item to order
				newOrder.OrderItems.Add(newOrderItem);

				//saving existing item to update after all
				existingItems.Add(existingItem);

			}


			newOrder.Status = OrderStatus.REVIEW;
			if (ProcessOrder(newOrder))
			{
				foreach (var existingItem in existingItems)
				{
					_existingItemDataRepository.Update(existingItem);
				}
				return newOrder;
			}

			return null;
		}

		private bool ProcessOrder(Order newOrder)
		{
			_orderDataRepository.IncludeFunc = q => q.Include(o => o.Customer)
				.Include(o => o.OrderItems);
			_orderDataRepository.Add(newOrder);
			if (newOrder.Id != 0)
			{
				return true;
			}
			return false;
		}

		public List<Order> GetOrders()
		{
			_orderDataRepository.IncludeFunc = q => q.Include(o => o.Customer)
					.Include(o => o.OrderItems).ThenInclude(or => or.ExistingItem).ThenInclude(i => i.Size);
			var orders = _orderDataRepository.GetList();
			foreach (var order in orders)
			{
				foreach (var orderItem in order.OrderItems)
				{
					var ex = _existingItemDataRepository.Get(i => i.Id == orderItem.ExistingItem.Id);
					if (ex != null)
					{
						orderItem.ExistingItem.Item = new Item
						{
							Id = ex.Item.Id,
							Identifier = ex.Item.Identifier
						};

					}
				}
			}
			return orders;

		}

		public Order GetOrder(int id)
		{
			_orderDataRepository.IncludeFunc = q => q.Include(o => o.Customer)
				.Include(o => o.OrderItems).ThenInclude(or => or.ExistingItem).ThenInclude(i => i.Size);
			var order = _orderDataRepository.Get(o => o.Id == id);
			return order;
		}

		public Order UpdateOrder(Order order)
		{
			_orderDataRepository.IncludeFunc = q => q.Include(o => o.Customer)
				.Include(o => o.OrderItems);
			_orderDataRepository.Update(order);
			if (order.Status == OrderStatus.DECLINED)
			{
				foreach (var orderOrderItem in order.OrderItems)
				{

					var existingItemToUpdate = _existingItemDataRepository.Get(i => i.Id == orderOrderItem.ExistingItem.Id);
					existingItemToUpdate.Amount += orderOrderItem.Count;
					_existingItemDataRepository.Update(existingItemToUpdate);
				}
			}
			return order;
		}

	}
}
