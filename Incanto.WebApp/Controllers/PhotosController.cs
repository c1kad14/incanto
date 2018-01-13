using System;
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
	public class PhotosController : CRUDController<PictureModel, Picture>
	{
		private readonly IPhotoUploadService _photoUploadService;
		private readonly string _photoUploadPath;
		public PhotosController(IDataRepository<Picture> dataRepository, IHostingEnvironment hostingEnvironment, IPhotoUploadService photoUploadService) : base(dataRepository, null)
		{
			this._photoUploadService = photoUploadService;

			_photoUploadPath = $"{hostingEnvironment.WebRootPath}\\itemPhotos";
		}

		[HttpPost("UploadPhotos")]
		public async Task<IActionResult> UploadPhotos(List<IFormFile> files, List<int> priorities, int itemId)
		{
			var models = new List<PictureModel>();

			foreach (IFormFile file in files)
			{
				if (_photoUploadService.CheckFile(file.OpenReadStream(), file.ContentType, file.Length))
				{
					var fileName = _photoUploadService.GenerateFileName(file.FileName);
					var filePath = $"{_photoUploadPath}\\{itemId}\\{fileName}";
					if (!Directory.Exists(filePath))
					{
						Directory.CreateDirectory(Path.GetDirectoryName(filePath));
					}
					using (Stream stream = new FileStream(filePath, FileMode.Create))
					{
						await file.CopyToAsync(stream);
					}
					models.Add(new PictureModel
					{
						Path = filePath,
						ItemId = itemId
					});
				}
			}

			List<OperationResult<PictureModel, Picture>> operationResult = new List<OperationResult<PictureModel, Picture>>();
			models.ForEach(m => operationResult.Add(PerformOperation(m, OperationType.Add)));
			return Json(operationResult);
		}
	}
}
