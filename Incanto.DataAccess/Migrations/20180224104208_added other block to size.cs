using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Incanto.DataAccess.Migrations
{
    public partial class addedotherblocktosize : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RemoteStore",
                table: "Items");

            migrationBuilder.AddColumn<string>(
                name: "Other",
                table: "Sizes",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Remote",
                table: "Items",
                nullable: true,
                oldClrType: typeof(bool));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Other",
                table: "Sizes");

            migrationBuilder.AlterColumn<bool>(
                name: "Remote",
                table: "Items",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RemoteStore",
                table: "Items",
                nullable: true);
        }
    }
}
