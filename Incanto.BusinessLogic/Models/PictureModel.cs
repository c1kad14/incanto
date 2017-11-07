using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class PictureModel : BaseModel<Picture>
	{
		public PictureModel()
		{
		}

		public PictureModel(Picture picture) : base(picture)
		{
			Path = picture.Path;
			ItemId = picture.Item?.Id;
		}

		[Required(ErrorMessage = "Path is a required field")]
		public string Path { get; set; }
		public int? ItemId { get; set; }

		public override IBaseModel ConvertFromEntity(Picture picture)
		{
			base.ConvertFromEntity(picture);
			Path = picture.Path;
			ItemId = picture.Item?.Id;
			return this;
		}

		public override Picture ConvertToEntity()
		{
			var picture =  base.ConvertToEntity();
			picture.Path = Path;
			if(ItemId != null) picture.Item = new Item() {Id = ItemId.Value};
			return picture;
		}
	}
}
