'use client';

import { Task } from '@/types/task';

interface TaskStatsProps {
  tasks: Task[];
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
  textColor: string;
  valueColor: string;
}

/**
 * Stat Card Component
 * Individual statistic card with icon, title, and value
 */
function StatCard({
  title,
  value,
  icon,
  bgColor,
  iconBgColor,
  textColor,
  valueColor,
}: StatCardProps) {
  return (
    <div className={`${bgColor} border rounded-lg p-4`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div
            className={`w-8 h-8 ${iconBgColor} rounded-full flex items-center justify-center`}
          >
            {icon}
          </div>
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>{title}</p>
          <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Task Statistics Component
 * Displays task summary statistics in a responsive grid
 * Features: Total tasks, in progress count, completed count with icons
 */
export function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(
    task => task.status === 'in_progress'
  ).length;
  const completedTasks = tasks.filter(
    task => task.status === 'completed'
  ).length;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      bgColor: 'bg-blue-50 border-blue-200',
      iconBgColor: 'bg-blue-600',
      textColor: 'text-blue-900',
      valueColor: 'text-blue-600',
      icon: (
        <svg
          className="h-4 w-4 text-white"
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
      ),
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      bgColor: 'bg-yellow-50 border-yellow-200',
      iconBgColor: 'bg-yellow-600',
      textColor: 'text-yellow-900',
      valueColor: 'text-yellow-600',
      icon: (
        <svg
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Completed',
      value: completedTasks,
      bgColor: 'bg-green-50 border-green-200',
      iconBgColor: 'bg-green-600',
      textColor: 'text-green-900',
      valueColor: 'text-green-600',
      icon: (
        <svg
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
