using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Design;

namespace Incanto.BusinessLogic.Services.Core
{
	public static class OperationResultConsants
	{
		public const string READ_SUCCESS = "Read was successful.";
		public const string READ_FAIL = "Read has failed.";
		public const string VALIDATION_FAIL = "Validation failed.";
		public static Dictionary<OperationType, string> ACTION_SUCCESS => new Dictionary<OperationType, string>()
		{
			{ OperationType.Add, "Add was successful."},
			{ OperationType.Update, "Update was successful."},
			{ OperationType.Delete, "Delete was successful."}
		};
		public static Dictionary<OperationType, string> ACTION_FAIL => new Dictionary<OperationType, string>()
		{
			{ OperationType.Add, "Add has failed."},
			{ OperationType.Update, "Update has failed."},
			{ OperationType.Delete, "Delete has failed."}
		};
	}
}
