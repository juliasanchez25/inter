using System.ComponentModel.DataAnnotations;

public class Pessoas
{
    [Key]
    public int id { get; set; }
    public string nome { get; set; }
    public string email { get; set; }
    public string telefone { get; set; }
}