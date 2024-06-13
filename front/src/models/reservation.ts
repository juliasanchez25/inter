export interface IReservation {
  id: string
  phone: string
  day: string
  quantity: string
  userId: number
}

export interface IReservationForAdmin {
  id: string
  phone: string
  day: string
  quantity: number
  userName: number
}
