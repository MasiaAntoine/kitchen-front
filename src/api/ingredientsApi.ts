import axios from 'axios'

export const fetchIngredientsConnected = async () => {
  const response = await axios.get('/ingredients/connected')
  return response
}

export const fetchIngredientsByType = async () => {
  const response = await axios.get('/ingredients/by-type')
  return response
}

export const updateIngredientQuantity = async (id: number, data: object) => {
  const response = await axios.patch(`/ingredients/${id}/quantity`, data)
  return response
}

export const fetchIngredientsLowStock = async () => {
  const response = await axios.get(`/ingredients/low-stock`)
  return response
}

export const createIngredient = async (data: object) => {
  const response = await axios.post(`/ingredients`, data)
  return response
}

export const fetchIngredients = async () => {
  const response = await axios.get(`/ingredients`)
  return response
}
