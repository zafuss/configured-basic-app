import { CreateTodoDTO, Todo, UpdateTodoDTO } from '../types';
import { apiClient } from './client';

// Todos API Endpoints
export const todosApi = {
  // Get All Todos
  getAll: async (limit?: number): Promise<Todo[]> => {
    const params = limit ? { _limit: limit } : {};
    const response = await apiClient.get<Todo[]>('/todos', { params });
    return response.data;
  },

  // Get by ID
  getByID: async (id: number): Promise<Todo> => {
    const response = await apiClient.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  // Create todo
  create: async (todo: CreateTodoDTO): Promise<Todo> => {
    const response = await apiClient.post<Todo>('/todos', todo);
    return response.data;
  },

  // Update todo
  update: async (id: number, todo: UpdateTodoDTO): Promise<Todo> => {
    const response = await apiClient.put<Todo>(`todos/${id}`, todo);
    return response.data;
  },
};
