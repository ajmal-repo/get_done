import { useState } from 'react'
import { useStore } from '@/store/useStore'
import { Task, PRIORITY_COLORS } from '@/types'
import { TaskEditor } from './TaskEditor'
import {
  Check, Calendar, Tag, Trash2, Edit3, ChevronRight,
  GripVertical, MoreHorizontal
} from 'lucide-react'
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns'

interface TaskItemProps {
  task: Task
  showProject?: boolean
}

export function TaskItem({ task, showProject = true }: TaskItemProps) {
  const { toggleTask, deleteTask, projects, labels } = useStore()
  const [editing, setEditing] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const project = projects.find((p) => p.id === task.projectId)
  const taskLabels = labels.filter((l) => task.labelIds.includes(l.id))

  const formatDueDate = (date: string) => {
    const d = parseISO(date)
    if (isToday(d)) return 'Today'
    if (isTomorrow(d)) return 'Tomorrow'
    return format(d, 'MMM d')
  }

  const isOverdue = task.dueDate && isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate)) && !task.completed

  return (
    <>
      <div
        className={`group flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-800/50 transition-colors ${
          task.completed ? 'opacity-50' : ''
        }`}
      >
        {/* Checkbox */}
        <button
          onClick={() => toggleTask(task.id)}
          className="task-checkbox mt-0.5"
          style={{ borderColor: task.completed ? '#555' : PRIORITY_COLORS[task.priority] }}
        >
          {task.completed && <Check size={12} className="text-surface-300" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0" onClick={() => setEditing(true)}>
          <p className={`text-sm leading-snug ${task.completed ? 'line-through text-surface-400' : 'text-white'}`}>
            {task.title}
          </p>

          {task.description && (
            <p className="text-xs text-surface-400 mt-0.5 line-clamp-1">{task.description}</p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {task.dueDate && (
              <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-400' : 'text-surface-400'}`}>
                <Calendar size={11} />
                {formatDueDate(task.dueDate)}
              </span>
            )}
            {showProject && project && (
              <span className="flex items-center gap-1 text-xs text-surface-400">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                {project.name}
              </span>
            )}
            {taskLabels.map((l) => (
              <span key={l.id} className="flex items-center gap-1 text-xs" style={{ color: l.color }}>
                <Tag size={10} />
                {l.name}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 text-surface-400 hover:text-white rounded transition-colors"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1.5 text-surface-400 hover:text-red-400 rounded transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Mobile swipe indicator */}
        <button
          onClick={() => setShowActions(!showActions)}
          className="md:hidden p-1 text-surface-500"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Mobile actions */}
      {showActions && (
        <div className="flex items-center gap-2 px-4 py-2 md:hidden animate-fade-in">
          <button
            onClick={() => { setEditing(true); setShowActions(false) }}
            className="flex-1 py-2 text-xs text-center bg-surface-700 rounded-lg text-surface-300"
          >
            Edit
          </button>
          <button
            onClick={() => { deleteTask(task.id); setShowActions(false) }}
            className="flex-1 py-2 text-xs text-center bg-red-900/30 rounded-lg text-red-400"
          >
            Delete
          </button>
        </div>
      )}

      {editing && <TaskEditor task={task} onClose={() => setEditing(false)} />}
    </>
  )
}
