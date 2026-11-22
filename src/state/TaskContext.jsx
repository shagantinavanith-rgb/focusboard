import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { sampleTasks } from '../data/sampleTasks.js';

const STORAGE_KEY = 'focusboard.tasks.v2';

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Seed with sample data only when nothing has ever been saved.
    // An empty saved array ([]) is respected, so deleted tasks stay deleted.
    if (raw === null) return sampleTasks;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : sampleTasks;
  } catch {
    return sampleTasks;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.task, ...state];
    case 'UPDATE':
      return state.map((t) => (t.id === action.task.id ? { ...t, ...action.task } : t));
    case 'DELETE':
      return state.filter((t) => t.id !== action.id);
    case 'SET_STATUS':
      return state.map((t) => (t.id === action.id ? { ...t, status: action.status } : t));
    default:
      return state;
  }
}

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, undefined, loadTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage full or blocked: app keeps working in memory */
    }
  }, [tasks]);

  const value = useMemo(() => ({ tasks, dispatch }), [tasks]);
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used inside TaskProvider');
  return ctx;
}
