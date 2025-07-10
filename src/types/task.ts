/**
 * Task Status Types
 * Represents the possible states of a task throughout its lifecycle
 */
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

/**
 * Task Interface
 * Core data structure representing a task in the application
 */
export interface Task {
  /** Unique identifier for the task */
  id: string;
  
  /** Task title/name - brief description of what needs to be done */
  title: string;
  
  /** Detailed description of the task requirements */
  description: string;
  
  /** Current status of the task */
  status: TaskStatus;
  
  /** ISO string representation of when the task is due */
  dueDate: string;
  
  /** ISO string representation of when the task was created */
  createdAt: string;
  
  /** ISO string representation of when the task was last modified */
  updatedAt: string;
}

/**
 * Create Task Input Type
 * Data structure for creating a new task (excludes system-generated fields)
 */
export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Update Task Input Type
 * Data structure for updating an existing task (all fields optional except id)
 */
export type UpdateTaskInput = Partial<CreateTaskInput> & { id: string };

/**
 * Task Status Options
 * Human-readable labels for task statuses used in UI components
 */
export const TaskStatusLabels: Record<TaskStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
};

/**
 * Task Status Colors
 * Tailwind CSS color classes for different task statuses
 */
export const TaskStatusColors: Record<TaskStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
};