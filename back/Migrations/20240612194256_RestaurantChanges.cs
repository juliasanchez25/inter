using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InterApi.Migrations
{
    /// <inheritdoc />
    public partial class RestaurantChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Capacity",
                table: "Restaurant",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Restaurant",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string[]>(
                name: "DaysOpen",
                table: "Restaurant",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Restaurant",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "Restaurant",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Restaurant");

            migrationBuilder.DropColumn(
                name: "DaysOpen",
                table: "Restaurant");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Restaurant");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "Restaurant");

            migrationBuilder.AlterColumn<int>(
                name: "Capacity",
                table: "Restaurant",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);
        }
    }
}
