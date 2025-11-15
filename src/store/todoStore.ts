import { CreateTodoDTO, Todo, UpdateTodoDTO } from '@/src/types/index';
import { todosApi } from '../api/todos';

import { create } from 'zustand';

// Todo store state interface
interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  selectedTodo: Todo | null;
  error: string | null;

  fetchTodos: (limit?: number) => Promise<void>;
  fetchTodoById: (id: number) => Promise<void>;
  createTodo: (data: CreateTodoDTO) => Promise<void>;
  updateTodo: (data: UpdateTodoDTO, id: number) => Promise<void>;

  // UI helpers
  setSelectedTodo: (todo: Todo | null) => void;
  clearError: () => void;
  resetStore: () => void;
}

const initialState = {
  todos: [],
  isLoading: false,
  selectedTodo: null,
  error: null,
};

// Create Zustand store
export const useTodoStore = create<TodoState>((set, get) => ({
  // Initial State
  ...initialState,

  // Fetch Todos
  fetchTodos: async (limit?: number) => {
    set({ isLoading: true, error: null });
    try {
      const todos = await todosApi.getAll(limit);
      set({ todos: todos, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'failed to fetch todos',
      });
    }
  },

  // Get to do by ID
  fetchTodoById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const todo = await todosApi.getByID(id);
      set({ selectedTodo: todo, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : `Failed to fetch todo with id ${id}`,
      });
    }
  },

  // Create Todo
  createTodo: async (data: CreateTodoDTO) => {
    set({ isLoading: true, error: null });
    try {
      const todo = await todosApi.create(data);

      set((state) => ({
        todos: [todo, ...state.todos],
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to create new todo',
      });
    }
  },

  updateTodo: async (data: UpdateTodoDTO, id: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTodo = await todosApi.update(id, data);
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      }));
    } catch (e) {
      set({
        isLoading: false,
        error: e instanceof Error ? e.message : 'Failed to update todo',
      });
    }
  },

  // UI Helpers
  setSelectedTodo: (todo: Todo | null) => {
    set({ selectedTodo: todo });
  },
  clearError: () => {
    set({ error: null });
  },
  resetStore: () => {
    set({ ...initialState });
  },
}));
