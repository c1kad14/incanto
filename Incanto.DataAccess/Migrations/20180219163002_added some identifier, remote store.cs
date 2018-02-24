using Microsoft.EntityFrameworkCore.Migrations;

namespace Incanto.DataAccess.Migrations
{
    public partial class addedsomeidentifierremotestore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Identifier",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Remote",
                table: "Items",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "RemoteStore",
                table: "Items",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Identifier",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Remote",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "RemoteStore",
                table: "Items");
        }
    }
}
