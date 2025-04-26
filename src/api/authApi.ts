import axios from 'axios'

export const fetchAuth = async (data: any) => {
  const response = await axios.post('/login', data)
  return response
}
