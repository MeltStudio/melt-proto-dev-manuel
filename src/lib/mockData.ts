import { Task } from '@/types/task';

/**
 * Mock Tasks Data
 * Initial dataset for demonstration purposes
 * In a real application, this would come from a backend API
 */
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Set up project structure',
    description:
      'Create the initial project structure with all necessary folders and files for the Tasks Management application',
    status: 'completed',
    dueDate: '2025-07-15',
    createdAt: '2025-07-08T10:00:00Z',
    updatedAt: '2025-07-08T10:00:00Z',
  },
  {
    id: '2',
    title: 'Implement authentication system',
    description:
      'Add comprehensive user authentication with login, registration, and session management functionality',
    status: 'in_progress',
    dueDate: '2025-07-20',
    createdAt: '2025-07-09T14:30:00Z',
    updatedAt: '2025-07-09T14:30:00Z',
  },
  {
    id: '3',
    title: 'Design database schema',
    description:
      'Create comprehensive database schema for all application entities including users, tasks, and relationships',
    status: 'pending',
    dueDate: '2025-07-25',
    createdAt: '2025-07-10T09:15:00Z',
    updatedAt: '2025-07-10T09:15:00Z',
  },
  {
    id: '4',
    title: 'Write comprehensive unit tests',
    description:
      'Implement full test coverage for all core functionality including CRUD operations, authentication, and edge cases',
    status: 'pending',
    dueDate: '2025-07-30',
    createdAt: '2025-07-10T11:45:00Z',
    updatedAt: '2025-07-10T11:45:00Z',
  },
  {
    id: '5',
    title: 'Deploy to production environment',
    description:
      'Set up CI/CD pipeline, configure production environment, and deploy the application with monitoring',
    status: 'pending',
    dueDate: '2025-08-05',
    createdAt: '2025-07-10T16:20:00Z',
    updatedAt: '2025-07-10T16:20:00Z',
  },
  {
    id: '6',
    title: 'Implement real-time notifications',
    description:
      'Add WebSocket-based real-time notifications for task updates and team collaboration features',
    status: 'pending',
    dueDate: '2025-08-10',
    createdAt: '2025-07-10T17:00:00Z',
    updatedAt: '2025-07-10T17:00:00Z',
  },
  {
    id: '7',
    title: 'Performance optimization',
    description:
      'Optimize application performance including code splitting, lazy loading, and caching strategies',
    status: 'pending',
    dueDate: '2025-08-15',
    createdAt: '2025-07-10T18:30:00Z',
    updatedAt: '2025-07-10T18:30:00Z',
  },
];

/**
 * Generate Unique ID
 * Creates a unique identifier for new tasks
 * In production, this would typically be handled by the backend/database
 *
 * @returns {string} A unique identifier string
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Get Current ISO Date String
 * Utility function to get the current date in ISO format
 *
 * @returns {string} Current date in ISO format
 */
export const getCurrentISODate = (): string => {
  return new Date().toISOString();
};

/**
 * Format Date for Display
 * Converts ISO date string to human-readable format
 *
 * @param {string} isoDate - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Check if Task is Overdue
 * Determines if a task's due date has passed
 *
 * @param {string} dueDate - ISO date string for due date
 * @returns {boolean} True if task is overdue
 */
export const isTaskOverdue = (dueDate: string): boolean => {
  return new Date(dueDate) < new Date();
};
