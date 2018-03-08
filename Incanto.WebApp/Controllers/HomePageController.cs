using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Incanto.BusinessLogic.Services.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Incanto.WebApp.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class HomePageController : Controller
	{
		private readonly IPhotoUploadService _photoUploadService;
		private readonly string _webrootPath;
		public HomePageController(IHostingEnvironment hostingEnvironment, IPhotoUploadService photoUploadService)
		{
			_photoUploadService = photoUploadService;
			_webrootPath = string.Concat(hostingEnvironment.WebRootPath, "/");
		}

		[Authorize]
		[HttpPost("AddTextBlock")]
		public IActionResult AddTextBlock(string text, string link)
		{
			var item = new JObject
			{
				["type"] = "text",
				["value"] = text,
				["link"] = link
			};
			WriteDataToJson(item);
			return new EmptyResult();
		}

		[Authorize]
		[HttpPost("AddSingleImageBlock")]
		public IActionResult AddSingleImageBlock(string link, IFormFile file)
		{
			var imageSource = WriteFile(file);
			var item = new JObject
			{
				["type"] = "fullwidth",
				["value"] = imageSource.Result,
				["link"] = link
			};
			WriteDataToJson(item);
			return new EmptyResult();
		}

		[Authorize]
		[HttpPost("AddMultipleImageBlock")]
		public IActionResult AddMultipleImageBlock(IFormFile file, IFormFile secondaryFile, string link, string secondaryLink)
		{
			var imageSource = WriteFile(file);
			var secondaryImageSource = WriteFile(secondaryFile);

			var item = new JObject
			{
				["type"] = "halfwidth",
				["value"] = imageSource.Result,
				["link"] = link,
				["secondatyLink"] = secondaryLink,
				["secondary"] = secondaryImageSource.Result
			};

			WriteDataToJson(item);
			return new EmptyResult();
		}

		[Authorize]
		[HttpPost("UpdateItems")]
		public IActionResult UpdateItems(string type, string value)
		{
			var existingItems = GetExistingItems();
			var itemToRemove = existingItems.Where(item => item["type"].ToString() == type && item["value"].ToString() == value).ToList();
			Write(existingItems.Except(itemToRemove).ToList());
			return new EmptyResult();
		}

		private async Task<string> WriteFile(IFormFile file)
		{
			if (_photoUploadService.CheckFile(file.OpenReadStream(), file.ContentType, file.Length))
			{
				var fileName = _photoUploadService.GenerateFileName(file.FileName);
				var filePath = String.Concat(_webrootPath, "MainPage/", fileName); 
				using (Stream stream = new FileStream(filePath, FileMode.Create))
				{
					await file.CopyToAsync(stream);
				}
				return fileName;
			}
			return null;
		}

		private void WriteDataToJson(JObject item)
		{
			List<JObject> items = GetExistingItems();
			items.Add(item);
			Write(items);
		}

		private List<JObject> GetExistingItems()
		{
			using (StreamReader r = new StreamReader(_webrootPath + "/incanto.json"))
			{
				string json = r.ReadToEnd();
				return JsonConvert.DeserializeObject<List<JObject>>(json);
			}
		}

		private void Write(List<JObject> items)
		{
			var jsonToOutput = JsonConvert.SerializeObject(items, Formatting.Indented);
			System.IO.File.WriteAllText(_webrootPath + "/incanto.json", jsonToOutput);
		}
	}
}
