'use client'
import { useState, useEffect } from 'react'
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { Column } from './Column'
import { Task } from './Task'
import { boardService } from '../../services/board.service'
import { CreateColumn } from './CreateColumn'

export function Board() {
  const [columns, setColumns] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [activeTask, setActiveTask] = useState<any>(null)

  useEffect(() => {
    fetchBoard()
  }, [])

  const fetchBoard = async () => {
    try {
      const res = await boardService.getBoard()
      const board = res
      const allTasks: any[] = []

      const normalizedColumns = (board.columns ?? []).map((col: any) => {
        const normalizedTasks = (col.tasks ?? []).map((task: any) => {
          const normalized = {
            ...task,
            id: task._id,
            columnId: col._id
          }
          allTasks.push(normalized)
          return normalized
        })

        return {
          ...col,
          id: col._id,
          tasks: normalizedTasks
        }
      })

      setColumns(normalizedColumns)
      setTasks(allTasks)
    } catch (error) {
      console.error('Failed to fetch board:', error)
    }
  }

  const handleAddColumn = async (title: string) => {
    try {
      const newColumn = await boardService.createColumn(title)
      setColumns([...columns, { ...newColumn, id: newColumn._id }])
    } catch (error) {
      console.error('Failed to create column:', error)
    }
  }

  const handleDragStart = (event: any) => {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
    }
  }

  const handleDragEnd = async (event: any) => {
    const { active, over } = event

    if (!over) return
    if (active.id === over.id) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    try {
      // Move to different column
      if (isActiveATask && !isOverATask) {
        const activeTask = tasks.find(task => task.id === active.id)
        const newColumnId = over.id

        await boardService.updateTask(active.id, {
          columnId: newColumnId,
          position: 0
        })

        setTasks(tasks.map(task =>
          task.id === active.id
            ? { ...task, columnId: newColumnId }
            : task
        ))
      }

      // Reorder inside same column
      if (isActiveATask && isOverATask) {
        const activeIndex = tasks.findIndex(task => task.id === active.id)
        const overIndex = tasks.findIndex(task => task.id === over.id)

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) return

        const newTasks = arrayMove(tasks, activeIndex, overIndex)
        setTasks(newTasks)

        await boardService.updateTask(active.id, {
          position: overIndex
        })
      }
    } catch (error) {
      console.error('Failed to update task:', error)
    } finally {
      setActiveTask(null)
    }
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between items-center mb-4 p-3">
        <h1 className="text-2xl text-center font-bold">Kanban Board</h1>
        <CreateColumn onCreate={handleAddColumn} />
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          <SortableContext items={columns.map(col => col.id)}>
            {columns.map(column => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter(task => task.columnId === column.id)}
                onTaskCreate={async (columnId: string, title: string) => {
                  const newTask = await boardService.createTask(columnId, title)
                  setTasks([...tasks, { ...newTask, id: newTask?._id, columnId }])
                }}
                onTaskDelete={async (taskId: string) => {
                  await boardService.deleteTask(taskId)
                  setTasks(tasks.filter(task => task.id !== taskId))
                }}
              />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeTask && <Task task={activeTask} isOverlay />}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
