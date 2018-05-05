using System;
using System.Collections.Generic;
using System.Text;
using Incanto.Domain.Base.Interfaces;

namespace Incanto.Domain
{
    public class Customer : IBaseEntity
	{
		public int Id { get; set; }
	    public string FirstName { get; set; }
	    public string LastName { get; set; }
	    public string MiddleName { get; set; }
	    public string Email { get; set; }
		public string Phone { get; set; }
	    public string DeliveryType { get; set; }
	    public string Region { get; set; }
	    public string City { get; set; }
		public string DeliveryAddress { get; set; }
	    public string PaymentType { get; set; }
    }
}
