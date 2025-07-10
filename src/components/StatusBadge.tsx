'use client';

import { TaskStatus, TaskStatusLabels, TaskStatusColors } from '@/types/task';

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

/**
 * Status Badge Component
 * Displays task status with appropriate colors and styling
 * Features: Consistent styling, accessible colors, proper contrast
 */
export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const badgeClasses = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${TaskStatusColors[status]} ${className}`;

  return <span className={badgeClasses}>{TaskStatusLabels[status]}</span>;
}
