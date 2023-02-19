import { API_URL } from './config'

export const login = async (payload) => {
  const res = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  return await res.json()
}