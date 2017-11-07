using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Incanto.DataAccess.Migrations
{
    public partial class addedpicturetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Details_DetailTypeValue_TypeId",
                table: "Details");

            migrationBuilder.DropForeignKey(
                name: "FK_DetailTypeValue_DetailTypes_DetailTypeId",
                table: "DetailTypeValue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DetailTypeValue",
                table: "DetailTypeValue");

            migrationBuilder.RenameTable(
                name: "DetailTypeValue",
                newName: "DetailTypeValues");

            migrationBuilder.RenameIndex(
                name: "IX_DetailTypeValue_DetailTypeId",
                table: "DetailTypeValues",
                newName: "IX_DetailTypeValues_DetailTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DetailTypeValues",
                table: "DetailTypeValues",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ItemId = table.Column<int>(type: "int", nullable: true),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_ItemId",
                table: "Photos",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Details_DetailTypeValues_TypeId",
                table: "Details",
                column: "TypeId",
                principalTable: "DetailTypeValues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DetailTypeValues_DetailTypes_DetailTypeId",
                table: "DetailTypeValues",
                column: "DetailTypeId",
                principalTable: "DetailTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Details_DetailTypeValues_TypeId",
                table: "Details");

            migrationBuilder.DropForeignKey(
                name: "FK_DetailTypeValues_DetailTypes_DetailTypeId",
                table: "DetailTypeValues");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DetailTypeValues",
                table: "DetailTypeValues");

            migrationBuilder.RenameTable(
                name: "DetailTypeValues",
                newName: "DetailTypeValue");

            migrationBuilder.RenameIndex(
                name: "IX_DetailTypeValues_DetailTypeId",
                table: "DetailTypeValue",
                newName: "IX_DetailTypeValue_DetailTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DetailTypeValue",
                table: "DetailTypeValue",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Details_DetailTypeValue_TypeId",
                table: "Details",
                column: "TypeId",
                principalTable: "DetailTypeValue",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DetailTypeValue_DetailTypes_DetailTypeId",
                table: "DetailTypeValue",
                column: "DetailTypeId",
                principalTable: "DetailTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
