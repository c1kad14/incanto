using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Incanto.DataAccess.Migrations
{
    public partial class addedpricediscountsizetransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Details_DetailTypeValues_TypeId",
                table: "Details");

            migrationBuilder.DropIndex(
                name: "IX_Details_TypeId",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Details");

            migrationBuilder.AddColumn<int>(
                name: "DiscountId",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PriceId",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Updated",
                table: "Items",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ValueId",
                table: "Details",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Discount",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Value = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discount", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Price",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Updated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Value = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Price", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_DiscountId",
                table: "Items",
                column: "DiscountId",
                unique: true,
                filter: "[DiscountId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Items_PriceId",
                table: "Items",
                column: "PriceId",
                unique: true,
                filter: "[PriceId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Details_ValueId",
                table: "Details",
                column: "ValueId");

            migrationBuilder.AddForeignKey(
                name: "FK_Details_DetailTypeValues_ValueId",
                table: "Details",
                column: "ValueId",
                principalTable: "DetailTypeValues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Discount_DiscountId",
                table: "Items",
                column: "DiscountId",
                principalTable: "Discount",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Price_PriceId",
                table: "Items",
                column: "PriceId",
                principalTable: "Price",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Details_DetailTypeValues_ValueId",
                table: "Details");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Discount_DiscountId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Price_PriceId",
                table: "Items");

            migrationBuilder.DropTable(
                name: "Discount");

            migrationBuilder.DropTable(
                name: "Price");

            migrationBuilder.DropIndex(
                name: "IX_Items_DiscountId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_PriceId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Details_ValueId",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "DiscountId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "PriceId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Updated",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ValueId",
                table: "Details");

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Details",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Details_TypeId",
                table: "Details",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Details_DetailTypeValues_TypeId",
                table: "Details",
                column: "TypeId",
                principalTable: "DetailTypeValues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
