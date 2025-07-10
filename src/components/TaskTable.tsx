'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import { useDeleteTask } from '@/hooks/useTasks';
import { useTasksWithFiltering } from '@/hooks/useTasksWithFiltering';
import { formatDate, isTaskOverdue } from '@/lib/mockData';
import { TaskModal } from './TaskModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { TaskFilter } from './TaskFilter';
import { Paginator } from './Paginator';
import { TaskStats } from './TaskStats';
import { StatusBadge } from './StatusBadge';
import {
  SortableTableHeader,
  NonSortableTableHeader,
} from './SortableTableHeader';

/**
 * Task Table Component
 * Main component for displaying and managing tasks
 * Features: View, Create, Edit, Delete tasks with responsive design
 */
export function TaskTable() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Use the filtering hook
  const {
    processedTasks,
    allTasks,
    filtering,
    handleSort,
    handleFilterChange,
    handlePageChange,
    resetFilters,
  } = useTasksWithFiltering(10);

  const deleteTaskMutation = useDeleteTask();

  /**
   * Handle task deletion
   * @param task - Task to delete
   */
  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  /**
   * Confirm task deletion
   */
  const confirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTaskMutation.mutate(taskToDelete.id);
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  /**
   * Handle task editing
   * @param task - Task to edit
   */
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  /**
   * Close all modals
   */
  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
    setTaskToDelete(null);
  };

  /**
   * Loading State
   */
  if (processedTasks.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading tasks...</span>
      </div>
    );
  }

  /**
   * Error State
   */
  if (processedTasks.error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-600 mb-2">
            <svg
              className="h-8 w-8 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error loading tasks
          </h3>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your tasks efficiently with our comprehensive task management
            system
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Task
        </button>
      </div>

      {/* Task Statistics */}
      <TaskStats tasks={allTasks} />

      {/* Filtering and Sorting Controls */}
      <TaskFilter
        statusFilter={filtering.statusFilter}
        sortBy={filtering.sortBy}
        sortOrder={filtering.sortOrder}
        totalTasks={allTasks.length}
        filteredTasks={processedTasks.totalTasks}
        onFilterChange={handleFilterChange}
        onSortChange={sortBy => handleSort(sortBy)}
        onSortOrderToggle={() => handleSort(filtering.sortBy)}
        onClearFilters={resetFilters}
        showClearFilters={
          filtering.statusFilter !== 'all' ||
          filtering.sortBy !== 'dueDate' ||
          filtering.sortOrder !== 'asc'
        }
      />

      {/* Tasks Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {processedTasks.totalTasks === 0 ? (
          <div className="text-center py-12">
            <svg
              className="h-12 w-12 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tasks yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first task
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <SortableTableHeader
                    sortKey="title"
                    currentSortBy={filtering.sortBy}
                    currentSortOrder={filtering.sortOrder}
                    onSort={handleSort}
                  >
                    Task
                  </SortableTableHeader>
                  <SortableTableHeader
                    sortKey="status"
                    currentSortBy={filtering.sortBy}
                    currentSortOrder={filtering.sortOrder}
                    onSort={handleSort}
                  >
                    Status
                  </SortableTableHeader>
                  <SortableTableHeader
                    sortKey="dueDate"
                    currentSortBy={filtering.sortBy}
                    currentSortOrder={filtering.sortOrder}
                    onSort={handleSort}
                  >
                    Due Date
                  </SortableTableHeader>
                  <NonSortableTableHeader>Actions</NonSortableTableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processedTasks.tasks.map(task => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-sm font-medium text-gray-900">
                              {task.title}
                            </h3>
                            {isTaskOverdue(task.dueDate) &&
                              task.status !== 'completed' && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Overdue
                                </span>
                              )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {task.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(task.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task)}
                          className="text-red-600 hover:text-red-800 font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Paginator
        currentPage={processedTasks.currentPage}
        totalPages={processedTasks.totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modals */}
      <TaskModal
        isOpen={isCreateModalOpen}
        onClose={closeModals}
        mode="create"
      />

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        mode="edit"
        task={selectedTask}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={confirmDeleteTask}
        taskTitle={taskToDelete?.title || ''}
        isLoading={deleteTaskMutation.isPending}
      />
    </div>
  );
}
