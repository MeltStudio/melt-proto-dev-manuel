import { useState, useMemo } from 'react';
import { Task, TaskStatus } from '@/types/task';
import { useTasks } from './useTasks';

export interface TasksFiltering {
  statusFilter: TaskStatus | 'all';
  sortBy: 'title' | 'dueDate' | 'status';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  tasksPerPage: number;
}

export interface ProcessedTasks {
  tasks: Task[];
  totalTasks: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook for managing task filtering, sorting, and pagination
 * Combines task data fetching with client-side processing
 */
export function useTasksWithFiltering(initialTasksPerPage = 10) {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'dueDate' | 'status'>(
    'dueDate'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = initialTasksPerPage;

  // Get base task data
  const { data: tasks = [], isLoading, error } = useTasks();

  // Process tasks with filtering, sorting, and pagination
  const processedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'dueDate':
          aValue = new Date(a.dueDate).getTime();
          bValue = new Date(b.dueDate).getTime();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    const paginatedTasks = filtered.slice(startIndex, endIndex);

    return {
      tasks: paginatedTasks,
      totalTasks: filtered.length,
      totalPages,
      currentPage,
      isLoading,
      error,
    };
  }, [
    tasks,
    statusFilter,
    sortBy,
    sortOrder,
    currentPage,
    tasksPerPage,
    isLoading,
    error,
  ]);

  /**
   * Handle column sorting
   */
  const handleSort = (column: 'title' | 'dueDate' | 'status') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  /**
   * Handle filter change
   */
  const handleFilterChange = (filter: TaskStatus | 'all') => {
    setStatusFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  /**
   * Handle page change
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Reset all filters and sorting
   */
  const resetFilters = () => {
    setStatusFilter('all');
    setSortBy('dueDate');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  return {
    // Processed data
    processedTasks,
    allTasks: tasks,

    // Current state
    filtering: {
      statusFilter,
      sortBy,
      sortOrder,
      currentPage,
      tasksPerPage,
    },

    // Actions
    handleSort,
    handleFilterChange,
    handlePageChange,
    resetFilters,

    // Direct setters for more control
    setStatusFilter,
    setSortBy,
    setSortOrder,
    setCurrentPage,
  };
}
