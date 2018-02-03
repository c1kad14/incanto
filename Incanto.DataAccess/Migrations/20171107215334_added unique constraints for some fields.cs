using Microsoft.EntityFrameworkCore.Migrations;

namespace Incanto.DataAccess.Migrations
{
    public partial class addeduniqueconstraintsforsomefields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Discounts_Items_ItemId",
                table: "Discounts");

            migrationBuilder.DropIndex(
                name: "IX_Discounts_ItemId",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Discounts");

            migrationBuilder.AddColumn<int>(
                name: "DiscountId",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Genders",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Countries",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Brands",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_DiscountId",
                table: "Items",
                column: "DiscountId",
                unique: true,
                filter: "[DiscountId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Genders_Name",
                table: "Genders",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Countries_Name",
                table: "Countries",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Brands_Name",
                table: "Brands",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Discounts_DiscountId",
                table: "Items",
                column: "DiscountId",
                principalTable: "Discounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Discounts_DiscountId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_DiscountId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Genders_Name",
                table: "Genders");

            migrationBuilder.DropIndex(
                name: "IX_Countries_Name",
                table: "Countries");

            migrationBuilder.DropIndex(
                name: "IX_Brands_Name",
                table: "Brands");

            migrationBuilder.DropColumn(
                name: "DiscountId",
                table: "Items");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Genders",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Discounts",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Countries",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Brands",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Discounts_ItemId",
                table: "Discounts",
                column: "ItemId",
                unique: true,
                filter: "[ItemId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Discounts_Items_ItemId",
                table: "Discounts",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
