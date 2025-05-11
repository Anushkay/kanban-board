'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TrashIcon } from '@heroicons/react/24/outline'

interface TaskType {
  id: string;
  title: string;
  priority: string;
  description?: string;
}

interface TaskProps {
  task: TaskType;
  isOverlay?: boolean;
  onDelete?: () => void;
}

export function Task({ task, isOverlay = false, onDelete }: TaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 'auto'
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  }

  return (
  <div
  ref={setNodeRef}
  style={style}
  className={`p-3 rounded shadow ${isOverlay ? 'shadow-xl' : ''}`}
  {...attributes}
>
  <div className="flex justify-between items-start">
    <div className="flex-grow flex items-start">
      <div {...listeners} className="mr-2 cursor-grab">
        {/* Drag handle icon or just empty space */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M8 9h8m-8 3h8m-8 3h8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div>
        <h3 className="font-medium">{task.title}</h3>
        {task.priority && (
          <p className="text-sm text-gray-600 mt-1">{task.priority}</p>
        )}
      </div>
    </div>
    {!isOverlay && onDelete && (
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700"
        aria-label="Delete task"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    )}
  </div>
</div>
  )
}