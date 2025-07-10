import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';
import { mockTasks, generateId, getCurrentISODate } from '@/lib/mockData';

/**
 * Query Keys
 * Centralized query key management for React Query
 */
export const taskQueryKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...taskQueryKeys.lists(), { filters }] as const,
  details: () => [...taskQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskQueryKeys.details(), id] as const,
};

/**
 * Task Storage Management
 * Manages local storage for task persistence
 */
class TaskStorage {
  private static readonly STORAGE_KEY = 'tasks-app-data';

  /**
   * Get all tasks from localStorage
   * Falls back to mock data if no stored data exists
   */
  static getTasks(): Task[] {
    console.log('🏪 TaskStorage.getTasks called');

    if (typeof window === 'undefined') {
      console.log('🖥️ Window undefined (SSR), returning mock data');
      return mockTasks;
    }

    try {
      console.log('🔑 Reading from localStorage with key:', this.STORAGE_KEY);
      const stored = localStorage.getItem(this.STORAGE_KEY);

      if (stored) {
        console.log('📜 Found stored data, parsing...');
        const parsed = JSON.parse(stored);
        console.log('✅ Parsed stored tasks:', parsed.length, 'tasks');
        return parsed;
      } else {
        console.log('📝 No stored data found, using mock data');
        // Save mock data to localStorage for future use
        this.saveTasks(mockTasks);
        return mockTasks;
      }
    } catch (error) {
      console.error('💥 Error reading tasks from localStorage:', error);
      console.log('🔄 Falling back to mock data');
      return mockTasks;
    }
  }

  /**
   * Save tasks to localStorage
   * @param tasks - Array of tasks to save
   */
  static saveTasks(tasks: Task[]): void {
    console.log('💾 TaskStorage.saveTasks called with', tasks.length, 'tasks');

    if (typeof window === 'undefined') {
      console.log('🖥️ Window undefined (SSR), skipping save');
      return;
    }

    try {
      const serialized = JSON.stringify(tasks);
      localStorage.setItem(this.STORAGE_KEY, serialized);
      console.log('✅ Tasks saved to localStorage successfully');
    } catch (error) {
      console.error('💥 Error saving tasks to localStorage:', error);
    }
  }

