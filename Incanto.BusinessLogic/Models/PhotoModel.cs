using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class PhotoModel : BaseModel<Photo>
	{
		public PhotoModel()
		{
		}

		public PhotoModel(Photo photo) : base(photo)
		{
		}

		[Required(ErrorMessage = "Path is a required field")]
		public string Path { get; set; }
		public int? ItemId { get; set; }
		public int Priority { get; set; }

		public override IBaseModel ConvertFromEntity(Photo photo)
		{
			base.ConvertFromEntity(photo);
			Path = photo.Path;
			ItemId = photo.Item?.Id;
			Priority = photo.Priority;
			return this;
		}

		public override Photo ConvertToEntity()
		{
			var photo =  base.ConvertToEntity();
			photo.Path = Path;
			photo.Priority = Priority;
			if(ItemId != null) photo.Item = new Item() {Id = ItemId.Value};
			return photo;
		}
	}
}
