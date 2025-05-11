import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  priority?: 'Low' | 'Medium' | 'High';
  position: number;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface KanbanState {
  columns: Column[];
  tasks: Record<string, Task>;
}

const initialState: KanbanState = {
  columns: [
    { id: 'col1', title: 'To Do', taskIds: [] },
    { id: 'col2', title: 'In Progress', taskIds: [] },
    { id: 'col3', title: 'Done', taskIds: [] },
  ],
  tasks: {},
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newId = `task-${Date.now()}`;
      state.tasks[newId] = {
        id: newId,
        ...action.payload,
      };
      state.columns.find(col => col.id === action.payload.columnId)?.taskIds.push(newId);
    },
    moveTask: (state, action: PayloadAction<{
      taskId: string;
      sourceColId: string;
      destColId: string;
      newPosition: number;
    }>) => {
      const { taskId, sourceColId, destColId, newPosition } = action.payload;
      
      // Remove from source column
      const sourceCol = state.columns.find(col => col.id === sourceColId);
      if (sourceCol) {
        sourceCol.taskIds = sourceCol.taskIds.filter(id => id !== taskId);
      }
      
      // Add to destination column
      const destCol = state.columns.find(col => col.id === destColId);
      if (destCol) {
        destCol.taskIds.splice(newPosition, 0, taskId);
      }
      
      state.tasks[taskId].columnId = destColId;
      state.tasks[taskId].position = newPosition;
    },
  },
});

export const { addTask, moveTask } = kanbanSlice.actions;
export default kanbanSlice.reducer;