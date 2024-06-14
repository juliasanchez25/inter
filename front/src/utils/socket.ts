import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from '@microsoft/signalr'
import { api } from './api'

const socket = new HubConnectionBuilder()
  .withUrl(`${api}/reservationsHub`, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .withAutomaticReconnect()
  .configureLogging(LogLevel.Information)
  .build()

socket.start()

export default socket
