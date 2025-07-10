'use client';

interface SortableTableHeaderProps {
  children: React.ReactNode;
  sortKey: 'title' | 'dueDate' | 'status';
  currentSortBy: 'title' | 'dueDate' | 'status';
  currentSortOrder: 'asc' | 'desc';
  onSort: (sortKey: 'title' | 'dueDate' | 'status') => void;
  className?: string;
}

/**
 * Sortable Table Header Component
 * Clickable table header that shows sort indicators
 * Features: Visual sort indicators, hover states, accessibility
 */
export function SortableTableHeader({
  children,
  sortKey,
  currentSortBy,
  currentSortOrder,
  onSort,
  className = '',
}: SortableTableHeaderProps) {
  const isActive = currentSortBy === sortKey;

  return (
    <th className={`px-6 py-3 text-left ${className}`}>
      <button
        onClick={() => onSort(sortKey)}
        className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
      >
        <span>{children}</span>
        {isActive && (
          <span className="ml-1 text-gray-700">
            {currentSortOrder === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </button>
    </th>
  );
}

interface NonSortableTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Non-Sortable Table Header Component
 * Standard table header for non-sortable columns
 */
export function NonSortableTableHeader({
  children,
  className = '',
}: NonSortableTableHeaderProps) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}
