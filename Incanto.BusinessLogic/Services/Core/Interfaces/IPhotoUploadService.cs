using System.IO;

namespace Incanto.BusinessLogic.Services.Core.Interfaces
{
	public interface IPhotoUploadService
	{
		bool CheckFile(Stream inputStream, string contentType, long fileSize);
		string GenerateFileName(string originalFileName);
	}
}
