import { io } from 'socket.io-client'
import { API_IO_URL } from './config'

export const connect = (authToken) => {
  const socket = io(API_IO_URL, {
    auth: {
      token: authToken,
    }
  })

  return new Promise((resolve, _reject) => {
    socket.on('connect', () => resolve(socket))
    socket.on('connect_error', e => console.warn(e))
  })
}
