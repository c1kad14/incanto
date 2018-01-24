﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Incanto.BusinessLogic.Models;
using Incanto.BusinessLogic.Services.Core;
using Incanto.BusinessLogic.Services.Core.Interfaces;
using Incanto.DataAccess.Interfaces;
using Incanto.Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Incanto.WebApp.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class PhotosController : CRUDController<PhotoModel, Photo>
	{
		private readonly IPhotoUploadService _photoUploadService;
		private readonly string _photoUploadPath;
		public PhotosController(IDataRepository<Photo> dataRepository, IHostingEnvironment hostingEnvironment, IPhotoUploadService photoUploadService) : base(dataRepository, null)
		{
			this._photoUploadService = photoUploadService;

			_photoUploadPath = $"{hostingEnvironment.WebRootPath}";
		}

		[HttpPost("UploadPhotos")]
		public async Task<IActionResult> UploadPhotos(List<IFormFile> files, List<int> priorities, int itemId)
		{
			var models = new List<PhotoModel>();

			for (var i = 0; i < files.Count; i++)
			{
				IFormFile file = files[i];
				if (_photoUploadService.CheckFile(file.OpenReadStream(), file.ContentType, file.Length))
				{
					var fileName = _photoUploadService.GenerateFileName(file.FileName);
					var itemPhotosPath = $"\\itemPhotos\\{itemId}\\{fileName}";
					var filePath = String.Concat(_photoUploadPath, itemPhotosPath);
					if (!Directory.Exists(filePath))
					{
						Directory.CreateDirectory(Path.GetDirectoryName(filePath));
					}
					using (Stream stream = new FileStream(filePath, FileMode.Create))
					{
						await file.CopyToAsync(stream);
					}
					models.Add(new PhotoModel
					{
						Path = itemPhotosPath,
						Priority = priorities[i],
						ItemId = itemId
					});
				}
			}

			List<OperationResult<PhotoModel, Photo>> operationResult = new List<OperationResult<PhotoModel, Photo>>();
			models.ForEach(m => operationResult.Add(PerformOperation(m, OperationType.Add)));
			return Json(operationResult);
		}
	}
}
