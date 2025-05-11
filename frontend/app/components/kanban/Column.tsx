'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from './Task'
import { CreateTask } from './CreateTask'
import { SortableContext } from '@dnd-kit/sortable'

export function Column({ column, tasks = [], onTaskCreate, onTaskDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-72 bg-gray-800 rounded-lg p-4 flex flex-col"
    >
      <div className="flex justify-between items-center mb-4" {...attributes} {...listeners}>
        <h2 className="font-semibold">{column.title}</h2>
        <span className="text-sm text-gray-500">{tasks.length} tasks</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto min-h-[100px]">
        <SortableContext items={tasks.map((task: { id: any }) => task.id)}>
          {tasks.map((task: { id: string, title: string, priority: string }) => (
            <Task 
              key={task.id} 
              task={task} 
              onDelete={() => onTaskDelete(task.id)}
            />
          ))}
        </SortableContext>
      </div>

      <CreateTask columnId={column.id} onCreate={onTaskCreate} />
    </div>
  )
}