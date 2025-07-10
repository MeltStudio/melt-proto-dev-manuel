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
  {
    id: '8',
    title: 'Create API documentation',
    description:
      'Write comprehensive API documentation using OpenAPI/Swagger with examples and best practices',
    status: 'completed',
    dueDate: '2025-07-12',
    createdAt: '2025-07-08T09:00:00Z',
    updatedAt: '2025-07-08T09:00:00Z',
  },
  {
    id: '9',
    title: 'Setup monitoring and logging',
    description:
      'Implement application monitoring, error tracking, and structured logging for production environment',
    status: 'in_progress',
    dueDate: '2025-07-28',
    createdAt: '2025-07-09T13:20:00Z',
    updatedAt: '2025-07-09T13:20:00Z',
  },
  {
    id: '10',
    title: 'Mobile responsive design',
    description:
      'Ensure application is fully responsive and optimized for mobile devices and tablets',
    status: 'completed',
    dueDate: '2025-07-18',
    createdAt: '2025-07-08T15:45:00Z',
    updatedAt: '2025-07-08T15:45:00Z',
  },
  {
    id: '11',
    title: 'Implement search functionality',
    description:
      'Add full-text search capabilities for tasks with filters and advanced search options',
    status: 'pending',
    dueDate: '2025-08-01',
    createdAt: '2025-07-10T12:30:00Z',
    updatedAt: '2025-07-10T12:30:00Z',
  },
  {
    id: '12',
    title: 'Security audit and penetration testing',
    description:
      'Conduct comprehensive security assessment including vulnerability scanning and penetration testing',
    status: 'pending',
    dueDate: '2025-08-12',
    createdAt: '2025-07-10T14:15:00Z',
    updatedAt: '2025-07-10T14:15:00Z',
  },
  {
    id: '13',
    title: 'User onboarding flow',
    description:
      'Design and implement guided user onboarding with tutorials and interactive elements',
    status: 'in_progress',
    dueDate: '2025-07-22',
    createdAt: '2025-07-09T11:00:00Z',
    updatedAt: '2025-07-09T11:00:00Z',
  },
  {
    id: '14',
    title: 'Data backup and recovery system',
    description:
      'Implement automated backup system with disaster recovery procedures and data retention policies',
    status: 'pending',
    dueDate: '2025-08-20',
    createdAt: '2025-07-10T16:45:00Z',
    updatedAt: '2025-07-10T16:45:00Z',
  },
  {
    id: '15',
    title: 'Accessibility compliance (WCAG 2.1)',
    description:
      'Ensure application meets WCAG 2.1 AA standards for accessibility and screen reader compatibility',
    status: 'pending',
    dueDate: '2025-08-08',
    createdAt: '2025-07-10T10:20:00Z',
    updatedAt: '2025-07-10T10:20:00Z',
  },
  {
    id: '16',
    title: 'Email notification system',
    description:
      'Implement email notifications for task deadlines, assignments, and status changes',
    status: 'completed',
    dueDate: '2025-07-14',
    createdAt: '2025-07-08T12:15:00Z',
    updatedAt: '2025-07-08T12:15:00Z',
  },
  {
    id: '17',
    title: 'Team collaboration features',
    description:
      'Add team workspaces, task assignment, comments, and collaborative editing capabilities',
    status: 'in_progress',
    dueDate: '2025-08-03',
    createdAt: '2025-07-09T16:30:00Z',
    updatedAt: '2025-07-09T16:30:00Z',
  },
  {
    id: '18',
    title: 'Analytics and reporting dashboard',
    description:
      'Create comprehensive dashboard with task analytics, team productivity metrics, and custom reports',
    status: 'pending',
    dueDate: '2025-08-25',
    createdAt: '2025-07-10T19:00:00Z',
    updatedAt: '2025-07-10T19:00:00Z',
  },
  {
    id: '19',
    title: 'Third-party integrations',
    description:
      'Integrate with popular tools like Slack, Microsoft Teams, and project management platforms',
    status: 'pending',
    dueDate: '2025-09-01',
    createdAt: '2025-07-10T20:15:00Z',
    updatedAt: '2025-07-10T20:15:00Z',
  },
  {
    id: '20',
    title: 'Internationalization (i18n)',
    description:
      'Add multi-language support with localization for major languages and regional settings',
    status: 'pending',
    dueDate: '2025-09-15',
    createdAt: '2025-07-10T21:30:00Z',
    updatedAt: '2025-07-10T21:30:00Z',
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
