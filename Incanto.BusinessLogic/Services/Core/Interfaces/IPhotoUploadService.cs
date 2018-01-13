using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Incanto.BusinessLogic.Services.Core.Interfaces
{
	public interface IPhotoUploadService
	{
		bool CheckFile(Stream inputStream, string contentType, long fileSize);
		string GenerateFileName(string originalFileName);
	}
}
