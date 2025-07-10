import { z } from 'zod';
import { TaskStatus } from '@/types/task';

/**
 * Task Validation Schema
 * Comprehensive validation rules for task creation and updates
 */
export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .trim(),

  status: z.enum(['pending', 'in_progress', 'completed'], {
    message: 'Status must be pending, in progress, or completed',
  }),

  dueDate: z
    .string()
    .min(1, 'Due date is required')
    .refine(date => {
      const dueDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate >= today;
    }, 'Due date cannot be in the past')
    .refine(date => {
      const dueDate = new Date(date);
      return !isNaN(dueDate.getTime());
    }, 'Invalid date format'),
});

/**
 * Create Task Input Schema
 * Used for creating new tasks
 */
export const createTaskSchema = taskSchema;

/**
 * Update Task Input Schema
 * Used for updating existing tasks - all fields are optional except validation rules still apply
 */
export const updateTaskSchema = taskSchema.partial().extend({
  id: z.string().min(1, 'Task ID is required'),
});

/**
 * Type inference from Zod schemas
 */
export type TaskFormData = z.infer<typeof taskSchema>;
export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;

/**
 * Task Status Validation
 * Validates if a status transition is allowed
 */
export const validateStatusTransition = (
  currentStatus: TaskStatus,
  newStatus: TaskStatus
): { isValid: boolean; error?: string } => {
  // Define allowed transitions
  const allowedTransitions: Record<TaskStatus, TaskStatus[]> = {
    pending: ['pending', 'in_progress'],
    in_progress: ['in_progress', 'completed', 'pending'],
    completed: ['completed', 'in_progress'], // Allow reopening tasks
  };

  const isValid = allowedTransitions[currentStatus].includes(newStatus);

  if (!isValid) {
    return {
      isValid: false,
      error: `Cannot change status from ${currentStatus} to ${newStatus}`,
    };
  }

  return { isValid: true };
};

/**
 * Date Utilities for Validation
 */
export const dateUtils = {
  /**
   * Get minimum date (today) in YYYY-MM-DD format
   */
  getMinDate: (): string => {
    return new Date().toISOString().split('T')[0];
  },

  /**
   * Get maximum date (1 year from now) in YYYY-MM-DD format
   */
  getMaxDate: (): string => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return maxDate.toISOString().split('T')[0];
  },

  /**
   * Check if a date string is in the past
   */
  isPastDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  },

  /**
   * Format date for display
   */
  formatDate: (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  },
};

/**
 * Common Validation Messages
 */
export const validationMessages = {
  required: 'This field is required',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must not exceed ${max} characters`,
  invalidDate: 'Please enter a valid date',
  pastDate: 'Date cannot be in the past',
  invalidStatus: 'Please select a valid status',
} as const;
