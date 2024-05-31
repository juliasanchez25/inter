using System.ComponentModel.DataAnnotations;

public class Clientes
{
    [Key]
    public int cliente_id { get; set; }
    public string senha { get; set; }
    public DateOnly data_cadastro { get; set; }
}