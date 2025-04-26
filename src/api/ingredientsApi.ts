import axios from 'axios'

export const fetchIngredientsConnected = async () => {
  const data = await axios.get('/ingredients/connected')
  return data
}
