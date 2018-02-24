using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ImageMagick;
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

		public PhotosController(IDataRepository<Photo> dataRepository, IHostingEnvironment hostingEnvironment,
			IPhotoUploadService photoUploadService) : base(dataRepository, null)
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
					TransformPhoto(filePath, fileName);
				}
			}

			List<OperationResult<PhotoModel, Photo>> operationResult = new List<OperationResult<PhotoModel, Photo>>();
			models.ForEach(m => operationResult.Add(PerformOperation(m, OperationType.Add)));
			return Json(operationResult);
		}

		private void TransformPhoto(string inputPath, string fileName)
		{
			//const int quality = 20;
			//string thumbnailName = String.Concat("thumb_", fileName);
			//string outputPath = inputPath.Replace(fileName, thumbnailName);


			//using (var original = FreeImageBitmap.FromFile(inputPath))
			//{
			//	var resized = new FreeImageBitmap(original);
			//	// JPEG_QUALITYGOOD is 75 JPEG.
			//	// JPEG_BASELINE strips metadata (EXIF, etc.)
			//	resized.Save(outputPath, FREE_IMAGE_FORMAT.FIF_JPEG,
			//		FREE_IMAGE_SAVE_FLAGS.JPEG_QUALITYBAD);
			//}
			const int quality = 20;
			string thumbnailName = String.Concat("thumb_", fileName);
			string outputPath = inputPath.Replace(fileName, thumbnailName);


			using (var image = new MagickImage(inputPath))
			{
				image.Quality = quality;
				image.Blur(0, 20);
				image.Write(outputPath);
			}
		}
	}
}
