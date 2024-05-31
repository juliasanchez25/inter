using System.ComponentModel.DataAnnotations;

public class Horarios
{
    [Key]
    public int id_horario { get; set; }
    public int restaurante_id { get; set; }
    public TimeOnly horario { get; set; }
    public int status { get; set; }
    public int qtd_pessoas { get; set; }
}