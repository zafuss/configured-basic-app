// Todo model
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// DTO for creating a new Todo
export interface CreateTodoDTO {
  completed: boolean;
  title?: string;
  userId?: number;
}

// DTO for updating a new Todo
export interface UpdateTodoDTO {
  title?: string;
  completed?: boolean;
}

// Generic type for Response to handle API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Filter options
export type TodoFilter = 'all' | 'completed' | 'active';

// Sort options
export type TodoSort = 'newest' | 'oldest' | 'title';
