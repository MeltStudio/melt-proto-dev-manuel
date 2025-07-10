'use client';

/**
 * Delete Confirmation Modal Props
 */
interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
  isLoading: boolean;
}

/**
 * Delete Confirmation Modal Component
 * Provides a confirmation dialog for task deletion
 * Features: Clear warning, loading states, keyboard navigation
 */
export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
  isLoading,
}: DeleteConfirmModalProps) {
  /**
   * Handle keyboard navigation
   * @param e - Keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isLoading) {
      onClose();
    } else if (e.key === 'Enter' && !isLoading) {
      onConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={!isLoading ? onClose : undefined}
        />

        {/* Modal */}
        <div
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Content */}
          <div className="p-6">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-red-600"
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

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Task
            </h3>

            {/* Message */}
            <div className="text-center text-gray-600 mb-6">
              <p className="mb-2">Are you sure you want to delete this task?</p>
              <p className="font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                &quot;{taskTitle}&quot;
              </p>
              <p className="text-sm mt-2 text-red-600">
                This action cannot be undone.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </div>
                ) : (
                  'Delete Task'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
