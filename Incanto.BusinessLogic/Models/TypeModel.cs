using System.ComponentModel.DataAnnotations;
using Incanto.Domain;
using Incanto.BusinessLogic.Models.Base;
using Incanto.BusinessLogic.Models.Base.Interfaces;

namespace Incanto.BusinessLogic.Models
{
	public class TypeModel : BaseModel<Domain.Type>
	{
		public TypeModel()
		{
		}

		public TypeModel(Domain.Type type) : base(type)
		{
			if(type.Gender != null) Gender = new GenderModel(type.Gender);
		}

		[Required(ErrorMessage = "Gender is a required field")]
		public GenderModel Gender { get; set; }

		public override IBaseModel ConvertFromEntity(Domain.Type type)
		{
			base.ConvertFromEntity(type);
			if (type.Gender == null) return this;
			Gender = new GenderModel(type.Gender);
			return this;
		}

		public override Type ConvertToEntity()
		{
			var type = base.ConvertToEntity();
			type.Gender = Gender.ConvertToEntity();
			return type;
		}
	}
}
