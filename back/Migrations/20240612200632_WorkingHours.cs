using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InterApi.Migrations
{
    /// <inheritdoc />
    public partial class WorkingHours : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WorkingHours",
                table: "Restaurant",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkingHours",
                table: "Restaurant");
        }
    }
}
