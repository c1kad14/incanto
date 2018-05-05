using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Incanto.BusinessLogic.Services
{
	public class EmailService
	{
		private MailAddress fromAddress = new MailAddress("incantowear@gmail.com", "Incanto Wear");
		private string fromPassword = "AndrewAdmin!221040";
		private MailAddress toAddress;
		private string subject = string.Empty;
		private string bodyParam = string.Empty;
		private string template = string.Empty;
		
		public EmailService(string receiver, string subject, string template, string bodyParam)
		{
			this.toAddress = new MailAddress(receiver);
			this.subject = subject;
			this.bodyParam = bodyParam;
			this.template = template;
		}

		public async Task Send()
		{
			var smtp = new SmtpClient
			{
				Host = "smtp.gmail.com",
				Port = 587,
				EnableSsl = true,
				DeliveryMethod = SmtpDeliveryMethod.Network,
				UseDefaultCredentials = false,
				Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
			};
			string body = String.Empty;
			
			using (var sr = new StreamReader(template))
			{
				body = sr.ReadToEnd();
			}
			string messageBody = string.Format(body, bodyParam);

			using (var message = new MailMessage(this.fromAddress, this.toAddress) {
				Subject = subject,
				Body = messageBody,
				IsBodyHtml = true

		})
			{
				message.To.Add(this.fromAddress);
				try
				{
					await smtp.SendMailAsync(message);
				}
				catch (Exception e)
				{
					var msg = e.Message;
				}
			}
		}


	}
}
