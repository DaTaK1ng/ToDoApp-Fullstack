import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

export interface Todo {
  _id?: string
  text: string
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

export const todoApi = {
  // get Todo
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_BASE_URL}/todos`)
    return response.data
  },

  // add Todo
  addTodo: async (text: string): Promise<Todo> => {
    const response = await axios.post(`${API_BASE_URL}/todos`, { text })
    return response.data
  },

  // update Todo
  updateTodo: async (id: string, completed: boolean): Promise<Todo> => {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, { completed })
    return response.data
  },

  // delete Todo
  deleteTodo: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/todos/${id}`)
  }
}
