using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Incanto.DataAccess.Migrations
{
    public partial class removeddiscountstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Discounts_DiscountId",
                table: "Items");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropIndex(
                name: "IX_Items_DiscountId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "DiscountId",
                table: "Items");

            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "Items",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "DiscountId",
                table: "Items",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Active = table.Column<bool>(nullable: false),
                    Updated = table.Column<DateTime>(nullable: false),
                    Value = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_DiscountId",
                table: "Items",
                column: "DiscountId",
                unique: true,
                filter: "[DiscountId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Discounts_DiscountId",
                table: "Items",
                column: "DiscountId",
                principalTable: "Discounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
