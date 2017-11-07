using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Incanto.DataAccess.Migrations
{
    public partial class fixedrelationbetweenitemandprice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Prices_PriceId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_ExistingItems_ItemId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_ItemId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Items_PriceId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TransctionTime",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "PriceId",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "ExistingItemId",
                table: "Transactions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TransactionTime",
                table: "Transactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Prices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ExistingItemId",
                table: "Transactions",
                column: "ExistingItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Prices_ItemId",
                table: "Prices",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prices_Items_ItemId",
                table: "Prices",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_ExistingItems_ExistingItemId",
                table: "Transactions",
                column: "ExistingItemId",
                principalTable: "ExistingItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prices_Items_ItemId",
                table: "Prices");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_ExistingItems_ExistingItemId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_ExistingItemId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Prices_ItemId",
                table: "Prices");

            migrationBuilder.DropColumn(
                name: "ExistingItemId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TransactionTime",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Prices");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Transactions",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TransctionTime",
                table: "Transactions",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "PriceId",
                table: "Items",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ItemId",
                table: "Transactions",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_PriceId",
                table: "Items",
                column: "PriceId",
                unique: true,
                filter: "[PriceId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Prices_PriceId",
                table: "Items",
                column: "PriceId",
                principalTable: "Prices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_ExistingItems_ItemId",
                table: "Transactions",
                column: "ItemId",
                principalTable: "ExistingItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
