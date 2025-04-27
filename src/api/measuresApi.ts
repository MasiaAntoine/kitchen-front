import axios from 'axios'

export const fetchMeasures = async () => {
  const response = await axios.get('/measures')
  return response
}
