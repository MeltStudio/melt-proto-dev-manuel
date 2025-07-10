'use client';

import { TaskStatus } from '@/types/task';

interface TaskFilterProps {
  statusFilter: TaskStatus | 'all';
  sortBy: 'title' | 'dueDate' | 'status';
  sortOrder: 'asc' | 'desc';
  totalTasks: number;
  filteredTasks: number;
  onFilterChange: (filter: TaskStatus | 'all') => void;
  onSortChange: (sortBy: 'title' | 'dueDate' | 'status') => void;
  onSortOrderToggle: () => void;
  onClearFilters: () => void;
  showClearFilters: boolean;
}

/**
 * Task Filter Component
 * Provides filtering and sorting controls for task lists
 * Features: Status filtering, column sorting, clear filters, results counter
 */
export function TaskFilter({
  statusFilter,
  sortBy,
  sortOrder,
  totalTasks,
  filteredTasks,
  onFilterChange,
  onSortChange,
  onSortOrderToggle,
  onClearFilters,
  showClearFilters,
}: TaskFilterProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Filter by status:
            </label>
            <select
              value={statusFilter}
              onChange={e =>
                onFilterChange(e.target.value as TaskStatus | 'all')
              }
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={e =>
                onSortChange(e.target.value as 'title' | 'dueDate' | 'status')
              }
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="dueDate">Due Date</option>
              <option value="title">Title</option>
              <option value="status">Status</option>
            </select>
            <button
              onClick={onSortOrderToggle}
              className="px-2 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Results Info and Clear Filters */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {filteredTasks} of {totalTasks} tasks
          </div>
          {showClearFilters && (
            <button
              onClick={onClearFilters}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
