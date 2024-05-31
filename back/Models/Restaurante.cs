using System.ComponentModel.DataAnnotations;

public class Restaurante
{
    [Key]
    public int restaurante_id { get; set; }
    public string endereco { get; set; }
    public TimeOnly horario_abertura { get; set; }
    public TimeOnly horario_fechamento { get; set; }
}