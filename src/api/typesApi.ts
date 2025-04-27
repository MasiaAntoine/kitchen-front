import axios from 'axios'

export const fetchTypes = async () => {
  const response = await axios.get('/types')
  return response
}