  /**
   * Clear all tasks from localStorage
   */
  static clearTasks(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

/**
 * Mock API Service
 * Simulates backend API calls with realistic delays
 */
class TaskService {
  /**
   * Simulate network delay
   * @param ms - Milliseconds to delay (default: 300-800ms)
   */
  private static async delay(ms?: number): Promise<void> {
    const delayTime = ms || Math.random() * 500 + 300;
    return new Promise(resolve => setTimeout(resolve, delayTime));
  }

  /**
   * Fetch all tasks
   * @returns Promise<Task[]>
   */
  static async fetchTasks(): Promise<Task[]> {
    console.log('🔍 TaskService.fetchTasks called');

    try {
      // Add a small delay to simulate network
      await TaskService.delay(500);

      console.log('📦 Getting tasks from storage...');
      const tasks = TaskStorage.getTasks();

      console.log('📋 Tasks retrieved:', tasks.length, 'tasks');

      // Ensure we always return an array
      if (!Array.isArray(tasks)) {
        console.warn('⚠️ Tasks is not an array, returning mock data');
        return mockTasks;
      }

      return tasks;
    } catch (error) {
      console.error('💥 Error in fetchTasks:', error);
      // Return mock data as fallback
      return mockTasks;
    }
  }

  /**
   * Create a new task
   * @param input - Task creation data
   * @returns Promise<Task>
   */
  static async createTask(input: CreateTaskInput): Promise<Task> {
    await TaskService.delay();

    const newTask: Task = {
      ...input,
      id: generateId(),
      createdAt: getCurrentISODate(),
      updatedAt: getCurrentISODate(),
    };

    const tasks = TaskStorage.getTasks();
    const updatedTasks = [...tasks, newTask];
    TaskStorage.saveTasks(updatedTasks);

    return newTask;
  }

  /**
   * Update an existing task
   * @param input - Task update data
   * @returns Promise<Task>
   */
  static async updateTask(input: UpdateTaskInput): Promise<Task> {
    await TaskService.delay();

    const tasks = TaskStorage.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === input.id);

    if (taskIndex === -1) {
      throw new Error(`Task with id ${input.id} not found`);
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...input,
      updatedAt: getCurrentISODate(),
    };

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    TaskStorage.saveTasks(updatedTasks);

    return updatedTask;
  }

  /**
   * Delete a task
   * @param id - Task ID to delete
   * @returns Promise<void>
   */
  static async deleteTask(id: string): Promise<void> {
    await TaskService.delay();

    const tasks = TaskStorage.getTasks();
    const taskExists = tasks.some(task => task.id === id);

    if (!taskExists) {
      throw new Error(`Task with id ${id} not found`);
    }

    const updatedTasks = tasks.filter(task => task.id !== id);
    TaskStorage.saveTasks(updatedTasks);
  }
}

/**
 * React Query Hook: Fetch Tasks
 * Retrieves all tasks with caching and background refetching
 */
export const useTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.lists(),
    queryFn: async () => {
      console.log('🔄 Fetching tasks...');
      try {
        const result = await TaskService.fetchTasks();
        console.log('✅ Tasks fetched successfully:', result);
        return result;
      } catch (error) {
        console.error('❌ Error fetching tasks:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Only retry once
    retryDelay: 1000,
  });
};

/**
 * React Query Hook: Create Task
 * Creates a new task with optimistic updates
 */
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TaskService.createTask,
    onMutate: async newTask => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: taskQueryKeys.lists() });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(
        taskQueryKeys.lists()
      );

      // Optimistically update to the new value
      if (previousTasks) {
        const optimisticTask: Task = {
          ...newTask,
          id: generateId(),
          createdAt: getCurrentISODate(),
          updatedAt: getCurrentISODate(),
        };

        queryClient.setQueryData<Task[]>(taskQueryKeys.lists(), [
          ...previousTasks,
          optimisticTask,
        ]);
      }

      // Return a context object with the snapshotted value
      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(
          taskQueryKeys.lists(),
          context.previousTasks
        );
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
    },
  });
};

/**
 * React Query Hook: Update Task
 * Updates an existing task with optimistic updates
 */
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TaskService.updateTask,
    onMutate: async updatedTask => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: taskQueryKeys.lists() });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(
        taskQueryKeys.lists()
      );

      // Optimistically update to the new value
      if (previousTasks) {
        const optimisticTasks = previousTasks.map(task =>
          task.id === updatedTask.id
            ? { ...task, ...updatedTask, updatedAt: getCurrentISODate() }
            : task
        );

        queryClient.setQueryData<Task[]>(
          taskQueryKeys.lists(),
          optimisticTasks
        );
      }

      // Return a context object with the snapshotted value
      return { previousTasks };
    },
    onError: (err, updatedTask, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(
          taskQueryKeys.lists(),
          context.previousTasks
        );
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
    },
  });
};

/**
 * React Query Hook: Delete Task
 * Deletes a task with optimistic updates
 */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TaskService.deleteTask,
    onMutate: async deletedId => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: taskQueryKeys.lists() });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(
        taskQueryKeys.lists()
      );

      // Optimistically update to the new value
      if (previousTasks) {
        const optimisticTasks = previousTasks.filter(
          task => task.id !== deletedId
        );
        queryClient.setQueryData<Task[]>(
          taskQueryKeys.lists(),
          optimisticTasks
        );
      }

      // Return a context object with the snapshotted value
      return { previousTasks };
    },
    onError: (err, deletedId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(
          taskQueryKeys.lists(),
          context.previousTasks
        );
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
    },
  });
};
