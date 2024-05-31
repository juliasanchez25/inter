using System.ComponentModel.DataAnnotations;

public class Reservas
{
    [Key]
    public int id_reserva { get; set; }
    public int cliente_id { get; set; }
    public int horario_id { get; set; }
    public int restaurante_id { get; set; }
    public DateOnly data_reserva { get; set; }
    public int confirmacao { get; set; }
}